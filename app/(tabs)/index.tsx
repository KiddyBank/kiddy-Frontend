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
import PaymentRequestModal from '../popups/payment-request-modal';
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

type Requests = {
  request_id: string;
  description: string;
  amount: number;
  status: 'PENDING_FOR_PARENT' | 'APPORVED_BY_PARENT';
};

const MainKidScreen = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState('');
  const [transactionsError, setTransactionsError] = useState('');
  const [tasksError, setTasksError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const childId = 'ac0d5b82-88cd-4d87-bdd6-3503602f6d81'



  // Handler to toggle the modal visibility
  const handleButtonClick = () => {
    setShowModal(true);
  };

  // Handler for the "Send" button click
  const handleSendClick = async () => {
    const data = {
      amount: amount,
      description: message,
    };

  
    try {
      const response = await axios.post('http://localhost:3000/child-balance/place-payment-request/' + childId,
        data, { headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        Alert.alert("יש! בקשת האישור נשלחה וממתינה לאישור ההורה");
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        Alert.alert("אוי לא! בקשת האישור לא הצליחה להשלח, אנא נסה שוב");
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        console.error('Unexpected error:', error);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert("אוי לא! יש לנו קצת בעיות טכניות אנא נסה שוב מאוחר יותר");
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      console.error('Unexpected error:', error);
    }
  };


  const route = useRoute();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requests, setRequests] = useState<Requests[]>([]);
  const [requestsError, setRequestsError] = useState('');



  const childId = 'ac0d5b82-88cd-4d87-bdd6-3503602f6d81'
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP

  const fetchAllData = async () => {
    try {
      const [balanceRes, transactionsRes, tasksRes, requestsRes] = await Promise.all([
        axios.get(`http://${LOCAL_IP}:3000/users/balance`),
        axios.get(`http://${LOCAL_IP}:3000/users/transactions`),
        axios.get(`http://${LOCAL_IP}:3000/users/tasks`),
        axios.get(`http://${LOCAL_IP}:3000/users/requests`), 
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
  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllData().finally(() => setRefreshing(false));
  }, []);


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
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false} 
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
          <Text style={styles.sectionTitle}>בקשות שמחכות לאישור ההורים</Text>

          {requests.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>אין כרגע בקשות ממתינות</Text>
            </View>
          ) : (
            <View style={styles.nfcScrollViewContainer}> 
              <ScrollView 
                style={styles.nfcScrollView} 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={true}
              >
                {requests.map((item) => (
                  <View key={item.request_id} style={styles.transactionItem}>
                  <Ionicons name="card-outline" size={24} color={getRequestColor(item.status)} />
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
