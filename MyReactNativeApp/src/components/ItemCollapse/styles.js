import {StyleSheet} from 'react-native';
import {getHeight, fontFamily, getWidth} from '@common/index';

const styles = StyleSheet.create({
  // style for leave
  container: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getHeight(20),
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: getHeight(1),
  },
  itemBreak: {
    flexWrap: 'wrap',
  },
  iconLeft: {
    width: getWidth(22),
    height: getHeight(19),
    resizeMode: 'contain',
    marginRight: getHeight(10),
  },
  textCenter: {
    fontSize: getHeight(17),
    fontFamily: fontFamily.f2,
    color: '#383e42',
    flex: 1,
    flexGrow: 1,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRight: {
    fontSize: getHeight(17),
    fontFamily: fontFamily.f2,
    color: '#383e42',
    opacity: 0.6,
  },
  textWidthRight: {
    maxWidth: getHeight(250),
  },
  iconArrowRight: {
    width: getWidth(8),
    height: getHeight(14),
    resizeMode: 'contain',
    tintColor: '#989a9c',
    marginLeft: getHeight(10),
  },
  inputText: {
    fontSize: getHeight(17),
    fontFamily: fontFamily.f2,
    paddingVertical: 0,
    marginTop: getHeight(10),
    color: '#383e42',
    textAlign: 'left',
    opacity: 0.6,
  },
});

export default styles;
