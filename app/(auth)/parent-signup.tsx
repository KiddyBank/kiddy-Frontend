import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

export default function ParentSignup() {
  const router = useRouter();
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    try {
      await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/auth/register-parent`, form);
      alert('Parent registered! Please login.');
      router.push('/login-dialog');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register as Parent</Text>
      <TextInput placeholder="Name" onChangeText={(v) => handleChange('name', v)} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(v) => handleChange('email', v)} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={(v) => handleChange('password', v)} style={styles.input} />
      <TextInput placeholder="Phone" onChangeText={(v) => handleChange('phone', v)} style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 },
});
