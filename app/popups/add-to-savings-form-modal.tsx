import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './../styles/add-to-savings-form-modal.styles';
import Constants from 'expo-constants';
import axios from 'axios';

type Props = {
  visible: boolean;
  onClose: () => void;
  balanceId: number;
  goalId: number;
  availableBalance: number;
  remainingToGoal: number;
  onSuccess: () => void;
};

const AddToSavingsFormModal: React.FC<Props> = ({
  visible,
  onClose,
  balanceId,
  goalId,
  availableBalance,
  remainingToGoal,
  onSuccess,
}) => {
  const [amount, setAmount] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState('');
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const parsedAmount = parseInt(amount);
  const validAvailable = Math.floor(availableBalance || 0);
  const validRemaining = Math.floor(remainingToGoal || 0);

  const isInvalid =
    isNaN(parsedAmount) ||
    parsedAmount <= 0 ||
    parsedAmount > validAvailable ||
    parsedAmount > validRemaining;

  const handleSave = async () => {
    if (isInvalid) {
      setError('הסכום שגוי – בדקי את ההגבלות');
      return;
    }

    try {
      await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/child-balance/transactions/deposit-to-goal`, {
        balanceId,
        goalId,
        amount: parsedAmount, 
        description: 'הפקדה ידנית לחיסכון',
      });

      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(true);
        onSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('שגיאה בהפקדה לחיסכון:', error);
      alert('משהו השתבש 😢');
    }
  };

  const handleChange = (text: string) => {
    setAmount(text);
    const val = parseInt(text);

    if (isNaN(val) || val <= 0) {
      setError('יש להזין סכום גדול מ־0');
    } else if (val > validAvailable) {
      setError('אין לך מספיק יתרה 😅');
    } else if (val > validRemaining) {
      setError('הסכום גדול ממה שנשאר כדי להשלים את החיסכון 🎯');
    } else {
      setError('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/goal.png')} style={styles.image} />
          <Text style={styles.title}>
            יש לך {validAvailable.toLocaleString()}₪ פנויים!
          </Text>
          <Text style={styles.subtitle}>
            נשארו רק {validRemaining.toLocaleString()}₪ כדי להשלים את החיסכון
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="סכום להפקדה"
            value={amount}
            onChangeText={handleChange}
          />

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.submitButton, isInvalid && styles.disabledButton]}
            onPress={handleSave}
            disabled={isInvalid}
          >
            <Text style={styles.submitButtonText}>הוספה לחיסכון</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>ביטול</Text>
          </TouchableOpacity>
        </View>

        {showConfetti && (
          <LottieView
            source={require('../../assets/animations/confetti.json')}
            autoPlay
            loop={false}
            style={styles.confetti}
          />
        )}
      </View>
    </Modal>
  );
};

export default AddToSavingsFormModal;
