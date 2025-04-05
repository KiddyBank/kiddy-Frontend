import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';
import styles from '../styles/stategy-map.styles';

const { height, width } = Dimensions.get("window");


const stages = [
    { id: 1, cx: width * 0.2, cy: height * 0.88, completed: true },
    { id: 2, cx: width * 0.35, cy: height * 0.72, completed: true },
    { id: 3, cx: width * 0.5, cy: height * 0.56, completed: false },
    { id: 4, cx: width * 0.65, cy: height * 0.40, completed: false },
    { id: 5, cx: width * 0.50, cy: height * 0.24, completed: false },
    { id: 6, cx: width * 0.40, cy: height * 0.14, completed: false },
];

const StageMap = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#3F51B5" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>מפת התקדמות</Text>
            </View>

            <ImageBackground
                style={styles.mapBackground}
                source={require('../../assets/images/colorful-background.png')} 
            >
                <Svg height={height} width={width}>
                    <Path
                        d={`M ${stages[0].cx} ${stages[0].cy}
                            Q ${width * 0.3} ${height * 0.79}, ${stages[1].cx} ${stages[1].cy}
                            T ${stages[2].cx} ${stages[2].cy}
                            T ${stages[3].cx} ${stages[3].cy}
                            T ${stages[4].cx} ${stages[4].cy}
                            T ${stages[5].cx} ${stages[5].cy}`}
                        stroke="gold"
                        strokeWidth="7"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {stages.map((stage) => (
                        <React.Fragment key={stage.id}>
                            <Circle
                                cx={stage.cx}
                                cy={stage.cy}
                                r="20" 
                                fill={stage.completed ? "#4CAF50" : "#FF9800"}
                                stroke="white"
                                strokeWidth="2"
                            />
                            <SvgText
                                x={stage.cx}
                                y={stage.cy + 5}
                                textAnchor="middle"
                                fontSize="14"
                                fill="white"
                                fontWeight="bold"
                            >
                                {stage.id}
                            </SvgText>
                        </React.Fragment>
                    ))}
                </Svg>
            </ImageBackground>
        </View>
    );
};

export default StageMap;
