import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn ?? false}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
            animationTypeForReplace: 'push',
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!(isSignedIn ?? false)}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
