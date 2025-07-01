import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  RefreshControl,
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
import { useEducationModal } from '@/hooks/useEducationalModal';
import EducationalModal from '../popups/educational-modal';

import * as SecureStore from 'expo-secure-store';
import AddToSavingsFormModal from '../popups/add-to-savings-form-modal';
import { useNavigation } from '@react-navigation/native';
import ConfettiOverlay from '../../components/ConfettiOverlay';

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
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState('');
  const [transactionsError, setTransactionsError] = useState('');
  const [tasksError, setTasksError] = useState('');
  const [requests, setRequests] = useState<Transaction[]>([]);
  const [requestsError, setRequestsError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState('');

  const [showManualDepositPopup, setShowManualDepositPopup] = useState(false);
  const [goal, setGoal] = useState<any>(null);
  const [balanceId, setBalanceId] = useState<number | null>(null);
  const [childName, setChildName] = useState('');



  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const { handlePress, onClose, isVisible, contentUrl } = useEducationModal(
    sub!,
    'PLACE_PAYMENT_REQUEST',
    () => setIsModalVisible(true)
  );


  const fetchAllData = async () => {
    try {
      const [balanceRes, transactionsRes, tasksRes, requestsRes, goalRes, userRes] = await Promise.all([
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/balance/${sub}`),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/transactions/${sub}?transaction_status=COMPLETED`),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/tasks/by-child`, {
          headers: { Authorization: `Bearer ${await SecureStore.getItemAsync('token')}` },
        }),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/transactions/${sub}?transaction_status=APPROVED_BY_PARENT`),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/savings-goals/by-user`, {
          headers: { Authorization: `Bearer ${await SecureStore.getItemAsync('token')}` },
        }),
        axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/${sub}`),
      ]);

      setChildName(userRes.data.username);
      setBalance(balanceRes.data.balance);
      setBalanceId(balanceRes.data.balance_id);
      setTransactions(transactionsRes.data);
      setTasks(tasksRes.data);
      setRequests(requestsRes.data);

      if (goalRes.data.length > 0) {
        setGoal(goalRes.data[0]);
      } else {
        setGoal(null);
      }

      setError('');
      setTransactionsError('');
      setTasksError('');
      setRequestsError('');

      // ✅ בדיקת דמי כיס חדשים והצגת קונפטי
      const lastCheck = await SecureStore.getItemAsync(`last_pocket_money_check_${sub}`);
      const lastDate = lastCheck ? new Date(lastCheck) : new Date(0);

      const newPocketMoneyTx = transactionsRes.data.find(
        (tx: Transaction) =>
          tx.type === 'parent_deposit' &&
          tx.description === 'דמי כיס' &&
          new Date(tx.created_at) > lastDate
      );

      if (newPocketMoneyTx) {
        setConfettiMessage('יש! קיבלת דמי כיס חדשים 🎉');
        setShowConfetti(true);
        await SecureStore.setItemAsync(`last_pocket_money_check_${sub}`, new Date().toISOString());
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('❌ !שגיאה כללית:', error.stack);
        setError('שגיאה בשליפת יתרה 😢');
        setTransactionsError('שגיאה בשליפת תנועות 😢');
        setTasksError('שגיאה בשליפת משימות 😢');
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
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
    switch (type.toLowerCase()) {
      case 'parent_deposit':
      case 'store_refund':
        return 'green'; // הפקדה ליתרה
      case 'goal_deposit':
        return 'purple'; // הפקדה לחיסכון
      case 'child_purchase':
      default:
        return 'red'; // חיוב
    }
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
        <Text style={styles.greetingText}>היי, {childName}</Text>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <Text style={styles.balanceText}>{balance.toLocaleString()} ₪</Text>
        <Text style={styles.balanceLabel}>היתרה שלך</Text>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {/* בלוק עידוד -- להוסיף תנאי שקיים חיסכון
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
      )}*/}

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

        {/* חיסכון */}
        <View style={styles.savingsSection}>
          <Text style={styles.sectionTitle}>החיסכון שלי</Text>

          {goal ? (
            <>
              <TouchableOpacity
                style={styles.savingsCard}
                onPress={() => navigation.navigate('savings' as never)}
              >
                <Ionicons name="wallet-outline" size={30} color="#3F51B5" style={{ marginLeft: 10 }} />
                <View style={styles.savingsTextContainer}>
                  <Text style={styles.savingsTitle}>חיסכון ל{goal.name}</Text>

                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${Math.min(
                            (goal.current_amount / goal.target_amount) * 100,
                            100
                          )}%`,
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.progressPercent}>
                    {Math.round((goal.current_amount / goal.target_amount) * 100)}% הושג
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setShowManualDepositPopup(true)}
              >
                <Text style={styles.saveButtonText}>הפקד לחיסכון</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.noGoalButton}
              onPress={() => navigation.navigate('savings' as never)}
            >
              <Text style={styles.noGoalButtonText}>+ הגדר חיסכון חדש</Text>
            </TouchableOpacity>
          )}
        </View>


      </ScrollView>

      <View style={styles.payButtonBackground}>
        <View style={styles.payButtonContainer}>

          <TouchableOpacity style={styles.payButton} onPress={() => handlePress()}          >
            <Text style={styles.payButtonText}>בקש מההורים לפתוח תשלום</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PaymentRequestModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <EducationalModal visible={isVisible} onClose={() => onClose()}
        contentUrl={contentUrl!} />
      <NfcChargeModal
        visible={nfcModalVisible}
        onClose={() => {
          setNfcModalVisible(false);
          setSelectedTransactionId(undefined);
          fetchAllData();
        }}
        transactionId={selectedTransactionId}
        transactionAmount={
          requests.find(r => r.transaction_id === selectedTransactionId)?.amount
        }
        onSuccess={(msg) => {
          setTimeout(() => {
            setConfettiMessage(msg);
            setShowConfetti(true);
          }, 1000);
        }}
      />

      {showManualDepositPopup && balanceId && goal?.id && (
        <AddToSavingsFormModal
          visible={showManualDepositPopup}
          onClose={() => setShowManualDepositPopup(false)}
          balanceId={balanceId}
          goalId={goal.id}
          availableBalance={balance}
          remainingToGoal={goal.target_amount - goal.current_amount}
          onSuccess={() => {
            setShowManualDepositPopup(false);
            setTimeout(() => {
              setConfettiMessage('כל הכבוד! החיסכון מתקדם 🎯');
              setShowConfetti(true);
              fetchAllData();
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

export default MainKidScreen;
