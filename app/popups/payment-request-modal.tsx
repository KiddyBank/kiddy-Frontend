import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Modal, Text, TextInput, View } from 'react-native';
import styles from '../styles/payment-request-modal.styles';
import Constants from 'expo-constants';
import { useAuth } from '../context/auth-context';

const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

interface PaymentRequestModalProps {
  visible: boolean;
  onClose: () => void;
}

const PaymentRequestModal: React.FC<PaymentRequestModalProps> = ({ visible, onClose }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const {sub} = useAuth(); 

  const handleSendClick = async () => {
    const data = { amount, description: message };

    try {
      const response = await axios.post(
        `http://${LOCAL_IP}:${LOCAL_PORT}/child-balance/place-payment-request/${sub}`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        Alert.alert('יש! בקשת האישור נשלחה וממתינה לאישור ההורה');
        setTimeout(onClose, 3000);
      } else {
        Alert.alert('אוי לא! בקשת האישור לא הצליחה להשלח, אנא נסה שוב');
        setTimeout(onClose, 3000);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert('אוי לא! יש לנו קצת בעיות טכניות, אנא נסה שוב מאוחר יותר');
      setTimeout(onClose, 3000);
    }
  };

  useEffect(() => {
  if (visible) {
    setAmount('');
    setMessage(''); 
  }
}, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>סכום לתשלום</Text>

          <Text>כמה זה עולה?</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="הכנס סכום"
            keyboardType="numeric"
            textAlign="right"
          />

          <Text>תסביר להורים מה אתה קונה:</Text>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="הכנס הודעה"
            multiline
          />

          <Button color="#3F51B5" title="שלח" onPress={handleSendClick} />
          <Button title="ביטול" color="#3F51B5" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default PaymentRequestModal;
function setAllowanceInterval(arg0: string) {
  throw new Error('Function not implemented.');
}

function setAllowanceAmount(arg0: string) {
  throw new Error('Function not implemented.');
}

