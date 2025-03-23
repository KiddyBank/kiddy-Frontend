import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>שלום, הגעת למסך משחקים!</Text>
      
      {/* כפתור מעבר למסך ה-StageMap */}
      <Link href="/StageMap" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>מעבר למפת התקדמות</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
