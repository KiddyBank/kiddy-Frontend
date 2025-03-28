import React, { useState, useEffect, useCallback } from 'react';
import axios, { Axios } from 'axios';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/main-kid.styles';
import PaymentRequestModal from '../popups/PaymentRequestModal';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';


type Transaction = {
  transaction_id: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
};

type TaskType = {
  task_id: string;
  name: string;
  payment_amount: number;
  task_status: string;
};

type NfcTransaction = {
  transaction_id: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved';
};

const MainKidScreen = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [nfcTransactions, setNfcTransactions] = useState<NfcTransaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState('');
  const [transactionsError, setTransactionsError] = useState('');
  const [tasksError, setTasksError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const route = useRoute();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const childId = 'ac0d5b82-88cd-4d87-bdd6-3503602f6d81'
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP

  const fetchAllData = async () => {
    try {
      const [balanceRes, transactionsRes, tasksRes] = await Promise.all([
        axios.get(`http://${LOCAL_IP}:3000/users/balance`),
        axios.get(`http://${LOCAL_IP}:3000/users/transactions?transactionStatus=COMPLETED`),
        axios.get(`http://${LOCAL_IP}:3000/users/tasks`),
      ]);

      setBalance(balanceRes.data.balance);
      setTransactions(transactionsRes.data);
      setTasks(tasksRes.data);

      setError('');
      setTransactionsError('');
      setTasksError('');
    } catch (error) {
      console.error('❌ שגיאה כללית:', error);
      setError('שגיאה בשליפת יתרה 😢');
      setTransactionsError('שגיאה בשליפת תנועות 😢');
      setTasksError('שגיאה בשליפת משימות 😢');
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllData().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const fetchNfcTransactions = async () => {
      try {
        const response = await axios.get(`http://${LOCAL_IP}:3000/users/transactions?transactionStatus=APPROVED_BY_PARENT`);
        setNfcTransactions(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch NFC transactions:", error);
        setError('שגיאה בשליפת עסקאות NFC 😢');
      }
    };

    fetchNfcTransactions();
  }, []);

  const toggleActivation = async (transactionId: string, currentStatus: string) => {
    try {
      await axios.post(`http://${LOCAL_IP}:3000/users/nfc-transactions/${transactionId}/toggle`);
      setNfcTransactions((prev) =>
        prev.map((txn) =>
          txn.transaction_id === transactionId ? { ...txn, status: currentStatus === 'pending' ? 'approved' : 'pending' } : txn
        )
      );
    } catch (error) {
      console.error("❌ שגיאה בזיהוי סטטוס NFC", error);
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

  // פונקציה לקביעת צבע לפי סוג תנועה
  const getTransactionColor = (type: string) => {
    const positiveTypes = ['parent_deposit', 'goal_deposit', 'store_refund'];
    return positiveTypes.includes(type.toLowerCase()) ? 'green' : 'red';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false} // מסתיר את פס הגלילה
      >
        <View style={styles.innerContainer}>
  
          {/* אזור ההיתרה */}
          <View style={styles.header}>
            <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
            <Text style={styles.balanceText}>{balance.toLocaleString()} ₪</Text>
            <Text style={styles.balanceLabel}>היתרה שלי</Text>
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </View>
  
          {/* קניות אחרונות */}
          <View style={styles.transactionsContainer}>
            <Text style={styles.sectionTitle}>קניות שביצעת</Text>
            {transactions.length === 0 ? (
              <View style={styles.emptySection}>
                <Text style={styles.emptyText}>כאן יופיעו הקניות שתעשה בחנויות 🛍️</Text>
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
                  <View key={item.task_id} style={styles.taskItem}>
                    <Text style={styles.taskText}>{item.name}</Text>
                    <Text style={styles.taskReward}>{item.payment_amount.toLocaleString()} ₪</Text>
                    <TouchableOpacity style={styles.taskButton}>
                      <Text style={styles.taskButtonText}>בוצע</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
  
          {/* בקשות להורים */}
          <View style={styles.nfcContainer}>
          <Text style={styles.sectionTitle}>בקשות שמחכות לאישור ההורים</Text>

          {nfcTransactions.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>אין כרגע בקשות ממתינות</Text>
            </View>
          ) : (
            <View style={styles.nfcScrollViewContainer}> 
              <ScrollView 
                style={styles.nfcScrollView} 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={true} // פס גלילה מופעל
              >
                {nfcTransactions.map((item) => (
                  <View key={item.transaction_id} style={styles.transactionItem}>
                    <Ionicons name="card-outline" size={24} color={item.status === 'approved' ? 'green' : 'red'} />
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionName}>{item.description}</Text>
                    </View>
                    <Text style={[styles.transactionAmount, { color: item.status === 'approved' ? 'green' : 'red' }]}>
                      {item.amount.toLocaleString()} ₪
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        </View>
      </ScrollView>
       {/* כפתור קבוע בתחתית המסך */}
       <View style={styles.payButtonBackground}>
        <View style={styles.payButtonContainer}>
          <TouchableOpacity style={styles.payButton} onPress={() => setIsModalVisible(true)}          >
            <Text style={styles.payButtonText}>בקש מההורים לפתוח תשלום</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <PaymentRequestModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />

    </SafeAreaView>
  );
  
  
};

export default MainKidScreen;
