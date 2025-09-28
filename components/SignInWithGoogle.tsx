import React from 'react';
import StyledButton from '@/components/StyledButton';
import { Colors } from '@/constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import useLogInGoogle from '@/hooks/useLogInGoogle';

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export const SignInWithGoogle = ({ setError }: { setError: any }) => {
  useWarmUpBrowser();
  const { onSignInWithGooglePress } = useLogInGoogle();

  return (
    <StyledButton
      onPress={onSignInWithGooglePress}
      style={{
        backgroundColor: Colors.primaryGoogle,
        marginTop: 8,
        marginBottom: 24,
        borderRadius: 12,
        minHeight: 50,
        width: '100%',
      }}
      title="Sign In With Google"
    />
  );
};
