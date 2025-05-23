import axios from 'axios';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../context/auth-context';
import AllowanceModal from '../popups/allowance-modal';
import styles from '../styles/parent.styles';

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
  id: string;
  balanceId: number;
  allowanceAmount?: number;
  allowanceInterval?: 'monthly' | 'weekly' | 'test';
};

export default function ParentScreen() {
  const router = useRouter();
  const { sub } = useAuth();

  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedKid, setSelectedKid] = useState<Child | null>(null);
  const [showAllowanceModal, setShowAllowanceModal] = useState(false);
  const [allowanceAmount, setAllowanceAmount] = useState('');
  const [allowanceInterval, setAllowanceInterval] = useState<'monthly' | 'weekly' | 'test'>('monthly');
  const [isLoading, setIsLoading] = useState(true);

  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const fetchPaymentRequests = async () => {
    try {
      const response = await axios.get(
        `http://${LOCAL_IP}:${LOCAL_PORT}/users/parents/${sub}/children-payment-requests`
      );
      setPaymentRequests(response.data);
    } catch (error) {
      console.error('❌ שגיאה בשליפת בקשות של ילדים', error);
      setError('שגיאה בשליפת בקשות של ילדים');
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/parents/${sub}/children`);
      const converted: Child[] = response.data.map((kid: any) => ({
        id: kid.user_id ?? kid.id,
        name: kid.username ?? kid.name,
        imageUrl: kid.imageUrl,
        balance: kid.balance,
        balanceId: kid.balanceId,
        allowanceAmount: kid.allowanceAmount,
        allowanceInterval: kid.allowanceInterval,
      }));
      setChildren(converted);
    } catch (error) {
      console.error('❌ שגיאה בשליפת ילדים', error);
      setError('שגיאה בשליפת ילדים');
    }
  };

  const handlePaymentRequest = async (transactionId: string, action: 'approve' | 'reject') => {
    try {
      await axios.post(`http://${LOCAL_IP}:3000/users/parents/${sub}/handle-payment-request`, {
        transactionId,
        action,
      });
      setPaymentRequests((prev) => prev.filter((req) => req.transaction_id !== transactionId));
      const message = action === 'approve' ? 'בקשה אושרה בהצלחה' : 'הבקשה נדחתה בהצלחה';
      alert(message);
    } catch (error: any) {
      console.error(`שגיאה בביצוע פעולה (${action})`, error?.response?.data || error.message);
      alert('שגיאה בטיפול בבקשה');
    }
  };

  const openAllowanceModal = (kid: Child) => {
    setSelectedKid(kid);
    setAllowanceAmount(kid.allowanceAmount?.toString() || '');
    setAllowanceInterval(kid.allowanceInterval || 'monthly');
    setShowAllowanceModal(true);
  };

  const saveAllowance = async () => {
    if (!selectedKid) return;
    try {
      await axios.post(`http://${LOCAL_IP}:3000/standing-orders/set-allowance`, {
        balanceId: selectedKid.balanceId,
        amount: Number(allowanceAmount),
        daysFrequency: intervalToDays(allowanceInterval),
        startDate: new Date().toISOString().split('T')[0],
      });
      setShowAllowanceModal(false);
      fetchChildren();
      alert('דמי כיס נשמרו');
    } catch (err) {
      console.error('שגיאה בשמירת דמי כיס', err);
      alert('שגיאה בשמירת דמי כיס');
    }
  };

  const removeAllowance = async () => {
    if (!selectedKid) return;
    try {
      await axios.post(`http://${LOCAL_IP}:3000/standing-orders/remove/${selectedKid.balanceId}`);
      setShowAllowanceModal(false);
      fetchChildren();
      alert('דמי כיס הוסרו');
    } catch (err) {
      console.error('שגיאה בהסרת דמי כיס', err);
      alert('שגיאה בהסרת דמי כיס');
    }
  };

  const getIntervalLabel = (value?: string) => {
    switch (value) {
      case 'monthly': return 'חודשי';
      case 'weekly': return 'שבועי';
      case 'test': return 'בדיקה';
      default: return '';
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchPaymentRequests();
      await fetchChildren();
      setIsLoading(false);
    };
    load();
  }, []);

  const toChild = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>טוען נתונים...</Text>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>יתרות הילדים</Text>
      </View>

      <View style={styles.kidsContainer}>
        {children.map((kid, index) => (
          <View style={styles.kid} key={index}>
            <TouchableOpacity style={styles.allowanceBadge} onPress={() => openAllowanceModal(kid)}>
              {kid.allowanceAmount ? (
                <View style={styles.allowanceInfo}>
                  <Text style={styles.allowanceAmount}>{kid.allowanceAmount}₪</Text>
                  <Text style={styles.allowanceInterval}>{getIntervalLabel(kid.allowanceInterval)}</Text>
                </View>
              ) : (
                <Text style={styles.setAllowance}>+ הגדר דמי כיס</Text>
              )}
            </TouchableOpacity>

            <TouchableHighlight onPress={toChild}>
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

      <AllowanceModal
        visible={showAllowanceModal}
        onClose={() => setShowAllowanceModal(false)}
        onSave={saveAllowance}
        onRemove={removeAllowance}
        allowanceAmount={allowanceAmount}
        setAllowanceAmount={setAllowanceAmount}
        allowanceInterval={allowanceInterval}
        setAllowanceInterval={setAllowanceInterval}
        kidName={selectedKid?.name}
      />
    </ScrollView>
  );
}

// Helper to convert interval to days
function intervalToDays(interval: 'monthly' | 'weekly' | 'test'): number {
  switch (interval) {
    case 'monthly': return 30;
    case 'weekly': return 7;
    case 'test': return 1;
  }
}
