'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@skills-trade.com';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(formData: FormData) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not defined');
        return { success: false, error: 'Server configuration error' };
    }

    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const subject = (formData.get('subject') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email || !message) {
        return { success: false, error: 'Name, email and message are required.' };
    }
    if (!EMAIL_REGEX.test(email)) {
        return { success: false, error: 'Please enter a valid email address.' };
    }

    try {
        const htmlBody = `
            <h1>Contact form: ${subject || 'General Support'}</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'General Support'}</p>
            <hr />
            <h3>Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
        `;

        const { data, error } = await resend.emails.send({
            from: 'Skill Trade <onboarding@resend.dev>',
            to: [CONTACT_EMAIL],
            subject: `[Contact] ${subject || 'General Support'} – ${name}`,
            html: htmlBody,
            replyTo: email,
        });

        if (error) {
            console.error('Resend Error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Something went wrong.';
        console.error('Contact form error:', e);
        return { success: false, error: message };
    }
}
