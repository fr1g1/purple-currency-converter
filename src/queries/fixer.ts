export type FixerErrorDetails = {
    code?: number;
    type?: string;
    info?: string;
};

export type FixerErrorResponse = {
    success?: boolean;
    error?: FixerErrorDetails;
};

export function getFixerApiKey(): string {
    const apiKey = process.env.EXPO_PUBLIC_FIXER_APP_ID;

    if (!apiKey) {
        throw new Error('Missing EXPO_PUBLIC_FIXER_APP_ID');
    }

    return apiKey;
}

export function getFixerErrorMessage(
    error?: FixerErrorDetails,
    fallbackMessage = 'Unable to convert currency right now.'
): string {
    if (!error) {
        return fallbackMessage;
    }

    const code = error.code;
    const fallback = error.info ?? error.type ?? fallbackMessage;

    if (code === 101) {
        return 'Invalid API key.';
    }

    if (code === 102) {
        return 'Your Fixer account is inactive.';
    }

    if (code === 103 || code === 104) {
        return 'API request limit reached. Please try again later.';
    }

    if (code === 201 || code === 202 || code === 301 || code === 302) {
        return error.info ?? 'Invalid conversion request.';
    }

    return fallback;
}
