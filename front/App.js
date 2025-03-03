import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('טוען...');
    const SERVER_URL = 'http://10.0.2.2:3000'; // ל-Android Emulator

    useEffect(() => {
        axios.get(`${SERVER_URL}/`)
            .then(response => setMessage(response.data.message))
            .catch(error => setMessage('שגיאה בחיבור לשרת'));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default App;
