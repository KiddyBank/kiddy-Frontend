import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import styles from '../styles/parent-layout.styles';

type PaymentRequest = {
  transaction_id: string;
  description: string;
  amount: number;
  status: 'PENDING_PARENT_APPROVAL';
};

type Child = {
  name: string;
  imageUrl: string;
  balance: number;
};

export default function ParentScreen() {
  const router = useRouter();
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const parentId = 'd1e5c471-d6a4-44f1-841a-a5aabef21128';

  const fetchPaymentRequests = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:3000/users/parents/${parentId}/children-payment-requests`);
      setPaymentRequests(response.data);
    } catch (error) {
      console.error('❌ שגיאה בשליפת בקשות של ילדים', error);
      setError('שגיאה בשליפת בקשות של ילדים');
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:3000/users/parents/${parentId}/children`);
      setChildren(response.data);
    } catch (error) {
      console.error('❌ שגיאה בשליפת ילדים', error);
      setError('שגיאה בשליפת ילדים');
    }
  };

  const showMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  const handlePaymentRequest = async (
    transactionId: string,
    action: 'approve' | 'reject'
  ) => {
    try {
      await axios.post(`http://${LOCAL_IP}:3000/users/parents/${parentId}/handle-payment-request`, {
        transactionId,
        action,
      });
      setPaymentRequests(prev => prev.filter(req => req.transaction_id !== transactionId));
      const message = action === 'approve' ? '✔️ בקשה אושרה בהצלחה' : '❌ הבקשה נדחתה בהצלחה';
      showMessage(message);
    } catch (error: any) {
      console.error(`❌ שגיאה בביצוע פעולה (${action})`, error?.response?.data || error.message);
      showMessage('⚠️ שגיאה בטיפול בבקשה');
    }
  };
  
  

  useEffect(() => {
    fetchPaymentRequests();
    fetchChildren();
  }, []);

  const toChild = () => {
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>יתרות הילדים</Text>
      </View>

      <View style={styles.kidsContainer}>
        {children.map((kid, index) => (
          <View style={styles.kid} key={index}>
            <TouchableHighlight onPress={() => toChild()}>
              <Image style={styles.image} source={{ uri: kid.imageUrl }} />
            </TouchableHighlight>
            <View style={styles.kidDetails}>
              <Text style={styles.kidName}>{kid.name}</Text>
              <Text style={styles.kidBalance}>{kid.balance} ש"ח</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.nfcContainer}>
        <Text style={styles.sectionTitle}>בקשות תשלום ממתינות לאישור</Text>
        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
        {successMessage && (
          <View style={styles.successMessageBox}>
            <Text style={styles.successMessageText}>{successMessage}</Text>
          </View>
        )}
        {paymentRequests.map((item) => (
          <View key={item.transaction_id} style={styles.transactionRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.transactionText}>{item.description}</Text>
              <Text style={styles.transactionAmount}>{item.amount} ₪</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggleButton, styles.approveButton]}
              onPress={() => handlePaymentRequest(item.transaction_id, 'approve')}
            >
              <Text style={styles.toggleButtonText}>אשר</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleButton, styles.rejectButton]}
              onPress={() => handlePaymentRequest(item.transaction_id, 'reject')}
            >
              <Text style={styles.toggleButtonText}>סרב</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
