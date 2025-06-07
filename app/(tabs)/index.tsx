import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NfcChargeModal from '../popups/nfc-charge-modal';
import PaymentRequestModal from '../popups/payment-request-modal';
import styles from '../styles/main-kid.styles';
import { useAuth } from '../context/auth-context';
import * as SecureStore from 'expo-secure-store';

type Transaction = {
  transaction_id: string;
  status: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
};

type TaskType = {
  task_id: string;
  name: string;
  payment_amount: number;
};

const MainKidScreen = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [nfcModalVisible, setNfcModalVisible] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();
  const [disabledTasks, setDisabledTasks] = useState<Record<string, boolean>>({});
  const { sub } = useAuth();

  const [error, setError] = useState('');
  const [transactionsError, setTransactionsError] = useState('');
  const [tasksError, setTasksError] = useState('');
  const [requests, setRequests] = useState<Transaction[]>([]);
  const [requestsError, setRequestsError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute();

  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const fetchAllData = async () => {
    try {
      const [balanceRes, transactionsRes, tasksRes, requestsRes] = await Promise.all([
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/balance/${sub}`),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/transactions/${sub}?transaction_status=COMPLETED`),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/tasks/by-child`, {
          headers: { Authorization: `Bearer ${await SecureStore.getItemAsync('token')}` },
        }),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/transactions/${sub}?transaction_status=APPROVED_BY_PARENT`),
      ]);

      setBalance(balanceRes.data.balance);
      setTransactions(transactionsRes.data);
      setTasks(tasksRes.data);
      setRequests(requestsRes.data);

      setError('');
      setTransactionsError('');
      setTasksError('');
      setRequestsError('');
    } catch (error) {
      if (error instanceof Error) {
        console.error('❌ !שגיאה כללית:', error.stack);
        setError('שגיאה בשליפת יתרה 😢');
        setTransactionsError('שגיאה בשליפת תנועות 😢');
        setTasksError('שגיאה בשליפת משימות 😢');
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [])
  );

  useEffect(() => {
    if ((route.params as any)?.refresh) {
      fetchAllData();
    }
  }, [route.params]);

  const getTransactionColor = (type: string) => {
    const positiveTypes = ['parent_deposit', 'goal_deposit', 'store_refund'];
    return positiveTypes.includes(type.toLowerCase()) ? 'green' : 'red';
  };

  const getRequestColor = (status: string) => {
    const positiveTypes = ['APPROVED_BY_PARENT'];
    return positiveTypes.includes(status.toLowerCase()) ? 'green' : 'orange';
  };

  const handleTaskCompletion = async (taskId: string) => {
    setDisabledTasks((prev) => ({ ...prev, [taskId]: true }));
    setTimeout(() => {
      setDisabledTasks((prev) => ({ ...prev, [taskId]: false }));
    }, 30000);

    try {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();

      await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/child-balance/transactions/request-task-payment`, {
        taskId,
        childId: sub,
      }, {
        headers: { Authorization: `Bearer ${await SecureStore.getItemAsync('token')}` }
      });


      alert('הבקשה נשלחה להורה 🎯');
    } catch (err) {
      console.error('❌ שגיאה בשליחת בקשה:', err);
      alert('שגיאה בשליחה. נסה שוב מאוחר יותר.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <Text style={styles.balanceText}>{balance.toLocaleString()} ₪</Text>
        <Text style={styles.balanceLabel}>היתרה שלי</Text>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* תנועות */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>תנועות אחרונות</Text>
          {transactions.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>כאן יופיעו הקניות שתעשה 🛍️</Text>
            </View>
          ) : (
            transactions.slice(0, 4).map((item) => (
              <View key={item.transaction_id} style={styles.transactionItem}>
                <Ionicons
                  name={getTransactionColor(item.type) === 'green' ? 'add-circle' : 'remove-circle'}
                  size={24}
                  color={getTransactionColor(item.type)}
                />
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{item.description || '---'}</Text>
                </View>
                <Text style={[styles.transactionAmount, { color: getTransactionColor(item.type) }]}>
                  {item.amount.toLocaleString()} ₪
                </Text>
              </View>
            ))
          )}
        </View>

        {/* משימות */}
        <View style={styles.tasksContainer}>
          <Text style={styles.sectionTitle}>עובדים ומרוויחים</Text>
          {tasks.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>כאן יופיעו המשימות שתקבל 🎯</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tasksScrollView}>
              {tasks.map((item) => (
                <Animated.View key={item.task_id} style={[styles.taskItem, { transform: [{ scale: scaleAnim }] }]}>
                  <Text style={styles.taskText}>{item.name}</Text>
                  <Text style={styles.taskReward}>{item.payment_amount.toLocaleString()} ₪</Text>
                  <TouchableOpacity
                    style={[styles.taskButton, disabledTasks[item.task_id] && { backgroundColor: 'gray' }]}
                    disabled={disabledTasks[item.task_id]}
                    onPress={() => handleTaskCompletion(item.task_id)}
                  >
                    <Text style={styles.taskButtonText}>
                      {disabledTasks[item.task_id] ? 'נשלח!' : 'בוצע'}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* חיובים שאושרו */}
        <View style={styles.nfcContainer}>
          <Text style={styles.sectionTitle}>בקשות שאושרו לחיוב</Text>
          <Text style={styles.sectionSubtitle}>לחץ על האייקון כדי לבצע חיוב</Text>
          {requests.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>אין כרגע בקשות מאושרות</Text>
            </View>
          ) : (
            <View style={styles.nfcScrollViewContainer}>
              <ScrollView style={styles.nfcScrollView} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true}>
                {requests.map((item) => (
                  <View key={item.transaction_id} style={styles.transactionItem}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        setSelectedTransactionId(item.transaction_id);
                        setNfcModalVisible(true);
                      }}
                    >
                      <Ionicons name="card-outline" size={24} color={getRequestColor(item.status)} />
                    </TouchableOpacity>
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionName}>{item.description}</Text>
                    </View>
                    <Text style={[styles.transactionAmount, { color: getRequestColor(item.status) }]}>
                      {item.amount.toLocaleString()} ₪
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.payButtonBackground}>
        <View style={styles.payButtonContainer}>
          <TouchableOpacity style={styles.payButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.payButtonText}>בקש מההורים לפתוח תשלום</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PaymentRequestModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <NfcChargeModal
        visible={nfcModalVisible}
        onClose={() => {
          setNfcModalVisible(false);
          setSelectedTransactionId(undefined);
          fetchAllData();
        }}
        transactionId={selectedTransactionId}
      />
    </SafeAreaView>
  );
};

export default MainKidScreen;
