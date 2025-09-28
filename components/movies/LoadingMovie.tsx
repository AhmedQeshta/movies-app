import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingMovie = () => {
  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.gradient}>
      <StatusBar style="light" backgroundColor="#1a1a2e" />
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading movie details...</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoadingMovie;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#E5E7EB',
  },
});
