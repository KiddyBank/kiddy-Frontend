// app/(auth)/logout.tsx

import { useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function LogoutScreen() {
  useEffect(() => {
    const logout = async () => {
      try {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refresh_token');

        delete axios.defaults.headers.common['Authorization'];

        router.replace('/(auth)/login-dialog');
      } catch (error) {
        console.error('❌ שגיאה בהתנתקות:', error);
      }
    };

    logout();
  }, []);

  return null;
}
