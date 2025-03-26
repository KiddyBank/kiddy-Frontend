import React, { useState, useEffect } from "react";
import { View, Text, Animated, Alert, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import styles from "../styles/nfc-pay.styles";
import { useNavigation } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import axios from "axios";

const NFCPaymentScreen = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [animation] = useState(new Animated.Value(1));
  const navigation = useNavigation();
  const [userId, transactionId]  = useSearchParams();

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

  const handlePayment = async () => {
    Alert.alert(
      "שים לב",
      "נא לוודא שה-NFC פעיל במכשיר שלך דרך ההגדרות",
      [{ text: "הבנתי", onPress: () => proceedPayment() }]
    );
  };

  const proceedPayment = async () => {
    Alert.alert("תשלום", "ממתין לקריאת כרטיס...");

    setTimeout(async () => {
      setPaymentSuccess(true);
      await playSound();

      console.log(userId[1], transactionId[1]);

      try {
        await axios.post(`http://localhost:3000/users/perform-payment/${userId[1]}`, {transactionId: transactionId[1]});
      } catch (error) {
        console.error("שגיאה בחיוב הארנק", error);
      }

      Alert.alert("תשלום הצליח!", "כל הכבוד! התשלום בוצע בהצלחה", [
        {
          text: "חזרה למסך הראשי",
          onPress: () => {
            setPaymentSuccess(false); // איפוס המסך
            (navigation as any).navigate("index", { refresh: true });
          },
        },
      ]);
    }, 3000);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../../assets/sounds/coins.mp3"));
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>

  
      <Text style={styles.title}>תשלום באמצעות NFC</Text>
  
      
  
      <Text style={styles.instructions}>
        קרב את הטלפון למסופון כדי לבצע את התשלום.
      </Text>
  
      <Text style={styles.nfcNotice}>
        נא לוודא שה-NFC פעיל במכשיר (Settings &gt; Connections &gt; NFC).
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
    </View>
  );

  
};

export default NFCPaymentScreen;
