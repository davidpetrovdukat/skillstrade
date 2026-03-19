'use server';

import { Resend } from 'resend';
import { getNotificationEmail, getResendFromEmail } from '@/lib/email';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const BRIEF_NOTIFICATION_EMAIL = getNotificationEmail('BRIEF_TO');
const RESEND_FROM = getResendFromEmail();

function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Unexpected error';
}

export async function sendBrief(formData: FormData) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not defined');
        return { success: false, error: 'Server configuration error' };
    }

    try {
        const name = formData.get('name') as string;
        const surname = formData.get('surname') as string;
        const email = formData.get('email') as string;
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const otherCategory = formData.get('otherCategory') as string;
        const budget = formData.get('budget') as string;
        const currency = formData.get('currency') as string;
        const deadline = formData.get('deadline') as string;
        const description = formData.get('description') as string;
        const attachment = formData.get('attachment') as File | null;

        const finalCategory = category === 'Other' ? otherCategory : category;

        const attachments: Array<{
            filename: string;
            content: Buffer;
        }> = [];
        if (attachment && attachment.size > 0) {
            const arrayBuffer = await attachment.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            attachments.push({
                filename: attachment.name,
                content: buffer,
            });
        }

        const htmlBody = `
            <h1>New Custom Brief Custom</h1>
            <h3>Client Details</h3>
            <p><strong>Name:</strong> ${name} ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr />
            <h3>Project Details</h3>
            <p><strong>Project Title:</strong> ${title}</p>
            <p><strong>Category:</strong> ${finalCategory}</p>
            <p><strong>Budget:</strong> ${budget} (${currency})</p>
            <p><strong>Deadline:</strong> ${deadline || 'Not specified'}</p>
            <hr />
            <h3>Description</h3>
            <p style="white-space: pre-wrap;">${description}</p>
        `;

        const { data, error } = await resend.emails.send({
            from: RESEND_FROM,
            to: [BRIEF_NOTIFICATION_EMAIL],
            subject: `New Brief: ${title} [${finalCategory}]`,
            html: htmlBody,
            replyTo: email,
            attachments: attachments,
        });

        if (error) {
            console.error('Resend Error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };

    } catch (error: unknown) {
        console.error('Unexpected Error:', error);
        return { success: false, error: getErrorMessage(error) };
    }
}
