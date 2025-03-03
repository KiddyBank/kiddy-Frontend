import {StyleSheet, Platform} from 'react-native';
import {getHeight, ScreenWidth, fontFamily} from '@common/index';

const styles = StyleSheet.create({
  // style for week
  wrapWeek: {
    width: ScreenWidth - getHeight(30),
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  days: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDay: {
    fontSize: getHeight(10.67),
    fontFamily: fontFamily.f2,
    color: '#000',
  },
  textDayOpacity: {
    color: '#b7b7b7',
  },
  // style day of month
  container: {
    width: ScreenWidth,
    paddingHorizontal: getHeight(15),
    paddingTop: getHeight(5),
    borderBottomWidth: getHeight(1),
    borderBottomColor: '#ece3e0',
    // height: getHeight(30) + getHeight(50),
  },
  header: {
    height: getHeight(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  headerDate: {
    color: 'gray',
    fontSize: getHeight(13),
  },
  headerDateWeek: {
    color: '#3D6DCF',
    fontSize: getHeight(14),
  },
  headerGoTodayButton: {
    borderRadius: getHeight(10),
    width: getHeight(20),
    height: getHeight(20),
    backgroundColor: '#3D6DCF',
    position: 'absolute',
    top: 5,
    right: getHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // end header and opacity: 0
  todayText: {
    fontSize: getHeight(12),
    color: '#fff',
  },
  itemContainer: {
    width: (ScreenWidth - getHeight(30)) / 7,
    height: getHeight(38),
  },
  itemWrapButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemView: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: getHeight(35),
    height: getHeight(35),
    borderRadius: getHeight(35) / 2,
  },
  itemDateCurrent: {
    borderWidth: getHeight(1),
    borderColor: '#0023c4',
  },
  itemDateText: {
    fontSize: getHeight(18.33),
    fontFamily: fontFamily.f1,
    flexDirection: 'row',
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: getHeight(5),
    lineHeight: Platform.OS === 'ios' ? getHeight(19) : getHeight(15),
  },
  itemDateTextGray: {
    color: '#b7b7b7',
  },
  itemLunarText: {
    fontSize: getHeight(10),
  },
  itemBottomDot: {
    width: getHeight(4),
    height: getHeight(4),
    left: getHeight(16.5),
    bottom: getHeight(4),
    borderRadius: getHeight(4) / 2,
    position: 'absolute',
  },
  // style format
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getHeight(20),
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: getHeight(1),
  },
  textRight: {
    fontSize: getHeight(17),
    fontFamily: fontFamily.f2,
    color: '#383e42',
    opacity: 0.6,
  },
  // style for footer
  wrapDate: {
    alignItems: 'center',
    marginBottom: getHeight(15),
  },
  date: {
    fontSize: getHeight(16),
    fontFamily: fontFamily.f1,
    color: '#7d7d7d',
  },
  // tabView: {},
});

export default styles;
