import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/db';
import { completeDepositTransaction } from '@/lib/deposit-transactions';
import { Transaction, TxStatus } from '@/models/Transaction';
import crypto from 'crypto';

interface PaydecaWebhookMessage {
    referenceNo?: string;
    status?: string;
}

interface PaydecaWebhookPayload {
    messagetype?: string;
    referenceNo?: string;
    message?: PaydecaWebhookMessage;
}

function isWebhookPayload(value: unknown): value is PaydecaWebhookPayload {
    return typeof value === 'object' && value !== null;
}

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const payloadHash = req.headers.get('payload-hash');
        const secretKey = process.env.PAYDECA_SECRET_KEY || '14162043-09b6-49df-8c40-3d4360be9069';

        let parsedBody: unknown;
        try {
            parsedBody = JSON.parse(rawBody);
        } catch {
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
        }

        if (!isWebhookPayload(parsedBody)) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        const calculatedHash = crypto.createHash('sha256').update(`${JSON.stringify(parsedBody)}${secretKey}`).digest('hex');
        const isHashValid = payloadHash === calculatedHash;

        if (!isHashValid && payloadHash) {
            console.warn("Invalid Hash Detected.");
        }

        const messageType = parsedBody.messagetype;
        const messagePayload = parsedBody.message || {};
        const referenceNo = messagePayload.referenceNo || parsedBody.referenceNo;

        if (!referenceNo) {
            return NextResponse.json({ error: "Missing referenceNo" }, { status: 400 });
        }

        await connectMongo();

        const tx = await Transaction.findOne({
            $or: [
                { paydecaRef: referenceNo },
                { referenceId: referenceNo }
            ]
        });

        if (!tx) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        if (messageType === 'acquirerRes') {
            const actionStatus = messagePayload.status;

            if (actionStatus === 'succeeded') {
                const result = await completeDepositTransaction(tx._id.toString());

                return NextResponse.json({
                    success: true,
                    message: tx.status === TxStatus.COMPLETED ? "Already processed" : "Payment accepted",
                    invoiceEmailSent: result.invoiceEmailSent,
                    invoiceEmailSkipped: result.invoiceEmailSkipped,
                });
            }

            if (actionStatus === 'failed') {
                if (tx.status === TxStatus.COMPLETED) {
                    return NextResponse.json({ message: "Already processed" });
                }

                tx.status = TxStatus.FAILED;
                await tx.save();
                return NextResponse.json({ success: true, message: "Payment failed marked" });
            }
        }

        return NextResponse.json({ message: "Status ignored / unknown" });
    } catch (err: unknown) {
        const details = err instanceof Error ? err.message : "Unknown error";
        console.error("Webhook Error:", err);
        return NextResponse.json({ error: "Internal Server Error", details }, { status: 500 });
    }
}
