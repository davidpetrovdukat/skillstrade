import { NextResponse } from 'next/server';
import { processAIDocumentPipeline } from '@/lib/ai-order';

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
        const result = await processAIDocumentPipeline();

        return NextResponse.json({
            ok: true,
            ...result,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Cron processing failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
