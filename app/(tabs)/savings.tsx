import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { styles } from '../styles/savings-screen.styles';
import SavingsFormPopup from '../popups/savings-form-modal';
import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../context/auth-context'; // שימוש ב־sub מהטוקן

const screenWidth = Dimensions.get('window').width;

type Deposit = {
  amount: number;
  timestamp: string;
};

type Goal = {
  id: number;
  name: string;
  category: string;
  target_amount: number;
  current_amount: number;
  start_date: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  deposits: Deposit[];
};

type Props = {
  goal: Goal | null;
  onCreateNewGoal: (goalData: {
    name: string;
    category: string;
    targetAmount: number;
    initialAmount: number;
  }) => void;
};

const SavingsScreen: React.FC<Props> = ({ goal, onCreateNewGoal }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const { sub } = useAuth(); 
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  useEffect(() => {
  const fetchBalance = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const res = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/balance/${sub}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setBalance(res.data.balance);
    } catch (err) {
      console.log('שגיאה בשליפת יתרה', err);
    }
  };

  fetchBalance();
}, []);


  const handleNewGoalSubmit = (data: {
    name: string;
    category: string;
    targetAmount: number;
    initialAmount: number;
  }) => {
    onCreateNewGoal(data);
    setIsPopupVisible(false);
  };

  if (!goal) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('../../assets/images/savings-empty.png')}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>עדיין אין לך חיסכון</Text>
        <Text style={styles.emptySubTitle}>בוא נגדיר מטרה שנחסוך אליה ביחד 🎯</Text>
        <TouchableOpacity style={styles.letsGoButton} onPress={() => setIsPopupVisible(true)}>
          <Text style={styles.letsGoButtonText}>יאללה, בוא נתחיל!</Text>
        </TouchableOpacity>

        <SavingsFormPopup
          visible={isPopupVisible}
          onClose={() => setIsPopupVisible(false)}
          onSubmit={handleNewGoalSubmit}
          availableBalance={balance}
        />
      </View>
    );
  }

  const { current_amount, target_amount } = goal;

  const pieData = [
    {
      name: 'Saved',
      amount: current_amount,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Remaining',
      amount: Math.max(target_amount - current_amount, 0),
      color: '#E0E0E0',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{goal.name}</Text>

      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => '#000',
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.sectionTitle}>הפקדות</Text>

      {goal.deposits.length === 0 ? (
        <Text style={styles.emptyText}>עוד לא בוצעה הפקדה</Text>
      ) : (
        goal.deposits.map((dep, index) => (
          <View key={index} style={styles.depositCard}>
            <Text>סכום: {dep.amount} ₪</Text>
            <Text>
              תאריך: {new Date(dep.timestamp).toLocaleDateString()} -{' '}
              {new Date(dep.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default SavingsScreen;
