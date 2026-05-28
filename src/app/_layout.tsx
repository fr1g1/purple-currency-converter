import { Stack } from 'expo-router';

import { QueryProvider } from '@/providers/query-provider';

export default function Layout() {
    return (
        <QueryProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </QueryProvider>
    );
}
