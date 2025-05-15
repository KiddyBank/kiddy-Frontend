import React from 'react';
import { SafeAreaView } from 'react-native';
import { Level, LevelStatus } from '../types/level';
import { LevelMap } from '@/components/level-map';


const levels: Level[] = [
    { id: '1', name: 'התחלה', icon: 'home', stars: 3, status: LevelStatus.Completed, pointsRequired: 10, pointsEarned: 10 },
    { id: '2', name: 'המטבע הראשון שלי', icon: 'coins', stars: 2, status: LevelStatus.Completed, pointsRequired: 20, pointsEarned: 20 },
    { id: '3', name: 'קופת החיסכון', icon: 'piggy-bank', stars: 1, status: LevelStatus.Completed, pointsRequired: 30, pointsEarned: 30 },
    { id: '4', name: 'קונה מסטיק לבד', icon: 'candy-cane', stars: 0, status: LevelStatus.Completed, pointsRequired: 50, pointsEarned: 50 },
    { id: '5', name: 'יעד ראשון', icon: 'flag-checkered', stars: 1, status: LevelStatus.Completed, pointsRequired: 50, pointsEarned: 0 },
    { id: '6', name: 'שומר שקל- שווה זהב', icon: 'shield', stars: 0, status: LevelStatus.InProgress, pointsRequired: 60, pointsEarned: 15 },
    { id: '7', name: 'תקציב השבוע שלי', icon: 'calendar-week', stars: 1, status: LevelStatus.Locked, pointsRequired: 70, pointsEarned: 0 },
    { id: '8', name: 'לא קונים סתם!', icon: 'ban', stars: 0, status: LevelStatus.Locked, pointsRequired: 80, pointsEarned: 0 },
    { id: '9', name: 'בוחר מה חשוב', icon: 'list-check', stars: 1, status: LevelStatus.Locked, pointsRequired: 90, pointsEarned: 0 },
    { id: '10', name: 'השוואת מחירים', icon: 'balance-scale', stars: 0, status: LevelStatus.Locked, pointsRequired: 100, pointsEarned: 0 },
    { id: '11', name: 'קונה לבד בסופר', icon: 'shopping-cart', stars: 1, status: LevelStatus.Locked, pointsRequired: 110, pointsEarned: 0 },
    { id: '12', name: 'רוצה? צריך?', icon: 'question', stars: 0, status: LevelStatus.Locked, pointsRequired: 120, pointsEarned: 0 },
    { id: '13', name: 'מה זה ריבית?', icon: 'percentage', stars: 1, status: LevelStatus.Locked, pointsRequired: 130, pointsEarned: 0 },
    { id: '14', name: 'הלוואות – כן או לא?', icon: 'hand-holding-usd', stars: 0, status: LevelStatus.Locked, pointsRequired: 140, pointsEarned: 0 },
    { id: '15', name: 'הכנסות מול הוצאות', icon: 'chart-pie', stars: 1, status: LevelStatus.Locked, pointsRequired: 150, pointsEarned: 0 },
    { id: '16', name: 'הכנסה פסיבית', icon: 'coins', stars: 0, status: LevelStatus.Locked, pointsRequired: 160, pointsEarned: 0 },
    { id: '17', name: 'השקעה ראשונה', icon: 'chart-line', stars: 0, status: LevelStatus.Locked, pointsRequired: 170, pointsEarned: 0 },
    { id: '18', name: 'פותח עסק קטן', icon: 'store', stars: 1, status: LevelStatus.Locked, pointsRequired: 180, pointsEarned: 0 },
    { id: '19', name: 'בנקאי צעיר', icon: 'university', stars: 0, status: LevelStatus.Locked, pointsRequired: 190, pointsEarned: 0 },
    { id: '20', name: 'הגורו הכלכלי', icon: 'hat-wizard', stars: 3, status: LevelStatus.Locked, pointsRequired: 200, pointsEarned: 0 },
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