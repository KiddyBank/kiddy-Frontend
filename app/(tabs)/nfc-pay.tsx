import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Alert } from "react-native";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import styles from "../styles/nfc-pay.styles";

const NFCPaymentScreen = () => {
  const [nfcEnabled, setNfcEnabled] = useState<boolean | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    checkNFC();
    startAnimation();
  }, []);

  const checkNFC = async () => {
    setNfcEnabled(false); 
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(animation, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  };

  const handlePayment = async () => {
    if (!nfcEnabled) {
      Alert.alert("שגיאה", "יש להפעיל NFC במכשיר על מנת לבצע תשלום.");
      return;
    }

    Alert.alert("תשלום", "ממתין לקריאת כרטיס...", [{ text: "בסדר" }]);

    setTimeout(async () => {
      setPaymentSuccess(true);
      playSound();
      Alert.alert("תשלום הצליח!", "כל הכבוד! התשלום בוצע בהצלחה");
    }, 3000);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync( require("../../assets/sounds/coins.mp3"));
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>תשלום באמצעות NFC</Text>

      <LottieView
        source={require("../../assets/animations/nfc-animation.json")} 
        autoPlay
        loop
        style={styles.nfcAnimation}
      />

      <Text style={styles.instructions}>
        קרב את הטלפון למסופון כדי לבצע את התשלום.
      </Text>

      {!nfcEnabled && <Text style={styles.nfcError}>הפעל את ה- NFC</Text>}

      {paymentSuccess ? (
        <Text style={styles.successMessage}>התשלום הושלם בהצלחה!</Text>
      ) : (
        <Animated.View style={{ transform: [{ scale: animation }] }}></Animated.View>
      )}
    </View>
  );
};

export default NFCPaymentScreen;
