import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from '../LocalConfigVN';
import {Images} from '@config';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {styles} from './styles';
import _ from 'lodash';

function CalendarTimeKeeping(props) {
  const navigation = useNavigation();
  // LocaleConfig.defaultLocale = 'vi';
  const [dayHeader, setdayHeader] = useState(moment().format('YYYY-MM-DD'));
  const [selected, setSelected] = useState('');
  const [startDate, setstartDate] = useState(
    moment().startOf('M').format('YYYY-MM-DD'),
  );
  const [endDate, setendDate] = useState(
    moment().endOf('M').format('YYYY-MM-DD'),
  );

  const onDayPress = day => {
    setSelected(day.dateString);
    props.selectedDay(day.dateString);
  };
  const onMonthPress = month => {
    setdayHeader(month.dateString);
    setstartDate(
      moment(month.dateString).startOf('month').format('YYYY-MM-DD'),
    );
    setendDate(moment(month.dateString).endOf('month').format('YYYY-MM-DD'));
    props.selectedMonth(month.dateString);
  };
  const getDisabledDates = (startDate, endDate, daysToDisable) => {
    const disabledDates = {};
    const start = moment(startDate);
    const end = moment(endDate);
    for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
      if (m.isoWeekday() === 6 || m.isoWeekday() === 7) {
        if (_.includes(daysToDisable, m.weekday())) {
          disabledDates[m.format('YYYY-MM-DD')] = {disabled: true};
        }
      }
    }
    return disabledDates;
  };
  return (
    <View>
      <Calendar
        hideExtraDays={true}
        firstDay={1}
        style={props.styleCalendar}
        // markingType={'period'}
        markedDates={{
          ...props.markedDate,
          [selected]: {
            marked: true,
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#0023c4',
            selectedTextColor: 'white',
            selectedDotColor: 'red',
            dotColor: 'red',
          },
          ...getDisabledDates(
            props.startDateDisable,
            props.endDateDisable,
            [0, 6],
          ),
        }}
        theme={{
          textSectionTitleColor: '#000',
          textSectionTitleDisabledColor: '#ccc',
          'stylesheet.calendar.header': {
            week: {
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            },
          },
        }}
        renderArrow={direction =>
          direction === 'left' ? (
            <Image source={Images.attendance.ic_prev} style={styles.ic_arrow} />
          ) : (
            <Image
              source={Images.attendance.ic_prev}
              style={[styles.ic_arrow, {transform: [{rotate: '180deg'}]}]}
            />
          )
        }
        onDayPress={day => onDayPress(day)}
        onMonthChange={month => onMonthPress(month)}
        renderHeader={date => {
          return (
            <Text style={styles.txtDayHeader}>{`Thg ${moment(dayHeader).format(
              'MM',
            )} ${moment(dayHeader).format('YYYY')}`}</Text>
          );
        }}
      />
    </View>
  );
}

export default CalendarTimeKeeping;
