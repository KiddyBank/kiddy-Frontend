import {StyleSheet} from 'react-native';
import {getWidth, getHeight, fontFamily} from '@common/index';

export const styles = StyleSheet.create({
  item: {
    paddingHorizontal: getWidth(10),
    paddingTop: getHeight(8),
    paddingBottom: getHeight(15),
    backgroundColor: '#fff',
    borderBottomWidth: getHeight(1),
    borderBottomColor: '#dcdcdc',
  },
  itemActive: {
    backgroundColor: '#eef3f5',
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTopContent: {
    flex: 1,
    paddingHorizontal: getWidth(10),
  },
  itemAvatar: {
    width: getWidth(40),
    position: 'relative',
  },
  activeAvatar: {
    width: getHeight(15),
    height: getHeight(15),
    borderRadius: getHeight(15) / 2,
    backgroundColor: '#ff5e14',
    borderWidth: getHeight(1),
    borderColor: '#fff',
    position: 'absolute',
    top: -2,
    right: -2,
  },
  itemImage: {
    width: getWidth(40),
    height: getWidth(40),
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: getWidth(40) / 2,
    borderWidth: 1,
    borderColor: '#eef3f5',
  },
  itemInfo: {
    flex: 1,
  },
  itemParent: {
    fontSize: getHeight(14.58),
    fontFamily: fontFamily.f2,
    color: '#1c1e21',
    textAlign: 'left',
    overflow: 'hidden',
  },
  itemChild: {
    fontSize: getHeight(12.5),
    fontFamily: fontFamily.f1,
    color: '#545a63',
    textAlign: 'left',
    overflow: 'hidden',
  },
  itemChatContent: {
    fontSize: getHeight(14.58),
    fontFamily: fontFamily.f1,
    color: '#545a63',
    overflow: 'hidden',
  },
  itemTime: {
    width: '25%',
    textAlign: 'right',
    fontSize: getHeight(12.5),
    fontFamily: fontFamily.f1,
    color: '#545a63',
  },
  itemBody: {},
  itemMessage: {
    paddingTop: getHeight(10),
    paddingBottom: getWidth(5),
    fontSize: getHeight(13.9),
    fontFamily: fontFamily.f1,
    color: '#000511',
  },
});
