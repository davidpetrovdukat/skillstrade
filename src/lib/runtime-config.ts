import 'server-only';

function parseBoolean(value: string | undefined, fallback = false) {
    if (!value) {
        return fallback;
    }

    const normalized = value.trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

export function isWithoutPaymentEnabled() {
    return parseBoolean(process.env.WITHOUT_PAYMENT, false);
}
