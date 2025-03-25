import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/main-kid.styles';
import axios from 'axios';
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

  const [error, setError] = useState('');
  const [transactionsError, setTransactionsError] = useState('');
  const [tasksError, setTasksError] = useState('');

  // שליפת יתרה
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/balance');
        setBalance(response.data.balance);
      } catch (error) {
        console.error("❌ Failed to fetch balance:", error);
        setError('שגיאה בשליפת יתרה 😢');
      }
    };

    fetchBalance();
  }, []);

  // שליפת תנועות
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/transactions`);
        setTransactions(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch transactions:", error);
        setTransactionsError('שגיאה בשליפת תנועות 😢');
      }
    };

    fetchTransactions();
  }, []);

  // שליפת משימות
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch tasks:", error);
        setTasksError('שגיאה בשליפת משימות 😢');
      }
    };

    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
            <Text style={styles.balanceText}>{balance.toLocaleString()} ₪</Text>
            <Text style={styles.balanceLabel}>היתרה שלי</Text>
            {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
          </View>

          <View style={styles.transactionsContainer}>
            <Text style={styles.sectionTitle}>תנועות אחרונות</Text>
            {transactionsError !== '' && <Text style={{ color: 'red' }}>{transactionsError}</Text>}

            {transactions.length === 0 ? (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: '#888', fontSize: 16, textAlign: 'center' }}>
                  כאן יופיעו הקניות שתעשה כשתשלם בחנויות מהארנק שלך 🛍️
                </Text>
              </View>
            ) : (
              transactions.map((item) => (
                <View key={item.transaction_id} style={styles.transactionItem}>
                  <Ionicons
                    name={item.type === 'deposit' ? 'add-circle' : 'remove-circle'}
                    size={24}
                    color={item.type === 'deposit' ? 'green' : 'red'}
                  />
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>{item.description || '---'}</Text>
                    <Text style={styles.transactionCategory}>{item.type}</Text>
                  </View>
                  <Text style={[styles.transactionAmount, { color: item.type === 'deposit' ? 'green' : 'red' }]}>
                    {item.amount.toLocaleString()} ₪
                  </Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.tasksContainer}>
            <Text style={styles.sectionTitle}>משימות להשלמה</Text>
            {tasksError !== '' && <Text style={{ color: 'red' }}>{tasksError}</Text>}

            {tasks.length === 0 ? (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: '#888', fontSize: 16, textAlign: 'center' }}>
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
