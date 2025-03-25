import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/main-kid.styles';
import { useRoute, useFocusEffect } from '@react-navigation/native';

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

const MainKidScreen = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState('');
  const [transactionsError, setTransactionsError] = useState('');
  const [tasksError, setTasksError] = useState('');

  const route = useRoute();

  const fetchAllData = async () => {
    try {
      const [balanceRes, transactionsRes, tasksRes] = await Promise.all([
        axios.get('http://192.168.68.110:3000/users/balance'),
        axios.get('http://192.168.68.110:3000/users/transactions'),
        axios.get('http://192.168.68.110:3000/users/tasks'),
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
        </ScrollView>

        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>בקש מההורים לפתוח תשלום</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainKidScreen;
