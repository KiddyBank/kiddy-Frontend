import {StyleSheet} from 'react-native';
import {getWidth, getHeight, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  BillItem: {
    flexDirection: 'row',
    paddingVertical: getHeight(5),
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: getHeight(1),
  },
  BillItemLeft: {
    paddingRight: getWidth(10),
    borderRightColor: '#43d3ff',
    borderRightWidth: getHeight(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: getWidth(80),
  },
  BillItemTime: {
    fontSize: getHeight(12.51),
    color: '#545a63',
    fontFamily: fontFamily.f1,
  },
  BillItemRight: {
    flex: 1,
    paddingLeft: getWidth(10),
    paddingVertical: getHeight(5),
  },
  BillItemText1: {
    fontSize: getHeight(14.59),
    color: '#1c1e21',
    marginBottom: getHeight(23),
    fontFamily: fontFamily.f3,
  },
  BillItemText2: {
    fontSize: getHeight(14.59),
    color: '#545a63',
    fontFamily: fontFamily.f1,
  },
});
