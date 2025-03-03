import {StyleSheet, Platform} from 'react-native';
import {
  getHeight,
  getWidth,
  fontFamily,
  getStatusBarHeight,
} from '@common/index';

const styles = StyleSheet.create({
  linearGradient: {
    borderBottomLeftRadius: getHeight(10),
    borderBottomRightRadius: getHeight(10),
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    height: getHeight(86) + getStatusBarHeight(),
  },
  header: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    zIndex: 1,
    width: '100%',
    height: getHeight(44),
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
    color: '#fff',
    textAlignVertical: 'center',
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
    fontFamily: fontFamily.f1,
    fontSize: getHeight(17.34),
    color: '#fff',
    marginLeft: getWidth(10),
  },
  titleRight: {
    fontFamily: fontFamily.f3,
    fontSize: getHeight(17.07),
    color: '#fff',
    opacity: 0.6,
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
  more: {
    height: getHeight(17),
    width: getWidth(16),
    resizeMode: 'contain',
  },
  question: {
    height: getHeight(18),
    width: getWidth(17),
    resizeMode: 'contain',
  },
  hasNotify: {
    position: 'absolute',
    height: getHeight(9),
    width: getHeight(9),
    borderRadius: getHeight(9) / 2,
    backgroundColor: '#00ff16',
    borderColor: '#d7702c',
    borderWidth: getHeight(1),
    right: Platform.OS === 'ios' ? getWidth(4) : getWidth(3),
    top: 0,
  },
  hasNotifyMore: {
    position: 'absolute',
    height: getHeight(9),
    width: getHeight(9),
    borderRadius: getHeight(9) / 2,
    backgroundColor: '#00ff16',
    borderColor: '#d7702c',
    borderWidth: getHeight(1),
    right: 0,
    top: 0,
  },
  // welcome
  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getWidth(10),
  },
  welcomeImage: {
    width: getWidth(21),
    height: getHeight(22),
    resizeMode: 'contain',
  },
  welcomeText: {
    fontFamily: fontFamily.f1,
    fontSize: getHeight(17.34),
    color: '#fff',
  },
  welcomeBold: {
    fontWeight: '700',
  },
  // right action
  rightAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
