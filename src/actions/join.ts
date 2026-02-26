'use server';

import { Resend } from 'resend';

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_FROM =
    process.env.RESEND_FROM_EMAIL ||
    process.env.RESEND_FROM ||
    'Skill Trade <info@skills-trade.com>';
const JOIN_APPLICATION_TO = process.env.JOIN_APPLICATION_TO || 'info@skills-trade.com';

export async function sendJoinApplication(formData: any) {
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

    } catch (e: any) {
        console.error('Unexpected Error:', e);
        return { success: false, error: e.message };
    }
}
