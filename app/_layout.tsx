import React from 'react';
import 'react-native-reanimated';
import { AuthProvider } from './context/auth-context';
import AppLayout from './(app)/_layout';

export default function RootLayout() {

  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
      );
}
