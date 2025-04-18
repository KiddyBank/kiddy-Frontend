import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'expo-router';

export default function LoginDialog() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setToken, setRole, setSub } = useAuth();
  const router = useRouter(); 
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/auth/login`, form);

      const { access_token, refresh_token } = res.data;
      const decoded: any = jwtDecode(access_token);

      await SecureStore.setItemAsync('token', access_token);
      await SecureStore.setItemAsync('refresh_token', refresh_token);

      setToken(access_token);
      setRole(decoded.role);
      setSub(decoded.sub);

    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  const handleParentSignup = () => {
    router.push('/parent-signup'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחברות</Text>
      <TextInput
        placeholder="אימייל"
        onChangeText={(v) => setForm({ ...form, email: v })}
        value={form.email}
        style={styles.input}
      />
      <TextInput
        placeholder="סיסמא"
        secureTextEntry
        onChangeText={(v) => setForm({ ...form, password: v })}
        value={form.password}
        style={styles.input}
      />
      <Button title="התחברו" onPress={handleLogin} />
      <TouchableOpacity style={styles.signupButton} onPress={handleParentSignup}>
        <Text style={styles.signupButtonText}>הרשמה כהורה</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5, textAlign: 'right', writingDirection: 'rtl'},
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#4CAF50', 
    padding: 12,
    borderRadius: 5,
    marginTop: 20, 
    alignItems: 'center',
  },
});
