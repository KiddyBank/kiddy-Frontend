import axios from "axios";
import { Audio } from "expo-av";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Modal, Text, TouchableOpacity, View } from "react-native";
import styles from '../styles/nfc-pay.styles';
import { useAuth } from "../context/auth-context";

const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

interface NfcChargeModalProps {
  visible: boolean;
  transactionId?: string;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  transactionAmount?: number;
}

const NfcChargeModal: React.FC<NfcChargeModalProps> = ({
  visible,
  onClose,
  transactionId,
  onSuccess,  
  transactionAmount       
}) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const {sub} = useAuth(); 


  const animateButton = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
    useEffect(() => {
      startAnimation();
    }, []);
  
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, { toValue: 1.2, duration: 800, useNativeDriver: true }),
          Animated.timing(animation, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    };

   const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/sounds/coins.mp3"));
      await sound.playAsync();
    };

  const proceedPayment = async () => {
    animateButton();

    try {
      const response = await axios.post(
        `http://${LOCAL_IP}:${LOCAL_PORT}/users/perform-payment/${sub}`,
        {transactionId},
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201 || response.status === 200) {
        setPaymentSuccess(true);
        Alert.alert('התשלום הושלם בהצלחה!');
        setTimeout(() => {
          setPaymentSuccess(false);
          playSound();
          
          if (onSuccess && transactionAmount !== undefined) {
            const formattedAmount = transactionAmount.toLocaleString();
            onSuccess(`נהדר! החיוב בוצע בהצלחה 🎉\nירדו לך ${formattedAmount} ₪ מהיתרה בעקבות הרכישה`);
          }

          onClose();
        }, 3000);
      } else {
        Alert.alert('אוי לא! התשלום נכשל, אנא נסה שוב');
      }
    } catch (error) {
      console.error('NFC Payment Error:', error);
      Alert.alert('בעיה טכנית, נסה שוב מאוחר יותר');
    }
  };

  return (
<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
  <View style={styles.overlay}>
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>תשלום באמצעות NFC</Text>

      <Text style={styles.instructions}>
        קרב את הטלפון למסופון כדי לבצע את התשלום.
      </Text>

      <Text style={styles.nfcNotice}>
        נא לוודא שה-NFC פעיל במכשיר (Settings {'>'} Connections {'>'} NFC).
      </Text>

      {paymentSuccess ? (
        <Text style={styles.successMessage}>התשלום הושלם בהצלחה!</Text>
      ) : (
        <Animated.View style={{ transform: [{ scale: animation }] }}>
          <TouchableOpacity onPress={proceedPayment} style={styles.payButton}>
            <Text style={styles.payButtonText}>בצע תשלום</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>ביטול</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  );
};

export default NfcChargeModal;




