import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>Home Page</Text>

      {/* <Link href="/login" >Login</Link>
      <Link href="/profile">Profile</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    fontSize: 20,
    padding: 15,
  },
});
