'use server';

import { Resend } from 'resend';
import { getNotificationEmail, getResendFromEmail } from '@/lib/email';

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_FROM = getResendFromEmail();
const JOIN_APPLICATION_TO = getNotificationEmail('JOIN_APPLICATION_TO');

interface JoinApplicationFormData {
    fullName: string;
    email: string;
    portfolioUrl: string;
    linkedinUrl: string;
    country: string;
    languages: string;
    primarySkill: string;
    otherSkill?: string;
    whyYou: string;
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Unexpected error';
}

export async function sendJoinApplication(formData: JoinApplicationFormData) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not defined');
        return { success: false, error: 'Server configuration error' };
    }

    try {
        const { fullName, email, portfolioUrl, linkedinUrl, country, languages, primarySkill, otherSkill, whyYou } = formData;

        // Construct a simple HTML email body
        // In a real app we might use React Email, but for MVP simple HTML is fine.
        const htmlBody = `
            <h1>New Talent Application</h1>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            <hr />
            <p><strong>Primary Skill:</strong> ${primarySkill}</p>
            ${otherSkill ? `<p><strong>Specified Skill:</strong> ${otherSkill}</p>` : ''}
            <p><strong>Portfolio:</strong> <a href="${portfolioUrl}">${portfolioUrl}</a></p>
            <p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>
            <hr />
            <h3>Why You?</h3>
            <p style="white-space: pre-wrap;">${whyYou}</p>
        `;

        const { data, error } = await resend.emails.send({
            from: RESEND_FROM,
            to: [JOIN_APPLICATION_TO],
            subject: `New Application: ${fullName} - ${primarySkill === 'Other' ? otherSkill : primarySkill}`,
            html: htmlBody,
            replyTo: email
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
