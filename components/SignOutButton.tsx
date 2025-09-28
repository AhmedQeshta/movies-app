import { useClerk } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { Text, TouchableOpacity } from 'react-native';
import StyledButton from '@/components/StyledButton';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <StyledButton
      onPress={handleSignOut}
      title="Sign Out"
      style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#be2d09', width: '30%' }}
      textStyle={{ color: 'white', fontWeight: 'bold' }}
    />
  );
};
