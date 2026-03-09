import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/db';
import { Transaction, TxStatus, TxType } from '@/models/Transaction';
import { User } from '@/models/User';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const rawStatus = body.status || body.Status;
        const statusStr = typeof rawStatus === 'string' ? rawStatus.toUpperCase() : '';
        const referenceNo = body.referenceNo || body.ReferenceNo;

        if (!referenceNo) {
            return NextResponse.json({ error: "Missing referenceNo" }, { status: 400 });
        }

        await connectMongo();

        // Find transaction
        const tx = await Transaction.findOne({ paydecaRef: referenceNo });

        if (!tx) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        if (tx.status === TxStatus.COMPLETED) {
            return NextResponse.json({ message: "Already processed" });
        }

        const isSuccess = statusStr === 'SUCCESS' || statusStr === 'SUCCEEDED' || statusStr === 'APPROVED';
        const isFailed = statusStr === 'ERROR' || statusStr === 'FAILED' || statusStr === 'EXPIRED' || statusStr === 'DECLINED';

        if (isSuccess) {
            tx.status = TxStatus.COMPLETED;
            await tx.save();

            const user = await User.findById(tx.user);
            if (user && tx.type === TxType.DEPOSIT) {
                user.walletBalance = (user.walletBalance || 0) + tx.amount;
                await user.save();
            }

            return NextResponse.json({ success: true, message: "Payment accepted" });

        } else if (isFailed) {
            tx.status = TxStatus.FAILED;
            await tx.save();
            return NextResponse.json({ success: true, message: "Payment failed marked" });
        }

        return NextResponse.json({ message: "Status ignored / unknown" });

    } catch (err: any) {
        console.error("Webhook Error:", err);
        return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
    }
}
