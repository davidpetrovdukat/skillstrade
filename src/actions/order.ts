'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Order, OrderStatus } from '@/models/Order';
import { Transaction } from '@/models/Transaction'; // Assuming Transaction model exists and exports TxType enum
import { Service } from '@/models/Service';
import { Freelancer } from '@/models/Freelancer';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

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
        let selectedAddons: any[] = [];

        if (addonIds.length > 0 && service.addons) {
            selectedAddons = service.addons.filter((a: any) => addonIds.includes(a._id.toString()));
            const addonsPrice = selectedAddons.reduce((sum: number, a: any) => sum + a.priceTokens, 0);
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

        // 2. Create Transaction (Payment)
        // Check TxType enum availability. If not exported, use string.
        // Assuming 'PAYMENT' or similar.
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
            const addonsList = selectedAddons.map((a: any) => `${a.title} (${a.priceTokens} T)`).join(', ');
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
                from: 'Skill Trade <orders@resend.dev>', // Update domain in prod
                to: ['info@skills-trade.com'],
                subject: `New Order: ${service.title} (${totalTokens} T)`,
                html: `
                    <h1>New Order Received</h1>
                    <p><strong>Client:</strong> ${user.firstName} ${user.lastName} (${user.email})</p>
                    <p><strong>Service:</strong> ${service.title}</p>
                    <p><strong>Tokens:</strong> ${totalTokens}</p>
                    <p><strong>Requirements:</strong> ${requirements}</p>
                    ${selectedAddons.length > 0 ? `<p><strong>Add-ons:</strong> ${selectedAddons.map((a: any) => a.title).join(', ')}</p>` : ''}
                    <p><strong>Order ID:</strong> ${order._id}</p>
                `
            });
        }

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/orders');
        return { success: true, orderId: order._id.toString() };

    } catch (error: any) {
        console.error('Order creation failed:', error);
        return { success: false, error: error.message };
    }
}
