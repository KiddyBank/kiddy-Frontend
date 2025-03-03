import {StyleSheet} from 'react-native';
import {getHeight, getWidth, fontFamily} from '@common/index';

const styles = StyleSheet.create({
  item: {
    borderRadius: getHeight(5),
    marginTop: getHeight(17),
    flex: 1,
    borderBottomWidth: getHeight(1),
    borderBottomColor: '#e0e0e0',
  },
  border: {
    width: getWidth(5),
    height: getHeight(30),
    backgroundColor: '#499880',
    borderRadius: getHeight(5),
  },
  item1: {
    backgroundColor: '#fff',
    height: getHeight(70),
    padding: getHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(20),
  },
  view: {
    paddingLeft: getWidth(10),
    flex: 1,
  },
  textstt: {
    fontSize: getHeight(14.67),
    fontFamily: fontFamily.f3,
    color: '#343844',
  },
  viewTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: getHeight(10.67),
    fontFamily: fontFamily.f1,
    color: '#383e42',
  },
  textConfirm: {
    fontSize: getHeight(13.33),
    fontFamily: fontFamily.f1,
    color: '#499880',
  },
  textConfirmOther: {
    fontSize: getHeight(13.33),
    fontFamily: fontFamily.f1,
    color: '#e99d23',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'red',
  },
  AgendaCalendar: {
    overflow: 'hidden',
    flex: 1,
    flexGrow: 1,
    borderTopLeftRadius: getHeight(20.83),
    borderTopRightRadius: getHeight(20.83),
  },
});
export default styles;
