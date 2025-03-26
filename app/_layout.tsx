import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, createContext } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View, StyleSheet, Button } from 'react-native';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export enum AccountType {
  PARENT = 1,
  KID = 2
}

export const AccountContext = createContext<AccountType | undefined>(undefined);

export default function RootLayout() {
  const [accountType, setAccountType] = useState<AccountType | undefined>(undefined);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // ניווט לפי סוג משתמש
  useEffect(() => {
    if (accountType === AccountType.KID) {
      router.push('/');
    } else if (accountType === AccountType.PARENT) {
      router.push('/parent');
    }
  }, [accountType]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AccountContext.Provider value={accountType}>
        {!accountType ? (
          <View style={pageStyles.container}>
            <Button title="ילד" onPress={() => setAccountType(AccountType.KID)} />
            <Button title="הורה" onPress={() => setAccountType(AccountType.PARENT)} />
          </View>
        ) : (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        )}
      </AccountContext.Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const pageStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
