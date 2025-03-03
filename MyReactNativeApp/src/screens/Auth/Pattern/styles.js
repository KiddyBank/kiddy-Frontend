import {StyleSheet} from 'react-native';
import {getHeight, fontFamily, getWidth} from '@common/index';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    color: '#343844',
    fontSize: getHeight(17.35),
    fontFamily: fontFamily.f3,
    marginTop: getHeight(40),
    marginBottom: getHeight(10),
  },
  description: {
    color: '#383e42',
    fontSize: getHeight(13.35),
    fontFamily: fontFamily.f1,
    marginBottom: getHeight(25),
  },
  passCode: {
    color: '#e99d23',
    fontSize: getHeight(34.19),
    fontFamily: fontFamily.f3,
    letterSpacing: getWidth(5),
  },
  listCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  // copy style
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

export default styles;
