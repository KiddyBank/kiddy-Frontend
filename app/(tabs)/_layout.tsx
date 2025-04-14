import { Tabs, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AccountContext, AccountType } from '../_layout';
import { AuthProvider, useAuth } from '../context/auth-context'; // ✅

function TabScreens() {
  const colorScheme = useColorScheme();
  const accountType = useContext(AccountContext);
  const { token } = useAuth(); // ✅ check auth
  const router = useRouter(); // ✅ router to redirect

  useEffect(() => {
    if (!token) {
      router.replace('/'); // ✅ redirect to login if unauthenticated
    }
  }, [token]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="savings"
        options={{
          title: 'חיסכון',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="piggybank.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          href: accountType === AccountType.KID ? "/games" : null,
          title: 'משחקים',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gamecontroller.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="nfc-pay"
        options={{
          title: 'תשלום',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="creditcard.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: accountType === AccountType.KID ? "/" : null,
          title: 'ראשי',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="parent"
        options={{
          title: 'ראשי',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'אזור אישי',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <AuthProvider>
      <TabScreens />
    </AuthProvider>
  );
}
