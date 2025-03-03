// @flow
import {StyleSheet} from 'react-native';
import {getHeight, getWidth, fontFamily} from '@common/index';

const calendarHeight = getHeight(1740);
// const eventPaddingLeft = 4
const leftMargin = getHeight(50) - getHeight(1);

export default function styleConstructor(theme = {}) {
  let style = {
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      ...theme.container,
    },
    contentStyle: {
      backgroundColor: '#f9f9f9',
      height: calendarHeight + getHeight(10),
    },
    header: {
      paddingHorizontal: getHeight(15),
      height: getHeight(50),
      borderTopWidth: getHeight(1),
      borderBottomWidth: getHeight(1),
      borderColor: '#E6E8F0',
      backgroundColor: '#f9f9f9',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...theme.header,
    },
    headerText: {
      fontSize: getHeight(16),
    },
    arrow: {
      width: getWidth(15),
      height: getHeight(15),
      resizeMode: 'contain',
    },
    event: {
      position: 'absolute',
      backgroundColor: 'rgb(255, 255, 255)',
      opacity: 0.8,
      borderColor: '#DDE5FD',
      borderWidth: getHeight(1),
      borderRadius: getHeight(5),
      // comment 1
      minHeight: getHeight(25),
      flex: 1,
      padding: getHeight(10),
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflow: 'hidden',
      ...theme.event,
    },
    eventContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    eventInfo: {
      flex: 1,
      flexGrow: 1,
      height: '100%',
    },
    eventTitle: {
      fontFamily: fontFamily.f3,
      fontSize: getHeight(14.67),
      color: '#343844',
      minHeight: getHeight(15),
      marginBottom: getHeight(5),
      ...theme.eventTitle,
    },
    eventSummary: {
      fontFamily: fontFamily.f1,
      fontSize: getHeight(10.67),
      color: '#383e42',
      flexWrap: 'wrap',
      ...theme.eventSummary,
    },
    eventTimes: {
      marginTop: getHeight(3),
      fontSize: getHeight(10),
      fontFamily: fontFamily.f1,
      color: '#615B73',
      flexWrap: 'wrap',
      ...theme.eventTimes,
    },
    status: {},
    statusText: {
      fontSize: getHeight(13.33),
      fontFamily: fontFamily.f1,
      color: '#47929e',
    },
    statusOrange: {
      color: '#e99d23',
    },
    statusRed: {
      color: '#ca4f2c',
    },
    line: {
      height: getHeight(1),
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'rgb(216,216,216)',
      ...theme.line,
    },
    lineNow: {
      height: getHeight(1),
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'red',
      ...theme.line,
    },
    timeLabel: {
      position: 'absolute',
      left: 0,
      color: '#343844',
      fontSize: getHeight(15.33),
      fontFamily: fontFamily.f1,
      ...theme.timeLabel,
    },
  };
  return StyleSheet.create(style);
}
