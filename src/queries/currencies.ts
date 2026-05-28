import { useQuery } from '@tanstack/react-query';

import type { PickerItem } from '@/components/picker';
import { getFixerApiKey, getFixerErrorMessage, type FixerErrorResponse } from './fixer';

const CURRENCIES_QUERY_KEY = ['currencies'];

type CurrenciesResponse = {
    success?: boolean;
    symbols?: Record<string, string>;
    error?: FixerErrorResponse['error'];
}

async function fetchCurrencies(): Promise<PickerItem[]> {
    const apiKey = encodeURIComponent(getFixerApiKey());
    const response = await fetch(`https://data.fixer.io/api/symbols?access_key=${apiKey}`);

    const data = (await response.json().catch(() => null)) as CurrenciesResponse | null;

    if (!response.ok) {
        throw new Error(getFixerErrorMessage(data?.error, 'Failed to load currencies'));
    }

    if (!data?.success || !data.symbols) {
        throw new Error(getFixerErrorMessage(data?.error, 'Failed to load currencies'));
    }

    return Object.entries(data.symbols)
        .sort(([leftCode], [rightCode]) => leftCode.localeCompare(rightCode))
        .map(([code]) => ({
            label: code,
            value: code,
        }));
}

export function useCurrencies() {
    return useQuery({
        queryKey: CURRENCIES_QUERY_KEY,
        queryFn: fetchCurrencies,
    });
}