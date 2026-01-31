'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongo } from "@/lib/db";
import { User } from "@/models/User";
import { Transaction, TxType } from "@/models/Transaction";
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

        // 1. Update User Balance
        const newBalance = (user.walletBalance || 0) + tokens;
        await User.updateOne({ _id: user._id }, { walletBalance: newBalance });

        // 2. Create Transaction Record
        await Transaction.create({
            user: user._id,
            amount: tokens,
            type: TxType.DEPOSIT,
            description: description,
            referenceId: `CC-${Date.now()}` // Mock Reference
        });

        // 3. Revalidate Wallet Page to show new balance/history
        revalidatePath('/dashboard/wallet');
        revalidatePath('/dashboard');

        return { success: true, newBalance };
    } catch (error) {
        console.error("TopUp Error:", error);
        return { success: false, error: "Transaction failed" };
    }
}
