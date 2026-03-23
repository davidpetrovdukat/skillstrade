import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { processAIDocumentPipeline } from '@/lib/ai-order';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();

    const userId =
        session.user.id ||
        (await User.findOne({ email: session.user.email }).select('_id').lean())?._id?.toString();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await processAIDocumentPipeline({
            clientId: userId,
            submitLimit: 5,
            pollLimit: 5,
            releaseLimit: 5,
            emailLimit: 5,
        });

        return NextResponse.json({
            ok: true,
            ...result,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Order processing failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
