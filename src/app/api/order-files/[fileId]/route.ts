import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectMongo } from '@/lib/db';
import { readMongoStoredOrderFile } from '@/lib/server/order-file-storage';
import { Order } from '@/models/Order';
import { User } from '@/models/User';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, context: { params: Promise<unknown> }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fileId } = (await context.params) as { fileId: string };

    await connectMongo();

    const userId =
        session.user.id ||
        (await User.findOne({ email: session.user.email }).select('_id').lean())?._id?.toString();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let storedFile: Awaited<ReturnType<typeof readMongoStoredOrderFile>>;

    try {
        storedFile = await readMongoStoredOrderFile(fileId);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'File not found';
        const status = message === 'Stored file was not found.' ? 404 : 500;

        return NextResponse.json({ error: message }, { status });
    }

    if (!storedFile) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const authorizedOrder = await Order.findOne({
        _id: storedFile.orderId,
        client: userId,
    })
        .select('_id')
        .lean();

    if (!authorizedOrder) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return new NextResponse(new Uint8Array(storedFile.buffer), {
        headers: {
            'Content-Type': storedFile.contentType || 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${storedFile.filename}"`,
            'Content-Length': storedFile.buffer.length.toString(),
            'Cache-Control': 'private, no-store',
        },
    });
}
