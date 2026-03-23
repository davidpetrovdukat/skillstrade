import 'server-only';

import { Resend } from 'resend';
import { getResendFromEmail } from '@/lib/email';

const RESEND_FROM = getResendFromEmail();

function getResendClient() {
    if (!process.env.RESEND_API_KEY) {
        return null;
    }

    return new Resend(process.env.RESEND_API_KEY);
}

export async function sendRegistrationEmail(input: {
    to: string;
    firstName: string;
}) {
    const resend = getResendClient();
    if (!resend) {
        return { sent: false, skipped: true, reason: 'RESEND_API_KEY is not configured.' };
    }

    const firstName = input.firstName.trim() || 'there';

    const { error } = await resend.emails.send({
        from: RESEND_FROM,
        to: [input.to],
        subject: 'Welcome to Skills-Trade',
        html: `
            <h1>Welcome to Skills-Trade</h1>
            <p>Hi ${firstName},</p>
            <p>Your account has been created successfully.</p>
            <p>You can now log in, purchase tokens, and place orders from your dashboard.</p>
            <p>If you did not create this account, please reply to this email immediately.</p>
        `,
    });

    if (error) {
        throw new Error(error.message);
    }

    return { sent: true, skipped: false };
}

export async function sendInvoiceEmail(input: {
    to: string;
    firstName: string;
    invoiceNumber: string;
    description: string;
    total: number;
    currency: string;
    pdfFilename: string;
    pdfBuffer: Buffer;
}) {
    const resend = getResendClient();
    if (!resend) {
        return { sent: false, skipped: true, reason: 'RESEND_API_KEY is not configured.' };
    }

    const { error } = await resend.emails.send({
        from: RESEND_FROM,
        to: [input.to],
        subject: `Your Skills-Trade invoice ${input.invoiceNumber}`,
        html: `
            <h1>Your invoice is attached</h1>
            <p>Hi ${input.firstName.trim() || 'there'},</p>
            <p>Thank you for your purchase on Skills-Trade.</p>
            <p><strong>Invoice:</strong> ${input.invoiceNumber}</p>
            <p><strong>Description:</strong> ${input.description}</p>
            <p><strong>Total:</strong> ${new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: input.currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(input.total)}</p>
            <p>The PDF invoice is attached to this email.</p>
        `,
        attachments: [
            {
                filename: input.pdfFilename,
                content: input.pdfBuffer,
            },
        ],
    });

    if (error) {
        throw new Error(error.message);
    }

    return { sent: true, skipped: false };
}
