import {StyleSheet} from 'react-native';
import {fontFamily, getHeight, getWidth} from '@common/index';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: -getWidth(8),
    flexDirection: 'column',
    alignItems: 'center',
  },
  cellButton: {
    backgroundColor: 'red',
    paddingHorizontal: getHeight(10),
  },
  cellText: {
    fontFamily: fontFamily.f3,
    fontSize: getHeight(11),
    color: '#d17431',
    marginBottom: getHeight(3),
    textAlign: 'center',
  },
  scrollView: {
    marginTop: getHeight(20),
  },
  pinHeader: {
    fontFamily: fontFamily.f1,
    fontSize: getHeight(13.33),
    color: '#343844',
    borderColor: '#e0e0e0',
    borderBottomWidth: getHeight(1),
    paddingBottom: getHeight(10),
    position: 'absolute',
    top: 0,
    right: getWidth(10),
    left: 0,
    zIndex: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontFamily: fontFamily.f1,
    fontSize: getHeight(13.33),
    color: '#343844',
    borderColor: '#e0e0e0',
    borderTopWidth: getHeight(1),
    paddingVertical: getHeight(10),
    backgroundColor: 'yellow',
  },
  headerNone: {
    borderTopWidth: 0,
  },
  list: {
    paddingBottom: getHeight(50),
  },
  item: {
    flexDirection: 'row',
    marginBottom: getHeight(20),
  },
  wrapAvatar: {
    height: getHeight(50),
    width: getHeight(50),
    borderRadius: getHeight(50) / 2,
    overflow: 'hidden',
  },
  avatar: {
    height: getHeight(50),
    width: getHeight(50),
    borderRadius: getHeight(50) / 2,
    resizeMode: 'cover',
  },
  info: {
    marginLeft: getWidth(5),
    flex: 1,
    flexGrow: 1,
  },
  fullName: {
    fontFamily: fontFamily.f3,
    fontSize: getHeight(14.67),
    color: '#343844',
    marginBottom: getHeight(10),
  },
  position: {
    fontFamily: fontFamily.f1,
    fontSize: getHeight(13.33),
    color: '#383e42',
  },
  action: {
    flexDirection: 'row',
  },
  buttonEmail: {
    justifyContent: 'center',
    paddingHorizontal: getHeight(10),
  },
  iconEmail: {
    width: getWidth(23),
    height: getHeight(18),
    resizeMode: 'contain',
  },
  iconPhone: {
    width: getWidth(20),
    height: getHeight(20),
    resizeMode: 'contain',
  },
  // buttonText: {
  //   fontFamily: fontFamily.f3,
  //   fontSize: getHeight(17),
  //   color: '#ffffff',
  // },
});
export default styles;
