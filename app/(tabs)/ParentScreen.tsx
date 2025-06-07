import axios from 'axios';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../context/auth-context';
import AllowanceModal from '../popups/allowance-modal';
import styles from '../styles/parent.styles';
import TaskModal from '../popups/task-modal';
import * as SecureStore from 'expo-secure-store';


type PaymentRequest = {
  transaction_id: string;
  description: string;
  amount: number;
  type: string;
  status: 'PENDING_PARENT_APPROVAL';
  child_balance: {
    child_user: {
      username: ReactNode;
      name: string;
    };
  };
};


type Child = {
  name: string;
  balance: number;
  gender: string;
  id: string;
  balanceId: number;
  allowanceAmount?: number;
  allowanceInterval?: 'monthly' | 'weekly' | 'test';
};


export default function ParentScreen() {
  const router = useRouter();
  const { sub } = useAuth();

  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedKid, setSelectedKid] = useState<Child | null>(null);
  const [showAllowanceModal, setShowAllowanceModal] = useState(false);
  const [allowanceAmount, setAllowanceAmount] = useState('');
  const [allowanceInterval, setAllowanceInterval] = useState<'monthly' | 'weekly' | 'test'>('monthly');
  const [isLoading, setIsLoading] = useState(true);

  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskList, setTaskList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); 


  const fetchChildren = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/users/parents/${sub}/children`);
      const converted: Child[] = response.data.map((kid: any) => ({
        id: kid.user_id ?? kid.id,
        name: kid.username ?? kid.name,
        gender: kid.gender,
        balance: kid.balance,
        balanceId: kid.balanceId,
        allowanceAmount: kid.allowanceAmount,
        allowanceInterval: kid.allowanceInterval,
      }));
      setChildren(converted);
    } catch (error) {
      console.error('❌ שגיאה בשליפת ילדים', error);
      setError('שגיאה בשליפת ילדים');
    }
  };

  const loadData = async () => {
    try {
      await fetchPaymentRequests();
      await fetchChildren();
      await fetchTasks();
    } catch (err) {
      console.error('שגיאה בטעינת מסך ההורה:', err);
      alert('שגיאה בטעינה');
    }
  };
 
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await loadData();
      setIsLoading(false);
    };
    load();
  }, []);

  const toChild = () => {
    router.push('/');
  };

  //בקשות תשלום
  const fetchPaymentRequests = async () => {
    try {
      const response = await axios.get(
        `http://${LOCAL_IP}:${LOCAL_PORT}/users/parents/${sub}/children-payment-requests`
      );
      setPaymentRequests(response.data);
    } catch (error) {
      console.error('❌ שגיאה בשליפת בקשות של ילדים', error);
      setError('שגיאה בשליפת בקשות של ילדים');
    }
  };

  const fetchTasks = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');

      const res = await axios.get(`http://${LOCAL_IP}:${LOCAL_PORT}/tasks/by-parent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTaskList(res.data);
    } catch (err) {
      console.error('שגיאה בשליפת מטלות', err);
    }
  };


  const handlePaymentRequest = async (transactionId: string, action: 'approve' | 'reject') => {
    try {
      await axios.post(`http://${LOCAL_IP}:3000/users/parents/${sub}/handle-payment-request`, {
        transactionId,
        action,
      });
      setPaymentRequests((prev) => prev.filter((req) => req.transaction_id !== transactionId));
      const message = action === 'approve' ? 'בקשה אושרה בהצלחה' : 'הבקשה נדחתה בהצלחה';
      alert(message);
    } catch (error: any) {
      console.error(`שגיאה בביצוע פעולה (${action})`, error?.response?.data || error.message);
      alert('שגיאה בטיפול בבקשה');
    }
  };

  //דמי כיס
  const openAllowanceModal = (kid: Child) => {
    setSelectedKid(kid);
    setAllowanceAmount(kid.allowanceAmount?.toString() || '');
    setAllowanceInterval(kid.allowanceInterval || 'monthly');
    setShowAllowanceModal(true);
  };

  function intervalToDays(interval: 'monthly' | 'weekly' | 'test'): number {
    switch (interval) {
      case 'monthly': return 30;
      case 'weekly': return 7;
      case 'test': return 0;
    }
  }

  const saveAllowance = async () => {
    if (!selectedKid) return;
    try {
      await axios.post(`http://${LOCAL_IP}:3000/standing-orders/set-allowance`, {
        balanceId: selectedKid.balanceId,
        amount: Number(allowanceAmount),
        daysFrequency: intervalToDays(allowanceInterval),
        startDate: new Date().toISOString().split('T')[0],
      });
      setShowAllowanceModal(false);
      fetchChildren();
      alert('דמי כיס נשמרו');
    } catch (err) {
      console.error('שגיאה בשמירת דמי כיס', err);
      alert('שגיאה בשמירת דמי כיס');
    }
  };

  const removeAllowance = async () => {
    if (!selectedKid) return;
    try {
      await axios.post(`http://${LOCAL_IP}:3000/standing-orders/remove/${selectedKid.balanceId}`);
      setShowAllowanceModal(false);
      fetchChildren();
      alert('דמי כיס הוסרו');
    } catch (err) {
      console.error('שגיאה בהסרת דמי כיס', err);
      alert('שגיאה בהסרת דמי כיס');
    }
  };

  const getIntervalLabel = (value?: string | number) => {
    switch (value) {
      case 'monthly':
      case 30:
        return 'חודשי';
      case 'weekly':
      case 7:
        return 'שבועי';
      case 'test':
      case 0:
        return 'דקתי';
      default:
        return '';
    }
  };


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>טוען נתונים...</Text>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }


  const submitTask = async (taskForm: any) => {
    try {
      const token = await SecureStore.getItemAsync('token');

      await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/tasks`, {
        ...taskForm,
        payment_amount: Number(taskForm.payment_amount),
        monthly_limit: Number(taskForm.monthly_limit),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowTaskModal(false);
      fetchTasks();
      alert('מטלה נוספה');
    } catch (err) {
      console.error('שגיאה בהוספת מטלה', err);
      alert('שגיאה בהוספת מטלה');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://${LOCAL_IP}:${LOCAL_PORT}/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error('שגיאה במחיקת מטלה', err);
    }
  };

  

  return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

      <View style={styles.headerContainer}>
        <Text style={styles.header}>יתרות הילדים</Text>
      </View>

      <View style={styles.kidsContainer}>
        {children.map((kid, index) => (
          <View style={styles.kid} key={index}>
            <TouchableOpacity style={styles.allowanceBadge} onPress={() => openAllowanceModal(kid)}>
              {kid.allowanceAmount ? (
                <View style={styles.allowanceInfo}>
                  <Text style={styles.allowanceAmount}>דמי כיס</Text>
                  <Text style={styles.allowanceAmount}>{kid.allowanceAmount}₪ {getIntervalLabel(kid.allowanceInterval)}</Text>
                </View>
              ) : (
                <Text style={styles.setAllowance}>+ הגדר דמי כיס</Text>
              )}
            </TouchableOpacity>

            <TouchableHighlight onPress={toChild}>
              <Image
                style={styles.image}
                source={
                  kid.gender === 'female'
                    ? require('../../assets/images/avatars/avatar-girl.png')
                    : require('../../assets/images/avatars/avatar-boy.png')
                }
              />
            </TouchableHighlight>

            <View style={styles.kidDetails}>
              <Text style={styles.kidName}>{kid.name}</Text>
              <Text style={styles.kidBalance}>{kid.balance} ש"ח</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.nfcContainer}>
        <Text style={styles.sectionTitle}>בקשות תשלום ממתינות לאישור</Text>
        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
        {successMessage && (
          <View style={styles.successMessageBox}>
            <Text style={styles.successMessageText}>{successMessage}</Text>
          </View>
        )}

        {paymentRequests.map((item) => (
          <View key={item.transaction_id} style={styles.transactionRow}>

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {item.type === 'parent_deposit' ? (
                <>
                  <Text style={styles.titleText}>
                    {item.child_balance?.child_user?.username} מבקש תשלום של {item.amount}₪
                  </Text>
                  <Text style={styles.descriptionText}>
                    עבור ביצוע מטלת: {item.description}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.titleText}>
                    {item.child_balance?.child_user?.username} רוצה לחייב {item.amount}₪
                  </Text>
                  <Text style={styles.descriptionText}>
                    הודעת הבקשה: {item.description}
                  </Text>
                </>
              )}
            </View>


            <View style={styles.toggleButtonsContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, styles.approveButton]}
                onPress={() => handlePaymentRequest(item.transaction_id, 'approve')}>
                <Text style={styles.toggleButtonText}>✓</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toggleButton, styles.rejectButton]}
                onPress={() => handlePaymentRequest(item.transaction_id, 'reject')}>
                <Text style={styles.toggleButtonText}>X</Text>
              </TouchableOpacity>
            </View>


          </View>
        ))}
      </View>

      <View style={{ marginTop: 30, width: '90%' }}>
        <Text style={styles.sectionTitle}>רשימת מטלות</Text>
        {taskList.map(task => (
          <View key={task.task_id} style={styles.taskRow}>
            <View style={styles.taskDetailsContainer}>
              <Text style={styles.titleText}>רווח של {task.payment_amount}₪ עבור {task.name}</Text>
              <Text style={styles.descriptionText}>{task.description}</Text>
              <Text style={styles.descriptionText}>פתוח עבור- {task.child_names.join(', ')}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteTask(task.task_id)}>
              <Text style={styles.trashIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
      <TouchableOpacity onPress={() => setShowTaskModal(true)} style={styles.addTaskButton}>
        <Text style={styles.addTaskButtonText}>+ הוסף מטלה</Text>
      </TouchableOpacity>


      <AllowanceModal
        visible={showAllowanceModal}
        onClose={() => setShowAllowanceModal(false)}
        onSave={saveAllowance}
        onRemove={removeAllowance}
        allowanceAmount={allowanceAmount}
        setAllowanceAmount={setAllowanceAmount}
        allowanceInterval={allowanceInterval}
        setAllowanceInterval={setAllowanceInterval}
        kidName={selectedKid?.name}
      />

      <TaskModal
        visible={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={submitTask}
        childrenList={children.map((c) => ({ id: c.id, name: c.name }))}
      />

    </ScrollView>
  );
}

