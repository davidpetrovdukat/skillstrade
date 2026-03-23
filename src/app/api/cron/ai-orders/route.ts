import { NextResponse } from 'next/server';
import {
    processQueuedAIDocumentOrders,
    releaseReadyAIDocumentOrders,
    sendPendingAIDocumentEmails,
} from '@/lib/ai-order';

export const runtime = 'nodejs';

function isAuthorized(request: Request) {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        return true;
    }

    const authorization = request.headers.get('authorization');
    return authorization === `Bearer ${secret}`;
}

export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const generation = await processQueuedAIDocumentOrders();
        const release = await releaseReadyAIDocumentOrders();
        const email = await sendPendingAIDocumentEmails();

        return NextResponse.json({
            ok: true,
            generation,
            release,
            email,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Cron processing failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
