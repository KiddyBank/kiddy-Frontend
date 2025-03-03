import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import styles from './style';
import moment from 'moment';
import {LocaleConfig} from '@components/index';
import {getHeight} from '@common/index';
import {timekeeping} from '@services';
import Toast from 'react-native-simple-toast';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format('YYYY-MM-DD'),
      items: {},
      start_date: '2020-07-01',
      end_date: '2020-07-31',
      data: [],
      markedDate: {},
    };
    LocaleConfig.defaultLocale = 'vi';
  }

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    let {start_date, end_date, markedDate} = this.state;
    let result = await timekeeping.history(start_date, end_date);
    console.log('result', result);
    if (result.data.code === 200) {
      markedDate = result.data.data.data[0].list_day;
      const obj = markedDate.reduce(function (obj, e) {
        obj[e] = {marked: true};
        return obj;
      }, {});
      this.setState({
        markedDate: obj,
        data: result.data.data.data[0],
      });
    } else {
      Toast.show(result.data.message);
    }
  };
  render() {
    let {selectedDate} = this.state;
    if (this.props.hidden) return null;
    return (
      <Agenda
        items={this.state.items}
        monthFormat={'MM / yyyy'}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={selectedDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markedDates={this.state.markedDate}
        theme={{
          backgroundColor: '#f9f9f9',
          textDayFontSize: getHeight(18.33),
          textDayHeaderFontSize: getHeight(10.67),
          selectedDayBackgroundColor: '#e99d23',
          selectedDayTextColor: 'white',
          agendaKnobColor: '#dbdbdb',
          agendaDayNumColor: '#343844',
          agendaTodayColor: '#343844',
          dotColor: '#47929e',
        }}
        style={styles.AgendaCalendar}
      />
    );
  }
  loadItems(day) {
    setTimeout(() => {
      for (let i = -1; i < 3; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          this.state.items[strTime].push({
            name:
              moment(this.state.data.applied_on).format('h:mm') +
              ' - ' +
              moment(strTime).format('DD/MM/YYYY'),
            height: getHeight(140),
          });
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    let {data} = this.state;
    return (
      <TouchableOpacity style={[styles.item, {height: item.height}]}>
        <View style={styles.item1}>
          <View style={styles.border} />
          <View style={styles.view}>
            <Text style={styles.textstt}>
              {data.status === '1' ? 'Nghỉ có phép' : 'Nghỉ không phép'}
            </Text>
            <View style={styles.viewTime}>
              <Text style={styles.name}>{item.name}</Text>

              {data.status === '1' ? (
                <Text style={styles.textConfirm}>Đã xác nhận</Text>
              ) : (
                <Text style={styles.textConfirmOther}>Chưa xác nhận</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
