/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import Weeks from './Weeks';
import {
  // getDay,
  format,
  addDays,
  subDays,
  // isToday,
  eachDay,
  isFuture,
  isSameDay,
  endOfWeek,
  getISOWeek,
  startOfWeek,
  differenceInDays,
} from 'date-fns';
import {getHeight} from '@common/index';
import styles from './styles';

const width = Dimensions.get('window').width - getHeight(30);
const ITEM_LENGTH = width / 7;
const _today = new Date();
const _year = _today.getFullYear();
const _month = _today.getMonth();
const _day = _today.getDate();
const TODAY = new Date(_year, _month, _day); // FORMAT: Wed May 16 2018 00:00:00 GMT+0800 (CST)

class DateItem extends PureComponent {
  render() {
    const {item, marked, highlight, onItemPress} = this.props;
    const solar = format(item, 'D');
    const checkColor =
      format(item, 'dd') === 'Sa' || format(item, 'dd') === 'Su';
    const highlightBgColor = '#0023c4';
    const normalBgColor = 'white';
    const hightLightTextColor = '#fff';
    const normalTextColor = '#000001';
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          underlayColor="#008b8b"
          style={styles.itemWrapButton}
          onPress={onItemPress}>
          <View
            style={[
              styles.itemView,
              isSameDay(_today, item) && styles.itemDateCurrent,
              {backgroundColor: highlight ? highlightBgColor : normalBgColor},
            ]}>
            <Text
              style={[
                styles.itemDateText,
                {color: highlight ? hightLightTextColor : normalTextColor},
                checkColor && styles.itemDateTextGray,
              ]}>
              {solar}
            </Text>
            {marked && (
              <View
                style={[
                  styles.itemBottomDot,
                  {backgroundColor: highlight ? 'white' : '#6D88E6'},
                ]}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class CalendarStrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: this.getInitialDates(props.weekStartsOn),
      isTodayVisible: true,
      pageOfToday: 2, // page of today in calendar, start from 0
      currentPage: 2, // current page in calendar,  start from 0
      currentMonth: new Date(),
    };
  }

  componentDidMount() {
    const {selectedDate} = this.props;
    this.setState({currentMonth: selectedDate});
  }

  UNSAFE_componentWillMount() {
    const touchThreshold = 50;
    const speedThreshold = 0.2;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const {dy, vy} = gestureState;
        if (dy > touchThreshold && vy > speedThreshold) {
          const {onSwipeDown} = this.props;
          onSwipeDown && onSwipeDown();
        }
        return false;
      },
      onPanResponderRelease: () => {},
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (isSameDay(nextProps.selectedDate, this.state.selectedDate)) {
      return;
    }
    const nextSelectedDate = nextProps.selectedDate;
    if (!this.currentPageDatesIncludes(nextSelectedDate)) {
      const sameDay = d => isSameDay(d, nextSelectedDate);
      if (this.state.dates.find(sameDay)) {
        let selectedIndex = this.state.dates.findIndex(sameDay);
        if (selectedIndex === -1) {
          selectedIndex = this.state.pageOfToday;
        } // in case not find
        const selectedPage = ~~(selectedIndex / 7);
        this.scrollToPage(selectedPage);
      } else {
        // not born, then spawn these dates, then scroll to it.
        // past: born [startOfThatWeek, last]
        // future: born [first, endOfThatWeek]
        // momentumEnd() handle pageOfToday and currentPage
        if (isFuture(nextSelectedDate)) {
          const head = this.state.dates[0];
          const tail = endOfWeek(nextSelectedDate, {
            weekStartsOn: nextProps.weekStartsOn,
          });
          const days = eachDay(head, tail);
          this.setState(
            {
              dates: days,
              isTodayVisible: false,
            },
            () => {
              const page = ~~(days.length / 7 - 1);
              // to last page
              this.scrollToPage(page);
            },
          );
        } else {
          const head = startOfWeek(nextSelectedDate, {
            weekStartsOn: nextProps.weekStartsOn,
          });
          const tail = this.state.dates[this.state.dates.length - 1];
          const days = eachDay(head, tail);
          this.setState(
            {
              dates: days,
              isTodayVisible: false,
            },
            () => {
              // to first page
              this.scrollToPage(0);
            },
          );
        }
      }
    }
  }

  scrollToPage = (page, animated = true) => {
    this._calendar.scrollToIndex({animated, index: 7 * page});
  };

  currentPageDatesIncludes = date => {
    const {currentPage} = this.state;
    const currentPageDates = this.state.dates.slice(
      7 * currentPage,
      7 * (currentPage + 1),
    );
    // do not use currentPageDates.includes(date); because can't compare Date in it
    return !!currentPageDates.find(d => isSameDay(d, date));
  };

