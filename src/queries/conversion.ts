import { useMutation } from '@tanstack/react-query';

import { getFixerApiKey, getFixerErrorMessage, type FixerErrorDetails, type FixerErrorResponse } from './fixer';

type ConvertPayload = {
    value: number;
    from: string;
    to: string;
};

type LatestRatesResponse = {
    success?: boolean;
    base?: string;
    rates?: Record<string, number>;
    error?: FixerErrorDetails;
};

export class ConversionError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'ConversionError';
        this.status = status;
    }
}

async function convertCurrency({ value, from, to }: ConvertPayload): Promise<number> {
    const apiKey = encodeURIComponent(getFixerApiKey());
    const response = await fetch(`https://data.fixer.io/api/latest?access_key=${apiKey}`);

    const rawData = (await response.json().catch(() => null)) as LatestRatesResponse | FixerErrorResponse | null;

    if (!response.ok) {
        const errorData = rawData as FixerErrorResponse | null;
        throw new ConversionError(getFixerErrorMessage(errorData?.error), response.status);
    }

    if (!rawData?.success) {
        const errorData = rawData as FixerErrorResponse | null;
        throw new ConversionError(getFixerErrorMessage(errorData?.error), response.status);
    }

    const successData = rawData as LatestRatesResponse;
    const baseCurrency = successData.base ?? 'EUR';
    const rates = successData.rates;

    if (!rates) {
        throw new ConversionError('Unexpected conversion response format.', response.status);
    }

    const fromRate = from === baseCurrency ? 1 : rates[from];
    const toRate = to === baseCurrency ? 1 : rates[to];

    if (typeof fromRate !== 'number' || typeof toRate !== 'number') {
        throw new ConversionError('Invalid conversion request.', response.status);
    }

    return value * (toRate / fromRate);
}

export function useConvertCurrency() {
    return useMutation({
        mutationFn: convertCurrency,
    });
}