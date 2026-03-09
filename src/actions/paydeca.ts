'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongo } from "@/lib/db";
import { User } from "@/models/User";
import { Transaction, TxType, TxStatus } from "@/models/Transaction";
import crypto from 'crypto';

interface BillingInfo {
    phone: string;
    country: string;
    street: string;
    city: string;
    zip: string;
    dateOfBirth: string;
    ip?: string;
}

export async function generatePaydecaSession(
    tokens: number,
    description: string,
    amountPaid: number, // in EUR
    billingInfo: BillingInfo
) {
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

        const successUrl = `${baseUrl}/dashboard/checkout/success`;
        const failUrl = `${baseUrl}/dashboard/checkout/fail`;
        const notifyUrl = `${baseUrl}/api/paydeca/webhook`;

        const deviceId = crypto.randomBytes(16).toString("hex");

        const payload: any = {
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
                dateOfBirth: billingInfo.dateOfBirth || "2000-01-01"
            },
            successUrl,
            failUrl,
            notifyUrl,
            deviceId
        };

        const payloadString = JSON.stringify(payload);
        const hash = crypto.createHash('sha256').update(payloadString).digest('hex');

        payload.hash = hash;

        const referenceId = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const newTx = await Transaction.create({
            user: user._id,
            amount: tokens,
            type: TxType.DEPOSIT,
            status: TxStatus.PENDING,
            description: `Payment for ${tokens} Tokens (EUR ${amountPaid})`,
            referenceId
        });

        const apiUrl = process.env.PAYDECA_API_URL
            ? `${process.env.PAYDECA_API_URL.replace(/\/$/, '')}/provision/req`
            : "https://sandbox.paydeca.com/fn-execute/provision/req";

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.PAYDECA_SECRET_KEY || '14162043-09b6-49df-8c40-3d4360be9069',
                'mid': process.env.PAYDECA_MID || '69aebb8416b85ff1c6a33467'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.status === "successful" && data.redirectUrl) {
            await Transaction.updateOne({ _id: newTx._id }, { paydecaRef: data.referenceNo });

            return {
                success: true,
                redirectUrl: data.redirectUrl,
                paydecaRef: data.referenceNo
            };
        } else {
            console.error("Paydeca API Error:", data);
            await Transaction.updateOne({ _id: newTx._id }, { status: TxStatus.FAILED });

            let errorMessage = "Payment Gateway Error";
            if (data?.message) {
                if (typeof data.message === 'string') {
                    errorMessage = data.message;
                } else if (data.message.message) {
                    errorMessage = data.message.message;
                } else {
                    errorMessage = JSON.stringify(data.message);
                }
            } else if (data?.error) {
                errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
            }

            return { success: false, error: errorMessage };
        }

    } catch (error) {
        console.error("GeneratePaydecaSession Error:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
