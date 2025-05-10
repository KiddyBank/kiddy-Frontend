import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { Level, LevelStatus } from '@/app/types/level';

const LEVEL_COLORS: Record<LevelStatus
    | string, string> = {
    [LevelStatus.Completed]: '#06d6a0',
    [LevelStatus.InProgress]: 'rgb(238, 238, 37)',
    [LevelStatus.Locked]: 'rgba(215, 215, 214, 0)',
    'Test': 'rgb(215, 215, 214)'
};

const LEVEL_BORDER_COLORS: Record<LevelStatus, string> = {
    [LevelStatus.Completed]: '#06d6a0',
    [LevelStatus.InProgress]: 'white',
    [LevelStatus.Locked]: 'rgba(200, 200, 200, 0.53)',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LEVEL_SIZE = 80;
const ROW_HEIGHT = 120;
const ITEMS_PER_ROW = 3;

type Props = {
    levels: Level[];
    onLevelPress: (id: string) => void;
};

export const LevelMap: React.FC<Props> = ({ levels, onLevelPress }) => {
    const reversedLevels = [...levels].reverse();
    const totalRows = Math.ceil(reversedLevels.length / ITEMS_PER_ROW);
    const contentHeight = totalRows * ROW_HEIGHT + LEVEL_SIZE;

    const rows: Level[][] = [];
    for (let i = 0; i < reversedLevels.length; i += ITEMS_PER_ROW) {
        const rowIndex = Math.floor(i / ITEMS_PER_ROW);
        const row = reversedLevels.slice(i, i + ITEMS_PER_ROW);
        if (rowIndex % 2 === 1) row.reverse();
        rows.push(row);
    }
    rows.reverse();

    const levelPositions = rows.flatMap((row, rowIndex) => {
        const itemsInRow = row.length;
        const totalLevelWidth = itemsInRow * LEVEL_SIZE;
        const totalSpacing = SCREEN_WIDTH - totalLevelWidth;
        const spacing = totalSpacing / (itemsInRow + 1);

        const top = contentHeight - (rowIndex + 1) * ROW_HEIGHT;

        return row.map((level, i) => {
            const left = spacing * (i + 1) + LEVEL_SIZE * i;

            return {
                ...level,
                position: {
                    top,
                    leftPercent: (left / SCREEN_WIDTH) * 100,
                    x: left + LEVEL_SIZE / 2,
                    y: top + LEVEL_SIZE / 2,
                },
            };
        });
    });

    const orderedLevelPositions = reversedLevels.map((originalLevel) =>
        levelPositions.find((p) => p.id === originalLevel.id)!
    );

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ height: contentHeight, width: SCREEN_WIDTH }}
        >
            <LinearGradient colors={['#c2f0c2', '#fefae0']} style={{ flex: 1 }}>
                <View style={styles.content}>
                    <Svg
                        width={SCREEN_WIDTH}
                        height={contentHeight}
                        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
                    >
                        {orderedLevelPositions.reverse().slice(0, -1).map((startLevel, index) => {
                            const endLevel = orderedLevelPositions[index + 1];

                            const { x: x1, y: y1 } = startLevel.position;
                            const { x: x2, y: y2 } = endLevel.position;

                            const r = LEVEL_SIZE / 2;

                            // Calculate direction
                            const dx = x2 - x1;
                            const dy = y2 - y1;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            const unitDx = dist !== 0 ? dx / dist : 0;
                            const unitDy = dist !== 0 ? dy / dist : 0;

                            // Adjust start and end points to be at the edges of the circles
                            const x1Edge = x1 + unitDx * r;
                            const y1Edge = y1 + unitDy * r;
                            const x2Edge = x2 - unitDx * r;
                            const y2Edge = y2 - unitDy * r;

                            // Control points for curve
                            const cp1x = x1Edge + (x2Edge - x1Edge) * 0.5;
                            const cp1y = y1Edge + (y2Edge - y1Edge) * 0.5;
                            const cp2x = x2Edge - (x2Edge - x1Edge) * 0.5;
                            const cp2y = y2Edge - (y2Edge - y1Edge) * 0.5;

                            const segmentPath = `M${x1Edge},${y1Edge} C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2Edge},${y2Edge}`;

                            const isPartialYellow =
                                startLevel.status === LevelStatus.InProgress &&
                                endLevel.status === LevelStatus.Locked;

                            if (isPartialYellow) {
                                const progress = (startLevel.pointsEarned ?? 0) / (startLevel.pointsRequired ?? 1);

                                const dashArray = dist; // This is the total length (considering 100% as the full length of the path)
                                const yellowLength = progress * dashArray; // Portion for yellow
                                const grayLength = dashArray - yellowLength; // Remainder for gray

                                return (
                                    <React.Fragment key={`path-${startLevel.id}-${endLevel.id}`}>

                                        {/* Gray part */}
                                        <Path
                                            d={segmentPath}
                                            stroke={LEVEL_COLORS["Test"]}
                                            strokeWidth={8}
                                            strokeLinecap="round"
                                            fill="none"
                                        />
                                        {/* Yellow part */}
                                        <Path
                                            d={segmentPath}
                                            stroke={LEVEL_COLORS[LevelStatus.InProgress]}
                                            strokeWidth={8}
                                            strokeLinecap="round"
                                            fill="none"
                                            strokeDasharray={`${yellowLength},${grayLength}`} // Dash pattern: yellow first, then gray
                                        />
                                    </React.Fragment>
                                );
                            }


                            const color = LEVEL_COLORS[startLevel.status];
                            if (color === LEVEL_COLORS[LevelStatus.Locked]) {
                                return (
                                    <Path
                                        key={`path-${startLevel.id}-${endLevel.id}`}
                                        d={segmentPath}
                                        stroke={LEVEL_COLORS["Test"]}
                                        strokeWidth={8}
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                );
                            }

                            return (
                                <Path
                                    key={`path-${startLevel.id}-${endLevel.id}`}
                                    d={segmentPath}
                                    stroke={color}
                                    strokeWidth={8}
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            );
                        })}
                    </Svg>




                    {levelPositions.map((level) => (
                        <View
                            key={level.id}
                            style={[
                                styles.levelContainer,
                                {
                                    top: level.position.top,
                                    left: `${level.position.leftPercent}%`,
                                    zIndex: 1,
                                },
                            ]}
                        >
                            <Pressable
                                style={[
                                    styles.level,
                                    {
                                        backgroundColor: LEVEL_COLORS[level.status],
                                        borderColor: LEVEL_BORDER_COLORS[level.status],
                                    },
                                ]}
                                onPress={() => onLevelPress(level.id)}
                                disabled={level.status === LevelStatus.Locked}
                            >
                                <FontAwesome5 name={level.icon as any} size={28} color="#fff" />
                                <Text style={styles.levelText}>{level.name}</Text>
                                <View style={styles.starsContainer}>
                                    <Text style={styles.starsText}>⭐ {level.stars}</Text>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: {
        position: 'relative',
        width: '100%',
    },
    levelContainer: {
        position: 'absolute',
    },
    level: {
        width: LEVEL_SIZE,
        height: LEVEL_SIZE,
        borderRadius: LEVEL_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderWidth: 2,
        opacity: 0.1
    },
    levelText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 4,
    },
    starsContainer: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    starsText: {
        fontSize: 10,
    },
});
