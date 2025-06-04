import axios from "axios";
import Constants from "expo-constants";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/auth-context";
import { useFocusEffect } from "expo-router";

type ChallengeInterval = "DAILY" | "WEEKLY" | "MONTHLY";
type ChallengeDifficulty = "EASY" | "MEDIUM" | "HARD";

interface ChallengeInstance {
    id: string;
    challenge_id: string;
    name: string;
    status: string;
    difficulty: ChallengeDifficulty;
    interval: ChallengeInterval;
    progress: number; // 0-1
}

interface ChallengesByInterval {
    DAILY: ChallengeInstance[];
    WEEKLY: ChallengeInstance[];
    MONTHLY: ChallengeInstance[];
}

const intervalLabels: Record<ChallengeInterval, string> = {
    DAILY: "יומי",
    WEEKLY: "שבועי",
    MONTHLY: "חודשי",
};

const difficultyLabels: Record<ChallengeDifficulty, string> = {
    EASY: "קל",
    MEDIUM: "בינוני",
    HARD: "קשה",

};

const difficultyColors: Record<ChallengeDifficulty, string> = {
    EASY: "#4CAF50", // ירוק
    MEDIUM: "#FFC107", // צהוב
    HARD: "#F44336", // אדום
};

export default function ChallengesTab() {
    const [loading, setLoading] = useState(true);
    const { sub } = useAuth();

    const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
    const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;
    const baseUrl = `http://${LOCAL_IP}:${LOCAL_PORT}`;

    const [challenges, setChallenges] = useState<ChallengesByInterval>({
        DAILY: [],
        WEEKLY: [],
        MONTHLY: [],
    });

    const [level, setLevel] = useState<number>(0);
    const [category, setCategory] = useState<string>("");

    useEffect(() => {
        fetchChallenges();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchChallenges();
        }, [])
    );

    async function fetchChallenges() {
        try {
            setLoading(true);
            await axios.get(`${baseUrl}/challenge-instance/evaluate/${sub}`);
            const { challenges, level, category }: { challenges: ChallengeInstance[]; level: number; category: string } =
                (await axios.get(`${baseUrl}/challenge-instance/active/${sub}`)).data;


            const grouped: ChallengesByInterval = {
                DAILY: [],
                WEEKLY: [],
                MONTHLY: [],
            };

            challenges.forEach((ch) => {
                grouped[ch.interval].push(ch);
            });

            setChallenges(grouped);
            setLevel(level);
            setCategory(category);
        } catch (error) {
            console.error("Failed to load challenges", error);
        } finally {
            setLoading(false);
        }
    }

    function renderChallenge(challenge: ChallengeInstance) {
        return (
            <View style={styles.challengeCard}>
                <Text style={styles.challengeName}>{challenge.name}</Text>
                <View style={styles.badgeRow}>
                    <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors[challenge.difficulty] }]}>
                        <Text style={styles.badgeText}>{difficultyLabels[challenge.difficulty]}</Text>
                    </View>
                </View>
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${challenge.progress * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(challenge.progress * 100)}%</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2d6cdf" />
            </View>
        );
    }

    return (
        <FlatList
            data={(["DAILY", "WEEKLY", "MONTHLY"] as ChallengeInterval[]).flatMap((interval) =>
                challenges[interval].length
                    ? [{ type: "header", id: interval }, ...challenges[interval].map((ch) => ({ type: "challenge", ...ch }))]
                    : []
            )}
            keyExtractor={(item) => item.type === "header" ? item.id : item.id}
            renderItem={({ item }) => {
                if (item.type === "header") {
                    return <Text style={styles.sectionHeader}>{intervalLabels[item.id as ChallengeInterval]}</Text>;
                }
                return renderChallenge(item as ChallengeInstance);
            }}
            ListHeaderComponent={
                <View style={styles.overview}>
                    <Text style={styles.levelText}>רמה נוכחית: {level}</Text>
                    <Text style={styles.levelText}>קטגוריה: {category}</Text>
                </View>
            }
            contentContainerStyle={{ padding: 16 }}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overview: {
        marginBottom: 20,
        alignItems: "flex-end",
    },
    levelText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2d6cdf",
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 12,
        textAlign: "right",
        color: "#444",
    },
    challengeCard: {
        backgroundColor: "#f0f4ff",
        borderRadius: 8,
        padding: 12,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    challengeName: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
        color: "#222",
        textAlign: "right",
    },
    badgeRow: {
        flexDirection: "row-reverse",
        marginBottom: 6,
    },
    difficultyBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: "#d0d4f7",
        borderRadius: 5,
        overflow: "hidden",
        marginTop: 6,
    },
    progressBarFill: {
        height: 10,
        backgroundColor: "#2d6cdf",
    },
    progressText: {
        textAlign: "right",
        marginTop: 4,
        fontWeight: "500",
    },
});
