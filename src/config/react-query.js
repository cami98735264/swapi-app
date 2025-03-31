import { QueryClient, QueryCache } from '@tanstack/react-query';

const ONE_HOUR = 1000 * 60 * 60;

export const queryCache = new QueryCache();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: ONE_HOUR * 6, // Keep inactive data for 6 hours
      staleTime: ONE_HOUR, // Refetch after 1 hour
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000), // Max 5s delay
      retry: 1, // Only retry once
    },
  },
  queryCache,
});
