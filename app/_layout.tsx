import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, createContext } from 'react';
import 'react-native-reanimated';
import jwtDecode from 'jwt-decode';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as SecureStore from 'expo-secure-store';
import { AuthProvider } from './context/auth-context';
import React from 'react';

SplashScreen.preventAutoHideAsync();

export enum AccountType {
  PARENT = 1,
  KID = 2
}

export const AccountContext = createContext<AccountType | undefined>(undefined);

export default function RootLayout() {
  const [accountType, setAccountType] = useState<AccountType | undefined>(undefined);
  const [checkedToken, setCheckedToken] = useState(false);
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const init = async () => {
      console.log('Checking token...');
      const token = await SecureStore.getItemAsync('token');
      console.log(' Finished checking token...');

      if (token) {
        try {
          const decoded: any = jwtDecode.jwtDecode(token);
          const role = decoded.role;
          if (role === 'parent') setAccountType(AccountType.PARENT);
          if (role === 'child') setAccountType(AccountType.KID);
        } catch (e) {
          await SecureStore.deleteItemAsync('token');
        }
      }
      setCheckedToken(true);
      if (fontsLoaded) SplashScreen.hideAsync();
    };
    if (fontsLoaded) init();
  }, [fontsLoaded]);

  if (!fontsLoaded || !checkedToken) return null;

  let redirect: string | null = null;
  if (accountType === AccountType.PARENT) {
    redirect = '/parent-layout';
  } else if (accountType === AccountType.KID) {
    redirect = '/';
  } else {
    redirect = '/login-dialog';
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <AccountContext.Provider value={accountType}>
          {redirect && <Redirect href={redirect as any} />} {/* ✅ Safe redirect */}
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AccountContext.Provider>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
