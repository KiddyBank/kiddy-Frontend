import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function SectionHeader(props) {
  const SectionComponent = props.component;
  const {index, sectionHeaderHeight} = props;

  const content = SectionComponent ? (
    <SectionComponent {...props} />
  ) : (
    <Text
      style={[
        styles.header,
        index === 0 && styles.headerNone,
        sectionHeaderHeight && {height: sectionHeaderHeight},
      ]}>
      {props.title}
    </Text>
  );

  return <View>{content}</View>;
}
