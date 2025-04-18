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
    console.log("started mounting app layout")
    if (loading) return;
    console.log("role is", role);

    if (role === AccountType.PARENT) {
      router.replace('/parent-layout');
    } else if (role === AccountType.CHILD) {
      router.replace('/(tabs)');
    } else {
      router.replace('/login-dialog');
    }
    console.log("finished mounting app layout")
  },  [token,sub,role, router, loading]);


  return (
        <Slot />
  );
}
