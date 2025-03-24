import React, { useState, useEffect } from "react";
import { View, Text, Animated, Alert, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import styles from "../styles/nfc-pay.styles";

const NFCPaymentScreen = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [animation] = useState(new Animated.Value(1));

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

  const proceedPayment = () => {
    Alert.alert("תשלום", "ממתין לקריאת כרטיס...", [{ text: "בסדר" }]);

    setTimeout(async () => {
      setPaymentSuccess(true);
      await playSound();
      Alert.alert("תשלום הצליח!", "כל הכבוד! התשלום בוצע בהצלחה");
    }, 3000);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../../assets/sounds/coins.mp3"));
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

      <Text style={styles.nfcNotice}>
        נא לוודא שה-NFC פעיל במכשיר (Settings &gt; Connections &gt; NFC).
      </Text>

      {paymentSuccess ? (
        <Text style={styles.successMessage}>התשלום הושלם בהצלחה!</Text>
      ) : (
        <Animated.View style={{ transform: [{ scale: animation }] }}>
          <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
            <Text style={styles.payButtonText}>בצע תשלום</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default NFCPaymentScreen;
