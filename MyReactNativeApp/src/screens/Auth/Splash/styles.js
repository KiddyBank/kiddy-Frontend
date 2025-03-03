import {StyleSheet} from 'react-native';
import {getHeight, getWidth} from '@common/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: getWidth(265),
    height: getHeight(55),
    resizeMode: 'contain',
  },
});

export default styles;
