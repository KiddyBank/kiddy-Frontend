/*
 *
 * @author DatTD
 * Created on Wed Jul 15 2020
 * Copyright (c) 2020 ApecSoft
 *
 */
import React from 'react';
import {View, Image} from 'react-native';
import {Images} from '@config/index';
import styles from './styles';

export default function Splash(props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={styles.logo}
      />
    </View>
  );
}
