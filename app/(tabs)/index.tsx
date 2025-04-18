import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/main-kid.styles';
import PaymentRequestModal from '../popups/payment-request-modal';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import NfcChargeModal from '../popups/nfc-charge-modal';


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
  task_status: string;
};


const MainKidScreen = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [nfcModalVisible, setNfcModalVisible] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const [error, setError] = useState('');

  const [transactionsError, setTransactionsError] = useState('');
  const [tasksError, setTasksError] = useState('');
 
  const route = useRoute();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requests, setRequests] = useState<Transaction[]>([]);
  const [requestsError, setRequestsError] = useState('');

  const childId = 'ac0d5b82-88cd-4d87-bdd6-3503602f6d81'
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP

  const fetchAllData = async () => {
    try {
      const [balanceRes, transactionsRes, tasksRes, requestsRes] = await Promise.all([
        axios.get(`http://${LOCAL_IP}:3000/users/balance/${childId}`),
        axios.get(`http://${LOCAL_IP}:3000/users/transactions/${childId}?transaction_status=COMPLETED`),
        axios.get(`http://${LOCAL_IP}:3000/users/tasks/${childId}`),
        axios.get(`http://${LOCAL_IP}:3000/users/transactions/${childId}?transaction_status=APPROVED_BY_PARENT`), 
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
      console.error('❌ שגיאה כללית:', error);
      setError('שגיאה בשליפת יתרה 😢');
      setTransactionsError('שגיאה בשליפת תנועות 😢');
      setTasksError('שגיאה בשליפת משימות 😢');
      setRequestsError('שגיאה בשליפת בקשות 😢');
  };}
  

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

  // פונקציה לקביעת צבע לפי סטטוס תנועה
  const getRequestColor = (status: string) => {
    const positiveTypes = ['APPROVED_BY_PARENT'];
    return positiveTypes.includes(status.toLowerCase()) ? 'green' : 'orange';
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* אזור ההיתרה */}
      <View style={styles.header}>
            <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
            <Text style={styles.balanceText}>{balance.toLocaleString()} ₪</Text>
            <Text style={styles.balanceLabel}>היתרה שלי</Text>
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false} 
      >  
          {/* קניות אחרונות */}
          <View style={styles.transactionsContainer}>
            <Text style={styles.sectionTitle}>תנועות אחרונות</Text>
            {transactions.length === 0 ? (
              <View style={styles.emptySection}>
                <Text style={styles.emptyText}>כאן יופיעו הקניות שתעשה בחנויות או התשלומים שתקבל🛍️</Text>
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
          <Text style={styles.sectionTitle}>בקשות שאושרו לחיוב</Text>
          <Text style={styles.sectionSubtitle}>לחץ על האייקון כדי לבצע חיוב</Text>

          {requests.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>אין כרגע בקשות מאושרות</Text>
            </View>
          ) : (
            <View style={styles.nfcScrollViewContainer}>
            <ScrollView
              style={styles.nfcScrollView}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={true}
            >
              {requests.map((item) => (
                <View key={item.transaction_id} style={styles.transactionItem}>
                  
                  <TouchableOpacity activeOpacity={0.6}
                    onPress={() => {
                      setSelectedTransactionId(item.transaction_id);
                      setNfcModalVisible(true);
                    }}>
                    <Ionicons name="card-outline" size={24} color={getRequestColor(item.status)}/>
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

       {/* כפתור קבוע בתחתית המסך */}
       <View style={styles.payButtonBackground}>
        <View style={styles.payButtonContainer}>
          <TouchableOpacity style={styles.payButton} onPress={() => setIsModalVisible(true)}          >
            <Text style={styles.payButtonText}>בקש מההורים לפתוח תשלום</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <PaymentRequestModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />

      <NfcChargeModal visible={nfcModalVisible} onClose={() => {
      setNfcModalVisible(false);
      setSelectedTransactionId(undefined);
      fetchAllData();
      }} transactionId={selectedTransactionId} />



    </SafeAreaView>
  );
  
  
};

export default MainKidScreen;
