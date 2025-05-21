// app/(auth)/logout.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function LogoutScreen() {
  useEffect(() => {
    const logout = async () => {
      await SecureStore.deleteItemAsync('token');
      router.replace('/(auth)/login-dialog'); 
    };

    logout();
  }, []);

  return null;
}
