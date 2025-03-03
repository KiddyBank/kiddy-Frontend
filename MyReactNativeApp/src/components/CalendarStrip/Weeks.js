/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default ({weekStartsOn}) => {
  const week_localized = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const weekStartsOnMirror = weekStartsOn % 7;
  const weekTransformed = [
    ...week_localized.slice(weekStartsOnMirror),
    ...week_localized.slice(0, weekStartsOnMirror),
  ];
  return (
    <View style={styles.wrapWeek}>
      {weekTransformed.map(day => (
        <View style={styles.days} key={day}>
          <Text
            style={[
              styles.textDay,
              (day === 'T7' || day === 'CN') && styles.textDayOpacity,
            ]}>
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
};
