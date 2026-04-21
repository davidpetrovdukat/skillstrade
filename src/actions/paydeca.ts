'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongo } from "@/lib/db";
import { completeDepositTransaction, type PurchaseBillingInfo } from "@/lib/deposit-transactions";
import { isWithoutPaymentEnabled } from "@/lib/runtime-config";
import { User } from "@/models/User";
import { Transaction, TxPaymentMethod, TxType, TxStatus } from "@/models/Transaction";
import crypto from 'crypto';

const DEFAULT_VAT_RATE = 0.2;

interface PaydecaCustomerPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    street: string;
    city: string;
    zip: string;
    ip: string;
    dateOfBirth: string;
}

interface PaydecaProvisionPayload {
    amount: number;
    currency: string;
    customer: PaydecaCustomerPayload;
    successUrl: string;
    failUrl: string;
    notifyUrl: string;
    deviceId: string;
    hash?: string;
}

interface PaydecaGatewayMessage {
    message?: string;
}

interface PaydecaProvisionResponse {
    status?: string;
    redirectUrl?: string;
    referenceNo?: string;
    message?: string | PaydecaGatewayMessage;
    error?: string | Record<string, unknown>;
}

type GeneratePaydecaSessionResult =
    | { success: true; redirectUrl: string; paydecaRef?: string }
    | { success: false; error: string };

function getErrorMessage(data: PaydecaProvisionResponse): string {
    if (typeof data.message === "string") {
        return data.message;
    }

    if (data.message && typeof data.message === "object" && typeof data.message.message === "string") {
        return data.message.message;
    }

    if (typeof data.error === "string") {
        return data.error;
    }

    if (data.error) {
        return JSON.stringify(data.error);
    }

    return "Payment Gateway Error";
}

export async function generatePaydecaSession(
    tokens: number,
    description: string,
    amountPaid: number,
    billingInfo: PurchaseBillingInfo
): Promise<GeneratePaydecaSessionResult> {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return { success: false, error: "Unauthorized" };
        }

        await connectMongo();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return { success: false, error: "User not found" };
        }

        const amountCents = Math.round(amountPaid * 100);

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
        if (!baseUrl) {
            return { success: false, error: "NEXT_PUBLIC_APP_URL is not configured" };
        }

        const successUrl = `${baseUrl}/dashboard/checkout/success`;
        const failUrl = `${baseUrl}/dashboard/checkout/fail`;
        const notifyUrl = `${baseUrl}/api/paydeca/webhook`;
        const deviceId = crypto.randomBytes(16).toString("hex");

        const payload: PaydecaProvisionPayload = {
            amount: amountCents,
            currency: "EUR",
            customer: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: billingInfo.phone || "00000000000",
                country: billingInfo.country || "LV",
                street: billingInfo.street || "Unknown St",
                city: billingInfo.city || "Riga",
                zip: billingInfo.zip || "1000",
                ip: billingInfo.ip || "192.168.1.1",
                dateOfBirth: billingInfo.dateOfBirth || "2000-01-01",
            },
            successUrl,
            failUrl,
            notifyUrl,
            deviceId,
        };

        payload.hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');

        const referenceId = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const newTx = await Transaction.create({
            user: user._id,
            amount: tokens,
            type: TxType.DEPOSIT,
            status: TxStatus.PENDING,
            description: description || `Payment for ${tokens} Tokens (EUR ${amountPaid})`,
            referenceId,
            amountPaid,
            currency: "EUR",
            vatRate: DEFAULT_VAT_RATE,
            paymentMethod: isWithoutPaymentEnabled() ? TxPaymentMethod.BYPASS : TxPaymentMethod.PAYDECA,
            billingSnapshot: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: billingInfo.phone || user.phone || '',
                country: billingInfo.country || user.address?.country || '',
                street: billingInfo.street || user.address?.street || '',
                city: billingInfo.city || user.address?.city || '',
                zip: billingInfo.zip || user.address?.postcode || '',
                dateOfBirth: billingInfo.dateOfBirth || (user.dob ? user.dob.toISOString().slice(0, 10) : ''),
            },
        });

        if (isWithoutPaymentEnabled()) {
            await completeDepositTransaction(newTx._id.toString());

            return {
                success: true,
                redirectUrl: successUrl,
            };
        }
        
        const apiUrl = process.env.PAYDECA_API_URL;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.PAYDECA_SECRET_KEY || '14162043-09b6-49df-8c40-3d4360be9069',
                'mid': process.env.PAYDECA_MID || '69aebb8416b85ff1c6a33467'
            },
            body: JSON.stringify(payload)
        });

        const data = (await response.json()) as PaydecaProvisionResponse;

        if (response.ok && data.status === "successful" && data.redirectUrl) {
            await Transaction.updateOne({ _id: newTx._id }, { paydecaRef: data.referenceNo });

            return {
                success: true,
                redirectUrl: data.redirectUrl,
                paydecaRef: data.referenceNo
            };
        }

        console.error("Paydeca API Error:", data);
        await Transaction.updateOne({ _id: newTx._id }, { status: TxStatus.FAILED });
        return { success: false, error: getErrorMessage(data) };
    } catch (error) {
        console.error("GeneratePaydecaSession Error:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
