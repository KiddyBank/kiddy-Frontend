import {StyleSheet, Platform} from 'react-native';
import {
  getHeight,
  getWidth,
  fontFamily,
  getStatusBarHeight,
} from '@common/index';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#fff',
    height: getHeight(44) + getStatusBarHeight(),
  },
  header: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    zIndex: 1,
    width: '100%',
    height: getHeight(44),
    borderBottomColor: '#aeaeae',
    borderBottomWidth: getHeight(1),
  },
  borderHeaderNone: {
    borderBottomWidth: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 3,
    justifyContent: 'center',
  },
  back: {
    width: getWidth(12),
    height: getHeight(20),
    resizeMode: 'contain',
    marginHorizontal: getWidth(10),
  },
  center: {
    flex: 1,
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: fontFamily.f3,
    fontSize: getHeight(17.13),
    color: '#343844',
    textAlignVertical: 'center',
  },
  subTitle: {
    fontFamily: fontFamily.f3,
    textAlign: 'center',
    fontSize: getHeight(17.2),
    color: '#343844',
  },
  subMainTitle: {
    fontFamily: fontFamily.f3,
    textAlign: 'center',
    fontSize: getHeight(13.34),
    color: '#d17431',
  },
  subMainMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subMainBack: {
    width: getWidth(12),
    height: getHeight(8),
    resizeMode: 'contain',
    transform: [{rotate: '-90deg'}],
    marginLeft: getHeight(4),
  },
  right: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 3,
    justifyContent: 'center',
  },
  titleLeft: {
    fontFamily: fontFamily.f3,
    fontSize: getHeight(28.47),
    color: '#183fd8',
    marginLeft: getWidth(10),
    lineHeight: getHeight(28.47),
  },
  titleRight: {
    fontFamily: fontFamily.f1,
    fontSize: getHeight(17.13),
    color: '#d17431',
    marginRight: getWidth(10),
  },
  review: {
    height: getHeight(23),
    width: getWidth(23),
    resizeMode: 'contain',
    marginRight: getWidth(10),
  },
  person: {
    height: getHeight(23),
    width: getWidth(23),
    resizeMode: 'contain',
    marginRight: getWidth(10),
  },
  notifyView: {
    marginRight: getWidth(10),
    position: 'relative',
  },
  notify: {
    height: getHeight(23),
    width: getWidth(23),
    resizeMode: 'contain',
  },
  hasNotify: {
    position: 'absolute',
    height: getHeight(9),
    width: getHeight(9),
    borderRadius: getHeight(9) / 2,
    backgroundColor: '#ff5e14',
    right: Platform.OS === 'ios' ? getWidth(5) : getWidth(4),
    top: 0,
  },
  filter: {
    width: getWidth(17),
    height: getHeight(17),
    resizeMode: 'contain',
    marginHorizontal: getWidth(10),
  },
});

export default styles;
