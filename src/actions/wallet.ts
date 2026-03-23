'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { completeDepositTransaction } from "@/lib/deposit-transactions";
import { connectMongo } from "@/lib/db";
import { User } from "@/models/User";
import { Transaction, TxPaymentMethod, TxStatus, TxType } from "@/models/Transaction";
import { revalidatePath } from "next/cache";

export async function topUpWallet(tokens: number, description: string, amountPaid: number) {
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

        const transaction = await Transaction.create({
            user: user._id,
            amount: tokens,
            type: TxType.DEPOSIT,
            status: TxStatus.PENDING,
            description: description,
            referenceId: `CC-${Date.now()}`,
            amountPaid,
            currency: "EUR",
            vatRate: 0.2,
            paymentMethod: TxPaymentMethod.BYPASS,
            billingSnapshot: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone || '',
                country: user.address?.country || '',
                street: user.address?.street || '',
                city: user.address?.city || '',
                zip: user.address?.postcode || '',
                dateOfBirth: user.dob ? user.dob.toISOString().slice(0, 10) : '',
            },
        });

        const result = await completeDepositTransaction(transaction._id.toString());

        revalidatePath('/dashboard/wallet');
        revalidatePath('/dashboard');

        return { success: true, newBalance: (user.walletBalance || 0) + tokens, invoiceEmailSent: result.invoiceEmailSent };
    } catch (error) {
        console.error("TopUp Error:", error);
        return { success: false, error: "Transaction failed" };
    }
}
