import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePersistence } from '../hooks/usePersistence';

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

export interface CurrencyConfig {
    code: CurrencyCode;
    symbol: string;
    rate: number; // Conversion rate relative to USD (Base)
}

interface CurrencyContextType {
    currency: CurrencyConfig;
    setCurrency: (c: CurrencyConfig) => void;
    format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const DEFAULT_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
    USD: { code: 'USD', symbol: '$', rate: 1 },
    INR: { code: 'INR', symbol: '₹', rate: 83.5 },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
    GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    // Persist currency settings
    const { data: storedCurrency, updateData: setStoredCurrency } = usePersistence<CurrencyConfig>('app_currency', DEFAULT_CURRENCIES.USD);

    // Ensure we have valid data (handle migration/nulls if any)
    const currency = storedCurrency || DEFAULT_CURRENCIES.USD;

    const setCurrency = (newConfig: CurrencyConfig) => {
        setStoredCurrency(newConfig);
    };

    const format = (amount: number) => {
        const convertedAmount = amount * currency.rate;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(convertedAmount);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
