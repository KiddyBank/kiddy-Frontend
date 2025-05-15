import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';

type EducationalModalProps = {
    visible: boolean;
    onClose: () => void;
    contentUrl: string;
};

const EducationalModal = ({ visible, onClose, contentUrl }: EducationalModalProps) => {
    const video = require('../../assets/videos/whats_money.mp4');
    const player = useVideoPlayer({ assetId: video }, (player) => {
        player.play();
        player.loop = false;
    });

    if (!visible) return null;

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}> בואו נלמד משהו מגניב! 🤓</Text>

                    <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                    />

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                        <Text style={styles.closeText}>סיימתי!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)', // רקע חצי שקוף
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: width * 0.9,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600',
        color: '#333',
    },
    video: {
        width: '100%',
        height: 220,
        borderRadius: 15,
        backgroundColor: 'black',
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    closeText: {
        fontSize: 16,
        color: '#4CAF50',
        marginTop: 5,
        fontWeight: 'bold',
    },
});

export default EducationalModal;
