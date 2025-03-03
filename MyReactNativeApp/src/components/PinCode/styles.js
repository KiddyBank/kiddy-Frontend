import {Dimensions, StyleSheet} from 'react-native';
import {getHeight, fontFamily} from '@common/index';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: width - 30,
    backgroundColor: '#f9f9f9',
    paddingVertical: 25,
    borderRadius: 10,
  },
  containerPin: {
    width: width - 30,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pin: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: getHeight(50),
    height: getHeight(55),
    borderColor: '#ebebeb',
    borderWidth: getHeight(1),
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 20,
    marginTop: 30,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    paddingTop: getHeight(20),
    fontFamily: fontFamily.f1,
    fontSize: getHeight(13.35),
  },
});
