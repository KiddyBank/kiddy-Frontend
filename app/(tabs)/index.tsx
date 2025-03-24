import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/main-kid.styles';


const MainKidScreen = () => {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('http://10.100.102.10:3000/users/balance');
        setBalance(response.data.balance);
      } catch (error) {
        console.error("❌ Failed to fetch balance:", error);
        setError('שגיאה בשליפת יתרה 😢');
      }
    };

    fetchBalance();
  }, []);

  const transactions = [
    { id: '1', name: 'רולדין', category: 'אוכל', amount: -280, type: 'expense' },
    { id: '2', name: 'דמי כיס אוקטובר', category: 'הכנסה', amount: 1200, type: 'income' },
    { id: '3', name: 'פלייסטיישן', category: 'בידור', amount: -480, type: 'expense' },
  ];

  const tasks = [
    { id: '1', name: 'להוציא את הכלב', reward: 5, status: 'done' },
    { id: '2', name: 'שיעורי בית עם בטי', reward: 7, status: 'done' },
    { id: '3', name: 'משחק שעה עם לקסי', reward: 3, status: 'done' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <Text style={styles.balanceText}>{balance.toLocaleString()} ₪</Text>
        <Text style={styles.balanceLabel}>היתרה שלי</Text>
        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>תנועות אחרונות</Text>
        {transactions.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <Ionicons
              name={item.type === 'income' ? 'add-circle' : 'remove-circle'}
              size={24}
              color={item.type === 'income' ? 'green' : 'red'}
            />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionCategory}>{item.category}</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: item.type === 'income' ? 'green' : 'red' }]}>
              {item.amount.toLocaleString()} ₪
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.tasksContainer}>
        <Text style={styles.sectionTitle}>משימות להשלמה</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.name}</Text>
              <Text style={styles.taskReward}>{item.reward} ₪</Text>
              <TouchableOpacity style={styles.taskButton}>
                <Text style={styles.taskButtonText}>בוצע</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>בקשה מההורה לפתוח תשלום</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MainKidScreen;
