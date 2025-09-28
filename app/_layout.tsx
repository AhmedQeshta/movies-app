import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { useState } from 'react';
import AppSplashScreen from '@/components/SplashScreen';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

if (!publishableKey) {
  throw new Error('Missing CLERK_PUBLISHABLE_KEY');
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const handleSplashFinish = () => {
    setIsSplashFinished(true);
  };

  if (!isSplashFinished) {
    return <AppSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <Slot />
        </ClerkLoaded>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
