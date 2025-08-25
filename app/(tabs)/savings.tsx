import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { styles } from '../styles/savings-screen.styles';
import SavingsFormPopup from '../popups/new-savings-form-modal';
import AddToSavingsFormModal from '../popups/add-to-savings-form-modal';
import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../context/auth-context';
import ConfettiOverlay from '../../components/ConfettiOverlay';


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
  deposits?: Deposit[];
};

type Transaction = {
  transaction_id: string;
  status: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
};

const SavingsScreen: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showManualDepositPopup, setShowManualDepositPopup] = useState(false);
  const [balance, setBalance] = useState(0);
  const [balanceId, setBalanceId] = useState<number | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [goalTransactions, setGoalTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { sub } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState('');


  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBalance();

    const token = await SecureStore.getItemAsync('token');
    const res = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/savings-goals/by-user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.length > 0) {
      const refreshedGoal = res.data[0];
      setGoal(refreshedGoal);
      await fetchGoalTransactions(refreshedGoal.id);
    } else {
      setGoal(null);
      setGoalTransactions([]);
    }

    setRefreshing(false);
  };

  const fetchBalance = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const res = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/balance/${sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBalance(res.data.balance);
      setBalanceId(res.data.balance_id);
    } catch (err) {
      console.log('שגיאה בשליפת יתרה', err);
    }
  };


  const fetchGoal = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const res = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/savings-goals/by-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.length > 0) setGoal(res.data[0]);
      else setGoal(null);
    } catch (err) {
      console.log('שגיאה בשליפת חיסכון', err);
    }
  };

  const fetchGoalTransactions = async (goalId: number) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const res = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/savings-goals/${goalId}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoalTransactions(res.data);
    } catch (err) {
      console.log('שגיאה בשליפת טרנזקציות לחיסכון', err);
    }
  };

  const handleNewGoalSubmit = async (data: {
    name: string;
    category: string;
    targetAmount: number;
    initialAmount: number;
  }) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/savings-goals`, {
        ...data,
        userId: sub,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsPopupVisible(false);
      setTimeout(() => {
        setConfettiMessage('איזה כיף! יש לך מטרה חדשה לחיסכון 🎯');
        setShowConfetti(true);
        onRefresh();
      }, 400);
    } catch (err) {
      console.log('שגיאה ביצירת יעד חדש', err);
    }
  };


  useEffect(() => {
    fetchBalance();
    fetchGoal();
  }, []);

  useEffect(() => {
    if (goal?.id) {
      fetchGoalTransactions(goal.id);
    }
  }, [goal]);

  if (!goal) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
      </ScrollView>
    );
  }

  const pieData = [
    {
      name: 'שקלים בחיסכון',
      amount: Number(goal?.current_amount ?? 0),
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 16,
    },
    {
      name: 'שקלים נדרש עוד לחסוך',
      amount: Math.max(Number(goal?.target_amount ?? 0) - Number(goal?.current_amount ?? 0), 0),
      color: '#e1ebf7',
      legendFontColor: '#333',
      legendFontSize: 16,
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <Text style={styles.goalName}>חיסכון ל{goal.name}</Text>
        <Text style={styles.goalProgress}>היעד- {Number(goal?.target_amount ?? 0).toLocaleString()}₪</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* בלוק עידוד */}
        {balance >= 10 && balanceId && (
          <View style={styles.encouragementContainer}>
            <View style={styles.savingsEncouragement}>
              <Text>נראה שיש לך {balance.toLocaleString()}₪ פנויים ביתרה!</Text>
              <Text>בוא נכניס אותם לחיסכון כדי להגיע ליעד 🤩</Text>
            </View>
            <TouchableOpacity
              style={styles.encourageButton}
              onPress={() => setShowManualDepositPopup(true)}
            >
              <Text style={styles.encourageButtonText}>הפקד לחיסכון</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>התקדמות בחיסכון</Text>
        <View style={styles.graphCard}>
          <View style={styles.graphWrapper}>
            <PieChart
              data={pieData}
              width={220}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: () => '#333',
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="50"
              hasLegend={false}
            />
          </View>

          <View style={styles.customLegendContainer}>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendLabel}>
                {Number(goal?.current_amount ?? 0).toLocaleString()}₪ נשמר בחיסכון
              </Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: '#e1ebf7' }]} />
              <Text style={styles.legendLabel}>
                {Math.max(Number(goal?.target_amount ?? 0) - Number(goal?.current_amount ?? 0), 0).toLocaleString()}₪ נותר לחסוך
              </Text>
            </View>
          </View>
        </View>

        {/* הפקדות */}
        <Text style={styles.sectionTitle}>הפקדות</Text>
        {goalTransactions.length > 0 ? (
          goalTransactions
            .filter(tx => tx.type === 'goal_deposit')
            .map((tx, index) => (
              <View key={index} style={styles.depositCard}>
                <View style={styles.depositRow}>
                  <Text style={styles.depositIcon}>💰</Text>
                  <Text style={styles.depositLabel}>סכום:</Text>
                  <Text style={styles.depositValue}>{Number(tx.amount ?? 0).toLocaleString()}₪</Text>
                </View>
                <View style={styles.depositRow}>
                  <Text style={styles.depositIcon}>📅</Text>
                  <Text style={styles.depositLabel}>תאריך:</Text>
                  <Text style={styles.depositValue}>
                    {new Date(tx.created_at).toLocaleDateString()} בשעה{' '}
                    {new Date(tx.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </Text>
                </View>
                {tx.description && (
                  <View style={styles.depositRow}>
                    <Text style={styles.depositIcon}>📝</Text>
                    <Text style={styles.depositLabel}>הערה:</Text>
                    <Text style={styles.depositValue}>{tx.description}</Text>
                  </View>
                )}
              </View>
            ))
        ) : (
          <View style={styles.emptySection}>
            <Text style={styles.emptyText}>עוד לא בוצעה הפקדה</Text>
          </View>
        )}
      </ScrollView>

      {showManualDepositPopup && balanceId !== null && (
        <AddToSavingsFormModal
          visible={showManualDepositPopup}
          onClose={() => setShowManualDepositPopup(false)}
          balanceId={balanceId}
          goalId={goal.id}
          availableBalance={balance}
          remainingToGoal={goal.target_amount - goal.current_amount}
          onSuccess={() => {
            setTimeout(() => {
              setConfettiMessage('כל הכבוד! החיסכון מתקדם 🎯');
              setShowConfetti(true);
              onRefresh();
            }, 400);
          }}
        />

      )}

      <ConfettiOverlay
        visible={showConfetti}
        onFinish={() => setShowConfetti(false)}
        message={confettiMessage}
      />

    </SafeAreaView>
  );
};

export default SavingsScreen;
