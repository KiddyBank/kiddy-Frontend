/**
 * Common style for project
 * @author dattd
 * @since 2020
 * @version 1.0.0
 */
import {StyleSheet} from 'react-native';
import {getHeight, getWidth} from './Helper';

export const Style = StyleSheet.create({
  iconTabBottom: {
    width: getWidth(23),
    height: getHeight(23),
    resizeMode: 'contain',
  },
  validationText: {
    color: '#dc3545',
  },
});

export const Colors = {
  //c1: "#002f87",
};

export const fontFamily = {
  //f1: "SFProDisplay-Regular",
};
