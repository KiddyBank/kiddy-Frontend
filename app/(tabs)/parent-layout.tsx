import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import styles from '../styles/parent-layout.styles';
import { useAuth } from '../context/auth-context';

type PaymentRequest = {
  transaction_id: string;
  description: string;
  amount: number;
  status: 'PENDING_PARENT_APPROVAL';
};

type Child = {
  name: string;
  balance: number;
  imageUrl: string;
};

export default function ParentScreen() {
  const router = useRouter();
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [error, setError] = useState('');
  const { sub } = useAuth(); 

  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const fetchPaymentRequests = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/parents/${sub}/children-payment-requests`);
      setPaymentRequests(response.data);
    } catch (error) {
      console.error('❌ שגיאה בשליפת בקשות של ילדים', error);
      setError('שגיאה בשליפת בקשות של ילדים');
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/parents/${sub}/children`);
      setChildren(response.data);
    } catch (error) {
      console.error('❌ Error fetching children', error);
    }
  };

  const approvePaymentRequest = async (transactionId: string) => {
    try {
      await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/users/parents/${sub}/accept-payment-request`, {
        transactionId
      });
      setPaymentRequests(prev => prev.filter(request => request.transaction_id !== transactionId));
    } catch (error) {
      console.error("❌ Error approving payment request", error);
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>יתרות הילדים</Text>
      </View>

      <View style={styles.kidsContainer}>
        {children.map((child, index) => (
          
          <View key={index} style={styles.kid}>
            <TouchableHighlight onPress={() => toChild()}>
              <Image
                style={[styles.image, { marginBottom: 10 }]}
                source={{
                  uri: child.imageUrl || 'https://pauladeegan.co.uk/wp-content/uploads/2022/03/what-to-wear-for-kids-acting-headshots-banner.jpg',
                }}
              />
            </TouchableHighlight>
            <View style={[styles.kidDetails, { alignItems: 'center', padding: 5 }]}>
              <Text style={[styles.kidBalance, { fontSize: 18, fontWeight: 'bold', color: '#333',  writingDirection: 'rtl' }]}>
                {child.balance} ₪
              </Text>
              <Text style={[styles.kidName, { fontSize: 14, color: '#555',  }]}>
                {child.name}
              </Text>
            </View>
           
          </View>
        ))}
      </View>

      <View style={styles.nfcContainer}>
        <Text style={styles.sectionTitle}>בקשות תשלום ממתינות לאישור</Text>
        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}

        <FlatList
          data={paymentRequests}
          keyExtractor={(item) => item.transaction_id}
          renderItem={({ item }) => (
            <View style={styles.transactionRow}>
              <Text style={styles.transactionText}>{item.description}</Text>
              <Text style={styles.transactionAmount}>{item.amount} ₪</Text>
              <TouchableOpacity
                style={[styles.toggleButton, styles.pending]}
                onPress={() => approvePaymentRequest(item.transaction_id)}
              >
                <Text style={styles.toggleButtonText}>אשר</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
