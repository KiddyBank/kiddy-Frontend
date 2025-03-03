import {StyleSheet} from 'react-native';
import {getHeight, getWidth, fontFamily, normalize} from '@common/index';

const styles = StyleSheet.create({
  formGroup: {
    position: 'relative',
    marginBottom: getHeight(30),
  },
  label: {
    fontSize: getHeight(9),
  },
  input: {
    paddingVertical: getHeight(10),
    paddingHorizontal: getWidth(30),
    borderBottomWidth: 1,
    borderBottomColor: '#a4a8aa',
    color: '#545c5f',
    fontSize: normalize(14.59),
    fontFamily: fontFamily.f2,
  },
  placeholder: {
    fontSize: normalize(14.59),
    fontFamily: fontFamily.f2,
  },
  prependView: {
    top: 0,
    left: 0,
    position: 'absolute',
    justifyContent: 'center',
    width: getWidth(30),
    alignItems: 'flex-start',
    height: '100%',
  },
  appendView: {
    top: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: getWidth(30),
    height: '100%',
  },
  icon: {
    width: getHeight(19),
    height: getHeight(20),
    resizeMode: 'contain',
  },
});

export default styles;
