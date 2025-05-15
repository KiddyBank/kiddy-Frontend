import React from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFirstActionContent } from '@/hooks/useFirstActionContent';

type Props = {
    userId: string;
    actionType: string;
    onActionComplete?: () => void;
};

const FirstActionBooster: React.FC<Props> = ({ userId, actionType, onActionComplete }) => {
    const {
        shouldShow,
        isLoading,
        contentType,
        contentPayload,
        markAsCompleted,
    } = useFirstActionContent({ userId, actionType });

    const handleProceed = async () => {
        if (shouldShow) {
            await markAsCompleted();
        }

        onActionComplete?.();
    };

    if (isLoading) return <ActivityIndicator />;

    return (
        <View style={{ padding: 20 }}>
            {shouldShow && contentType === 'video' && contentPayload && (
                <>
                    <Text style={{ marginBottom: 10 }}>🧠 בוסט קצר לפני שממשיכים:</Text>
                    <Video
                        source={{ uri: contentPayload }}
                        shouldPlay
                        resizeMode={ResizeMode.CONTAIN}
                        style={{ width: '100%', height: 200 }}
                    />
                </>
            )}

            {shouldShow && contentType === 'tip' && contentPayload && (
                <View style={{ backgroundColor: '#fdf6e3', padding: 16, borderRadius: 12 }}>
                    <Text style={{ fontWeight: 'bold' }}>💡 טיפ:</Text>
                    <Text>{contentPayload}</Text>
                </View>
            )}

            <Button title="הבנתי, קדימה!" onPress={handleProceed} />
        </View>
    );
};

export default FirstActionBooster;
