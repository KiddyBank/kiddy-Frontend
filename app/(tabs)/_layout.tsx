import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Alert, Platform } from 'react-native';
import { AccountType } from '../(app)/_layout';
import { useAuth } from '../context/auth-context';

function TabScreens() {
  const colorScheme = useColorScheme();
  const { role, logout } = useAuth();

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' },
    ]);
  };

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
        name="strategy-map"
        options={{
          href: role === AccountType.CHILD ? "/strategy-map" : null,
          title: 'מפת התקדמות',

          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'אתגרים',
          href: role === AccountType.CHILD ? "/challenges" : null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="trophy" color={color} />
          ),
        }}

      />
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
          href: role === AccountType.CHILD ? "/games" : null,
          title: 'משחקים',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gamecontroller.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: role === AccountType.CHILD ? "/" : null,
          title: 'ראשי',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ParentScreen"
        options={{
          href: role === AccountType.PARENT ? "/ParentScreen" : null,
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
      <Tabs.Screen
        name="logout"
        options={{
          title: 'התנתקות',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="exit-to-app" color={color} />
          ),

        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            confirmLogout();
          },
        }}
      />
    </Tabs>

  );
}

export default function TabLayout() {
  return (
    <TabScreens />
  );
}
