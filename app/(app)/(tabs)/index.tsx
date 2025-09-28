import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import Movies from '@/components/movies/Movies';

export default function Index() {
  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.gradient}>
      <StatusBar style="light" backgroundColor="#1a1a2e" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>🎬 Movie Explorer</Text>
            <Text style={styles.subtitle}>Discover the latest and greatest films</Text>
          </View>

          <View style={styles.content}>
            <Movies />
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  todoContainer: {
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  todoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 22,
  },
  todoStatus: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  todoUser: {
    fontSize: 14,
    color: '#6B7280',
  },
  totalCount: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});
