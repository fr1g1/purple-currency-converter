import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { PropsWithChildren } from 'react';

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: ONE_DAY_MS,
            staleTime: ONE_DAY_MS,
            retry: 1,
        },
    },
});

const persister = createAsyncStoragePersister({
    storage: AsyncStorage,
});

export function QueryProvider({ children }: PropsWithChildren) {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister,
                maxAge: ONE_DAY_MS,
            }}
        >
            {children}
        </PersistQueryClientProvider>
    );
}