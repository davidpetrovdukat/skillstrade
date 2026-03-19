const DEFAULT_FROM_EMAIL = 'Skill Trade <no-reply@skills-trade.com>';
const DEFAULT_NOTIFICATION_EMAIL = 'info@skills-trade.com';

export function getResendFromEmail() {
    return (
        process.env.RESEND_FROM_EMAIL ||
        process.env.FROM_EMAIL ||
        process.env.RESEND_FROM ||
        DEFAULT_FROM_EMAIL
    );
}

export function getNotificationEmail(envName?: string) {
    if (envName) {
        const envValue = process.env[envName];
        if (envValue) {
            return envValue;
        }
    }

    return process.env.CONTACT_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
}