  getInitialDates(weekStartsOn = 0) {
    // const todayInWeek = getDay(TODAY);
    const last2WeekOfToday = subDays(TODAY, 7 * 2);
    const next2WeekOfToday = addDays(TODAY, 7 * 2);
    const startLast2Week = startOfWeek(last2WeekOfToday, {weekStartsOn});
    const endNext2Week = endOfWeek(next2WeekOfToday, {weekStartsOn});
    const eachDays = eachDay(startLast2Week, endNext2Week);
    return eachDays;
  }

  loadNextTwoWeek(originalDates) {
    const originalFirstDate = originalDates[0];
    const originalLastDate = originalDates[originalDates.length - 1];
    const lastDayOfNext2Week = addDays(originalLastDate, 7 * 2);
    const eachDays = eachDay(originalFirstDate, lastDayOfNext2Week);
    this.setState({dates: eachDays});
  }

  loadPreviousTwoWeek(originalDates) {
    const originalFirstDate = originalDates[0];
    const originalLastDate = originalDates[originalDates.length - 1];
    const firstDayOfPrevious2Week = subDays(originalFirstDate, 7 * 2);
    const eachDays = eachDay(firstDayOfPrevious2Week, originalLastDate);
    this.setState(
      prevState => ({
        dates: eachDays,
        currentPage: prevState.currentPage + 2,
        pageOfToday: prevState.pageOfToday + 2,
      }),
      () => {
        this.scrollToPage(2, false);
      },
    );
  }

  _renderHeader = () => {
    const {selectedDate, onPressGoToday, showWeekNumber} = this.props;

    const dateFormatted = format(selectedDate, 'YYYY/MM/DD ddd');
    const weekNumber = getISOWeek(selectedDate);
    return (
      <View style={styles.header}>
        <Text style={styles.headerDate}>{dateFormatted}</Text>
        {showWeekNumber && (
          <Text style={styles.headerDateWeek}>{` W${weekNumber}`}</Text>
        )}
        {!this.state.isTodayVisible && (
          <TouchableOpacity
            style={styles.headerGoTodayButton}
            onPress={() => {
              const page = this.state.pageOfToday;
              onPressGoToday && onPressGoToday(TODAY);
              this.scrollToPage(page);
            }}>
            <Text style={styles.todayText}>今</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  _stringToDate = dateString => {
    // '2018-01-01' => Date
    const dateArr = dateString.split('-');
    const [y, m, d] = dateArr.map(ds => parseInt(ds, 10));
    // CAVEAT: Jan is 0
    return new Date(y, m - 1, d);
  };

  render() {
    const {
      markedDate,
      onPressDate,
      selectedDate,
      weekStartsOn,
      showChineseLunar,
    } = this.props;
    const {currentMonth} = this.state;
    const marked = markedDate.map(ds => this._stringToDate(ds));
    return (
      <View style={styles.container} {...this._panResponder}>
        {/* if this.props.renderHeader is entry we will render it */}
        {this.props.renderHeader && this._renderHeader()}
        <Weeks weekStartsOn={weekStartsOn} />
        <FlatList
          ref={ref => (this._calendar = ref)}
          bounces={false}
          horizontal
          pagingEnabled
          initialScrollIndex={14}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.momentumEnd}
          scrollEventThrottle={500}
          getItemLayout={(data, index) => ({
            length: ITEM_LENGTH,
            offset: ITEM_LENGTH * index,
            index,
          })}
          onEndReached={() => {
            this.onEndReached();
          }}
          onEndReachedThreshold={0.01}
          data={this.state.dates}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <DateItem
              item={item}
              showLunar={showChineseLunar}
              onItemPress={() => onPressDate && onPressDate(item)}
              highlight={isSameDay(selectedDate, item)}
              marked={marked.find(d => isSameDay(d, item))}
            />
          )}
        />
        <View style={styles.wrapDate}>
          <Text style={styles.date}>
            {'Tháng ' + format(currentMonth, 'MM YYYY')}
          </Text>
        </View>
      </View>
    );
  }

  momentumEnd = async event => {
    const {dates} = this.state;
    const firstDayInCalendar = this.state.dates
      ? this.state.dates[0]
      : new Date();
    const daysBeforeToday = differenceInDays(firstDayInCalendar, new Date());
    const pageOfToday = ~~Math.abs(daysBeforeToday / 7);
    const screenWidth = event.nativeEvent.layoutMeasurement.width;
    const currentPage = event.nativeEvent.contentOffset.x / screenWidth;
    let startWeek = Math.round(currentPage) * 7;
    this.setState({
      pageOfToday,
      currentPage,
      isTodayVisible: currentPage === pageOfToday,
      currentMonth: dates[startWeek],
    });

    // swipe to head ~ load 2 weeks
    if (event.nativeEvent.contentOffset.x < width) {
      this.loadPreviousTwoWeek(this.state.dates);
    }
  };

  onEndReached() {
    this.loadNextTwoWeek(this.state.dates);
  }
}

export default CalendarStrip;
