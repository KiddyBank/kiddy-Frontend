import { LevelMap } from '@/components/level-map';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../context/auth-context';
import { Level } from '../types/level';


export default function App() {
    const [levels, setLevels] = useState<Level[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { sub } = useAuth();

    const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
    const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;
    const baseUrl = `http://${LOCAL_IP}:${LOCAL_PORT}`;

    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                try {
                    setLoading(true);
                    setError(null);

                    await axios.get(`${baseUrl}/challenge-instance/evaluate/${sub}`);

                    const response = await axios.get(`${baseUrl}/users-stats/levels-matrix/${sub}`);
                    setLevels(response.data.levels);
                } catch (e: any) {
                    setError(e.message || 'Error loading data');
                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }, [sub])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {levels ? (
                <LevelMap
                    levels={levels}
                    onLevelPress={(id) => console.log('Level clicked:', id)}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </SafeAreaView>


    );
}