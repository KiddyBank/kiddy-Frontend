import React from 'react';
import { SafeAreaView } from 'react-native';
import { Level, LevelStatus } from '../types/level';
import { LevelMap } from '@/components/level-map';


const levels: Level[] = [
    { id: '1', name: 'התחלה', icon: 'home', stars: 3, status: LevelStatus.Completed, pointsRequired: 10, pointsEarned: 10 },
    { id: '2', name: 'יעד ראשון', icon: 'sun', stars: 2, status: LevelStatus.Completed, pointsRequired: 20, pointsEarned: 20 },
    { id: '3', name: 'Nature', icon: 'leaf', stars: 1, status: LevelStatus.Completed, pointsRequired: 30, pointsEarned: 30 },
    { id: '4', name: 'Animals', icon: 'paw', stars: 0, status: LevelStatus.Completed, pointsRequired: 50, pointsEarned: 50 },
    { id: '5', name: 'Money', icon: 'dollar-sign', stars: 1, status: LevelStatus.Completed, pointsRequired: 50, pointsEarned: 0 },
    { id: '6', name: 'Ariel', icon: 'sack-dollar', stars: 0, status: LevelStatus.InProgress, pointsRequired: 60, pointsEarned: 10 },
    { id: '7', name: 'Grill', icon: 'dollar-sign', stars: 1, status: LevelStatus.Locked, pointsRequired: 70, pointsEarned: 0 },
    { id: '8', name: 'Drill', icon: 'sack-dollar', stars: 0, status: LevelStatus.Locked, pointsRequired: 80, pointsEarned: 0 },
    { id: '9', name: 'Money', icon: 'dollar-sign', stars: 1, status: LevelStatus.Locked, pointsRequired: 90, pointsEarned: 0 },
    { id: '10', name: 'Ariel', icon: 'sack-dollar', stars: 0, status: LevelStatus.Locked, pointsRequired: 100, pointsEarned: 0 },
    { id: '11', name: 'Grill', icon: 'dollar-sign', stars: 1, status: LevelStatus.Locked, pointsRequired: 110, pointsEarned: 0 },
    { id: '12', name: 'Drill', icon: 'sack-dollar', stars: 0, status: LevelStatus.Locked, pointsRequired: 120, pointsEarned: 0 },
    { id: '13', name: 'Money', icon: 'dollar-sign', stars: 1, status: LevelStatus.Locked, pointsRequired: 130, pointsEarned: 0 },
    { id: '14', name: 'Ariel', icon: 'sack-dollar', stars: 0, status: LevelStatus.Locked, pointsRequired: 140, pointsEarned: 0 },
    { id: '15', name: 'Grill', icon: 'dollar-sign', stars: 1, status: LevelStatus.Locked, pointsRequired: 150, pointsEarned: 0 },
    { id: '16', name: 'Drill', icon: 'sack-dollar', stars: 0, status: LevelStatus.Locked, pointsRequired: 160, pointsEarned: 0 },
    { id: '17', name: 'Ariel', icon: 'sack-dollar', stars: 0, status: LevelStatus.Locked, pointsRequired: 170, pointsEarned: 0 },
    { id: '18', name: 'Grill', icon: 'dollar-sign', stars: 1, status: LevelStatus.Locked, pointsRequired: 180, pointsEarned: 0 },
    { id: '19', name: 'Drill', icon: 'sack-dollar', stars: 0, status: LevelStatus.Locked, pointsRequired: 190, pointsEarned: 0 },
];

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LevelMap
                levels={levels}
                onLevelPress={(id) => console.log('Level clicked:', id)}
            />
        </SafeAreaView>
    );
}