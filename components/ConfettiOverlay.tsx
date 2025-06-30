import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  visible: boolean;
  onFinish?: () => void;
  message?: string;
};

const ConfettiOverlay: React.FC<Props> = ({ visible, onFinish, message }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onFinish?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../assets/animations/confetti.json')}
        autoPlay
        loop={false}
        style={styles.confetti}
      />
      {message && (
        <Text style={styles.floatingText}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  confetti: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  floatingText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    zIndex: 2,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});

export default ConfettiOverlay;
