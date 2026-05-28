import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { QueryProvider } from '@/providers/query-provider';

export default function Layout() {
    return (
        <>
            <StatusBar style="dark" />
            <QueryProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                </Stack>
            </QueryProvider>
        </>
    );
}
