import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - corporate content rarely changes
      gcTime: 30 * 60 * 1000, // 30 minutes garbage collection
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

// HelmetProvider types conflict due to dual @types/react versions in monorepo.
// This wrapper ensures runtime correctness while satisfying the type checker.
const TypeSafeHelmetProvider = HelmetProvider as unknown as React.FC<{ children: React.ReactNode }>;

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TypeSafeHelmetProvider>{children}</TypeSafeHelmetProvider>
    </QueryClientProvider>
  );
}
