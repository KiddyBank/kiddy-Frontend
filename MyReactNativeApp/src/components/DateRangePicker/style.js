import {StyleSheet, Dimensions} from 'react-native';
import {getWidth, getHeight} from '@common/index';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  backdropDefaults: {
    // width: width,
    // height: height,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2147483647,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: width * 0.85,
    overflow: 'hidden',
  },
  closeTrigger: {
    width: width,
    height: height,
  },
  closeContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  calendar: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    color: 'black',
  },
  monthButtons: {
    fontSize: 16,
    color: 'black',
  },
  day: {
    width: width * 0.09,
    height: height * 0.065,
    justifyContent: 'center',
  },
  dayHeader: {
    width: width * 0.09,
    height: height * 0.03,
    justifyContent: 'center',
  },
  dayHeaderText: {
    opacity: 0.6,
    textAlign: 'center',
  },
  dayHeaderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  selected: {
    backgroundColor: '#3b83f7',
    height: '80%',
    borderRadius: 8,
  },
  selectedText: {
    color: 'white',
  },
  selectedDefaults: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledText: {
    opacity: 0.3,
  },
  // custome style
  iconArrowLeft: {
    width: getWidth(20),
    height: getHeight(20),
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  iconArrowRight: {
    width: getWidth(20),
    height: getHeight(20),
    resizeMode: 'contain',
    transform: [{rotate: '-90deg'}],
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeight(10),
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonClose: {
    paddingVertical: getHeight(10),
    paddingHorizontal: getHeight(50),
    backgroundColor: '#3b83f7',
    borderRadius: getHeight(10),
  },
  buttonText: {
    textAlign: 'center',
    fontSize: getHeight(15),
    color: '#fff',
  },
});

export default styles;
