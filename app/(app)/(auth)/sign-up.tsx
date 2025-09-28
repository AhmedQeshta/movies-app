import StyledButton from '@/components/StyledButton';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import useRegister from '@/hooks/useRegister';

const imageSrc = require('@/assets/images/butterflies.png');

export default function SignUp() {
  const {
    pendingVerification,
    code,
    setCode,
    onVerifyPress,
    emailAddress,
    setEmailAddress,
    setPassword,
    password,
    error,
    onSignUpPress,
  } = useRegister();

  if (pendingVerification) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <Image source={imageSrc} style={styles.logo} />
                <Text style={styles.title}>Verify Email</Text>
                <Text style={styles.subtitle}>Enter the verification code sent to your email</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Verification Code</Text>
                  <TextInput
                    value={code}
                    placeholder="Enter verification code"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={(code) => setCode(code)}
                    style={styles.inputText}
                    keyboardType="number-pad"
                  />
                </View>

                <StyledButton
                  onPress={onVerifyPress}
                  title="Verify Email"
                  style={styles.signUpButton}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Image source={imageSrc} style={styles.logo} />
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join us to get started</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.inputText}
                  autoCapitalize="none"
                  value={emailAddress}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={(email) => setEmailAddress(email)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={(password) => setPassword(password)}
                  value={password}
                  autoCapitalize="none"
                  secureTextEntry
                />
              </View>

              {error && <Text style={styles.error}>{error}</Text>}

              <StyledButton
                onPress={onSignUpPress}
                title="Create Account"
                style={styles.signUpButton}
              />

              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Already have an account? </Text>
                <Link href="/sign-in">
                  <Text style={styles.linkButton}>Sign in</Text>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    borderRadius: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputText: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 50,
  },
  error: {
    color: Colors.warning,
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#FEF2F2',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  signUpButton: {
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 12,
    minHeight: 50,
    width: '100%',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    fontSize: 14,
    color: '#6B7280',
  },
  linkButton: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});
