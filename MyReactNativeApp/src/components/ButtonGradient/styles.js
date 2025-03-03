import {StyleSheet} from 'react-native';
import {fontFamily, ScreenWidth, getHeight} from '@common/index';

const styles = StyleSheet.create({
  linearGradient: {
    width: ScreenWidth,
    height: getHeight(50),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: getHeight(17),
    fontFamily: fontFamily.f3,
    alignSelf: 'center',
    color: '#ffffff',
  },
});
export default styles;
