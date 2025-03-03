import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChildHomePage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>היי! התחברתם לאפליקציית Kiddy Bank</Text>
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default ChildHomePage;
