import { Slot, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useAuth } from '../context/auth-context';

export enum AccountType {
  PARENT = 'parent',
  CHILD = 'child',
}

export default function AppLayout() {
  const router = useRouter();
  const { token, role, sub, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (role === AccountType.PARENT) {
      router.replace('/ParentScreen');
    } else if (role === AccountType.CHILD) {
      router.replace('/(tabs)');
    } else {
      router.replace('/login-dialog');
    }
  }, [token, sub, role, router, loading]);


  return (
    <Slot />
  );
}
