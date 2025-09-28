import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@/constants/Colors';
import { SplashScreenProps } from '@/types/movie';

export default function AppSplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Simulate some loading time (you can replace this with actual data fetching)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Hide the splash screen
        await SplashScreen.hideAsync();

        // Notify parent that splash is finished
        onFinish();
      } catch (e) {
        console.warn(e);
        // Even if there's an error, hide the splash screen
        await SplashScreen.hideAsync();
        onFinish();
      }
    };

    prepare();
  }, [onFinish]);

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1a2e" />
      <View style={styles.content}>
        {/* App Icon/Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🎬</Text>
          <Text style={styles.appName}>Movie Explorer</Text>
        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading amazing movies...</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
});
