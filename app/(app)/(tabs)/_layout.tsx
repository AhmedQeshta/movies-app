import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

export default function TabsLayout() {
  const { user } = useUser();

  // const { isSignedIn } = useAuth();

  // if (!isSignedIn) {
  //   return <Redirect href={'/(app)/(auth)/sign-in'} />;
  // }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size }) => <AntDesign name="home" color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="movies"
        options={{
          headerShown: false,
          title: 'Movies',
          href: null,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: user?.imageUrl }}
              style={{ width: 28, height: 28, borderRadius: 100 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
