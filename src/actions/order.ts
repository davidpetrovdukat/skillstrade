'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Order, OrderStatus } from '@/models/Order';
import { Transaction } from '@/models/Transaction';
import { Service } from '@/models/Service';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';
import type { Types } from 'mongoose';
import { getNotificationEmail, getResendFromEmail } from '@/lib/email';

const resend = new Resend(process.env.RESEND_API_KEY);
const ORDER_NOTIFICATION_EMAIL = getNotificationEmail('ORDER_NOTIFICATION_TO');
const RESEND_FROM = getResendFromEmail();

interface ServiceAddonSelection {
    _id: Types.ObjectId;
    title: string;
    priceTokens: number;
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Failed to create order';
}

export async function createOrder(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        await connectMongo();

        const serviceId = formData.get('serviceId') as string;
        const requirements = formData.get('requirements') as string;
        const totalTokens = parseInt(formData.get('totalTokens') as string);
        const file = formData.get('file') as File | null;
        const addonIds = formData.getAll('addons') as string[];

        if (!serviceId || isNaN(totalTokens)) {
            return { success: false, error: 'Invalid order data' };
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) return { success: false, error: 'User not found' };

        const service = await Service.findById(serviceId);
        if (!service) return { success: false, error: 'Service not found' };

        // Validate Price (Service + Addons)
        let calculatedPrice = service.priceTokens;
        let selectedAddons: ServiceAddonSelection[] = [];

        if (addonIds.length > 0 && service.addons) {
            const serviceAddons = service.addons as unknown as ServiceAddonSelection[];
            selectedAddons = serviceAddons.filter((addon) => addonIds.includes(addon._id.toString()));
            const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.priceTokens, 0);
            calculatedPrice += addonsPrice;
        }

        if (totalTokens !== calculatedPrice) {
            console.error(`Price Mismatch: Expected ${calculatedPrice}, Got ${totalTokens}`);
            // We can optionally block here or just warn. For now, strict check is better for security.
            return { success: false, error: 'Price mismatch. Please try again.' };
        }

        if ((user.walletBalance || 0) < totalTokens) {
            return { success: false, error: 'Insufficient balance' };
        }

        // Handle File Upload (MVP: Save to public/uploads)
        const attachments: string[] = [];
        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');

            // Ensure uploads dir exists (or just assume public exists)
            // For MVP I'll write directly. In prod use S3/Blob.
            await writeFile(path.join(uploadDir, filename), buffer);
            attachments.push(`/uploads/${filename}`);
        }

        // 1. Deduct Tokens
        user.walletBalance -= totalTokens;
        await user.save();

        await Transaction.create({
            user: user._id,
            amount: totalTokens,
            type: 'SPEND', // Matches TxType.SPEND
            description: `Order: ${service.title}`,
            referenceId: `ORD-${Date.now()}`
        });

        // Construct enriched brief with addons info
        let enrichedBriefDescription = requirements;
        if (selectedAddons.length > 0) {
            const addonsList = selectedAddons.map((addon) => `${addon.title} (${addon.priceTokens} T)`).join(', ');
            enrichedBriefDescription += `\n\n--- Selected Upgrades ---\n${addonsList}`;
        }

        // 3. Create Order
        const order = await Order.create({
            client: user._id,
            freelancer: service.freelancer,
            service: service._id,
            totalTokens: totalTokens,
            status: OrderStatus.PENDING,
            brief: {
                title: service.title,
                description: enrichedBriefDescription
            },
            attachments: attachments,
            updatedAt: new Date(),
            createdAt: new Date()
        });

        // 4. Send Email
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: RESEND_FROM,
                to: [ORDER_NOTIFICATION_EMAIL],
                subject: `New Order: ${service.title} (${totalTokens} T)`,
                html: `
                    <h1>New Order Received</h1>
                    <p><strong>Client:</strong> ${user.firstName} ${user.lastName} (${user.email})</p>
                    <p><strong>Service:</strong> ${service.title}</p>
                    <p><strong>Tokens:</strong> ${totalTokens}</p>
                    <p><strong>Requirements:</strong> ${requirements}</p>
                    ${selectedAddons.length > 0 ? `<p><strong>Add-ons:</strong> ${selectedAddons.map((addon) => addon.title).join(', ')}</p>` : ''}
                    <p><strong>Order ID:</strong> ${order._id}</p>
                `
            });
        }

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/orders');
        return { success: true, orderId: order._id.toString() };

    } catch (error: unknown) {
        console.error('Order creation failed:', error);
        return { success: false, error: getErrorMessage(error) };
    }
}
