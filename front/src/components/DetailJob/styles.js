import {StyleSheet} from 'react-native';
import {getWidth, getHeight, fontFamily} from '@common';
const styles = StyleSheet.create({
  scroll: {
    paddingVertical: getHeight(15),
  },
  container: {
    paddingHorizontal: getHeight(15),
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: getHeight(1),
    borderColor: '#aeaeae',
    paddingBottom: getHeight(15),
    marginBottom: getHeight(15),
  },
  company: {
    fontFamily: fontFamily.f2,
    fontSize: getHeight(17),
    color: '#383e42',
  },
  arrowRight: {
    width: getWidth(8),
    height: getWidth(14),
    resizeMode: 'contain',
    tintColor: '#989a9c',
  },
  noButton: {
    tintColor: 'transparent',
  },
  iconTitle: {
    width: getWidth(18),
    height: getWidth(28),
    resizeMode: 'contain',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '94%',
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  arrow: {
    width: '5%',
  },
  companyName: {
    width: '50%',
    fontFamily: fontFamily.f2,
    fontSize: getHeight(17),
    color: '#aeb0b1',
    textAlign: 'right',
    paddingRight: getHeight(15),
  },
  Icon: {
    marginRight: getHeight(15),
  },
});
export default styles;
