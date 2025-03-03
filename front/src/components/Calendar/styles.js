import {StyleSheet} from 'react-native';
import {getHeight, getWidth, fontFamily} from '@common/index';

export const styles = StyleSheet.create({
  ic_arrow: {
    width: getWidth(20),
    height: getHeight(20),
    resizeMode: 'contain',
  },
  txtDayHeader: {
    fontSize: getWidth(18.33),
    fontFamily: fontFamily.f3,
    color: '#0023c4',
  },
});
