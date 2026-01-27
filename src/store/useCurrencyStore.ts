
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CurrencyCode = 'EUR' | 'USD' | 'GBP';

interface CurrencyState {
    currency: CurrencyCode;
    setCurrency: (currency: CurrencyCode) => void;
    convert: (amountInEur: number) => string;
}

export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
    EUR: 1.00,
    USD: 1.09,
    GBP: 0.86,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
};

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currency: 'EUR',
            setCurrency: (currency) => set({ currency }),
            convert: (amountInEur) => {
                const { currency } = get();
                const rate = EXCHANGE_RATES[currency];
                const symbol = CURRENCY_SYMBOLS[currency];
                const value = amountInEur * rate;
                return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            },
        }),
        {
            name: 'currency-storage',
        }
    )
);
