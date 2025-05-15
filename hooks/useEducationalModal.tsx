import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

export const useEducationModal = (userId: string, actionType: string, onAction: () => void) => {
    const [isVisible, setIsVisible] = useState(false);
    const [contentUrl, setContentUrl] = useState<string | null>(null);
    const [pendingAction, setPendingAction] = useState<() => void>(() => () => { });

    const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
    const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;
    const baseUrl = `http://${LOCAL_IP}:${LOCAL_PORT}`;

    // Clean pendingAction when modal closes
    useEffect(() => {
        if (!isVisible) {
            setPendingAction(() => () => { });
        }
    }, [isVisible]);

    const handlePress = useCallback(() => {
        const check = async () => {
            try {
                const res = await axios.get(
                    `${baseUrl}/education/should-show?userId=${userId}&actionType=${actionType}`
                );

                if (res.data.content) {
                    console.log('הצגת תוכן חינוכי');
                    console.log('תוכן חינוכי:', res.data.content);
                    setContentUrl(res.data.content);
                    setIsVisible(true);
                    setPendingAction(() => onAction);
                } else {
                    onAction();
                }
            } catch (err) {
                console.warn('כשל בטעינת תוכן חינוכי', err);
                onAction();
            }
        };

        check();
    }, [userId, actionType, onAction]);

    const onClose = () => {
        setIsVisible(false);
        if (pendingAction) pendingAction();
    };

    return { isVisible, contentUrl, onClose, handlePress };
};
