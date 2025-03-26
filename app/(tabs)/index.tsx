import React, { useState, useEffect, useCallback } from 'react';
import axios, { Axios } from 'axios';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Button,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/main-kid.styles';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native';

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

    const childId = 'ac0d5b82-88cd-4d87-bdd6-3503602f6d81'
  
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

  const fetchAllData = async () => {
    try {
      const [balanceRes, transactionsRes, tasksRes] = await Promise.all([
        axios.get('http://127.0.0.1:3000/users/balance'),
        axios.get('http://127.0.0.1:3000/users/transactions'),
        axios.get('http://127.0.0.1:3000/users/tasks'),
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
        const response = await axios.get('http://localhost:3000/users/transactions');
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
      await axios.post(`http://localhost:3000/users/nfc-transactions/${transactionId}/toggle`);
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
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.header}>
            <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
            <Text style={styles.balanceText}>{balance.toLocaleString()} ₪</Text>
            <Text style={styles.balanceLabel}>היתרה שלי</Text>
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={styles.transactionsContainer}>
            <Text style={styles.sectionTitle}>תנועות אחרונות</Text>
            {transactionsError !== '' && <Text style={styles.errorText}>{transactionsError}</Text>}

            {transactions.length === 0 ? (
              <View style={styles.emptySection}>
                <Text style={styles.emptyText}>
                  כאן יופיעו הקניות שתעשה כשתשלם בחנויות מהארנק שלך 🛍️
                </Text>
              </View>
            ) : (
              transactions.map((item) => (
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

          <View style={styles.tasksContainer}>
            <Text style={styles.sectionTitle}>משימות להשלמה</Text>
            {tasksError !== '' && <Text style={styles.errorText}>{tasksError}</Text>}

            {tasks.length === 0 ? (
              <View style={styles.emptySection}>
                <Text style={styles.emptyText}>
                  כאן יופיעו המשימות שההורים יתנו לך 🎯
                </Text>
               </View>
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.task_id}
                horizontal
                renderItem={({ item }) => (
                  <View style={styles.taskItem}>
                    <Text style={styles.taskText}>{item.name}</Text>
                    <Text style={styles.taskReward}>{item.payment_amount} ₪</Text>
                    <TouchableOpacity style={styles.taskButton}>
                      <Text style={styles.taskButtonText}>בוצע</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>

          <View style={styles.nfcContainer}>
            <Text style={styles.sectionTitle}>עסקאות NFC לאישור</Text>
            {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
            <FlatList
              data={nfcTransactions}
              keyExtractor={(item) => item.transaction_id}
              renderItem={({ item }) => (
                <View style={styles.transactionRow}>
                  <Text style={styles.transactionText}>{item.description}</Text>
                  <Text style={styles.transactionAmount}>{item.amount} ₪</Text>
                  <TouchableOpacity
                    style={[styles.toggleButton, item.status === 'approved' ? styles.approved : styles.pending]}
                    onPress={() => toggleActivation(item.transaction_id, item.status)}
                  >
                    <Text style={styles.toggleButtonText}>{item.status === 'pending' ? 'אשר' : 'בטל'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View>

      <TouchableOpacity style={styles.payButton} onPress={handleButtonClick}>
          <Text style={styles.payButtonText}>בקש מההורים לפתוח תשלום</Text>
        </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>סכום לתשלום</Text>

            <Text>סכום לתשלום:</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="הכנס סכום"
              keyboardType="numeric"
              textAlign="right"
            />

            <Text>הודעה לאמא:</Text>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="הכנס הודעה"
              multiline
            />

            <Button  color="#3F51B5" title="שלח" onPress={handleSendClick} />
            <Button title="ביטול" color="#3F51B5" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
      </View>
    </SafeAreaView>
  );

};

export default MainKidScreen;
