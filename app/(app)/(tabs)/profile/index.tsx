import { SignOutButton } from '@/components/SignOutButton';
import { Colors } from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function ProfilePage() {
  const { user } = useUser();

  const profileSections = [
    {
      title: 'Account Settings',
      items: [
        { icon: 'user', label: 'Edit Profile', action: () => {} },
        { icon: 'bell', label: 'Notifications', action: () => {} },
        { icon: 'shield', label: 'Privacy & Security', action: () => {} },
      ],
    },
    {
      title: 'App Settings',
      items: [
        { icon: 'moon', label: 'Dark Mode', action: () => {} },
        { icon: 'globe', label: 'Language', action: () => {} },
        { icon: 'download', label: 'Download Data', action: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', label: 'Help Center', action: () => {} },
        { icon: 'message-circle', label: 'Contact Support', action: () => {} },
        { icon: 'star', label: 'Rate App', action: () => {} },
      ],
    },
  ];

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: user?.imageUrl || 'https://via.placeholder.com/120',
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <Feather name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{user?.fullName || user?.firstName || 'User'}</Text>
            <Text style={styles.userEmail}>
              {user?.emailAddresses[0]?.emailAddress || 'user@example.com'}
            </Text>
          </View>

          {/* Profile Sections */}
          <View style={styles.sectionsContainer}>
            {profileSections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionItems}>
                  {section.items.map((item, itemIndex) => (
                    <TouchableOpacity
                      key={itemIndex}
                      style={styles.settingItem}
                      onPress={item.action}>
                      <View style={styles.settingItemLeft}>
                        <View style={styles.iconContainer}>
                          <Feather name={item.icon as any} size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.settingItemText}>{item.label}</Text>
                      </View>
                      <AntDesign name="right" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            {/* Sign Out Section */}
            <View style={styles.section}>
              <View style={styles.sectionItems}>
                <View style={styles.signOutContainer}>
                  <SignOutButton />
                </View>
              </View>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  sectionsContainer: {
    gap: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionItems: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingItemText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  signOutContainer: {
    padding: 16,
    alignItems: 'center',
  },
});
