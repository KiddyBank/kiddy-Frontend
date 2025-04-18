import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, createContext } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

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
      router.push('/ParentScreen');
    }
  }, [accountType]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AccountContext.Provider value={accountType}>
        {!accountType ? (
          <View style={pageStyles.container}>
            <TouchableOpacity
              style={pageStyles.bigButton}
              onPress={() => setAccountType(AccountType.KID)}
            >
              <Text style={pageStyles.buttonText}>ילד</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={pageStyles.bigButton}
              onPress={() => setAccountType(AccountType.PARENT)}
            >
              <Text style={pageStyles.buttonText}>הורה</Text>
            </TouchableOpacity>
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
    backgroundColor: '#F5F5F5',
  },
  bigButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginVertical: 15,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
