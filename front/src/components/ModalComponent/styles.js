import {StyleSheet} from 'react-native';
import {getHeight, fontFamily, getWidth} from '@common/index';
import {get} from 'mobx';

export const styles = StyleSheet.create({
  wrapModal: {},
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: getWidth(50),
    borderRadius: getHeight(10),
    borderWidth: getHeight(1),
    borderColor: '#fff',
    overflow: 'hidden',
  },
  children: {
    padding: getHeight(25),
  },
  groupButton: {
    flexDirection: 'row',
    borderTopWidth: getHeight(1),
    borderColor: '#eeeeee',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: getHeight(12),
    borderRightWidth: getHeight(1),
    borderColor: '#eeeeee',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: fontFamily.f1,
    fontSize: getHeight(13.35),
    color: '#db9968',
  },
  textBold: {
    fontFamily: fontFamily.f3,
  },
  // wrapModal: {},
});
