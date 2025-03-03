import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function CellWall(props) {
  const Cell = props.component;
  const {cellHeight, title, index, scrollTo} = props;
  const content = Cell ? (
    <Cell {...props} />
  ) : (
    <TouchableOpacity
      onPress={() => {
        scrollTo(index);
      }}
      style={[styles.cellButton, {width: cellHeight}]}>
      <Text style={styles.cellText}>{title}</Text>
    </TouchableOpacity>
  );
  return <View>{content}</View>;
}
