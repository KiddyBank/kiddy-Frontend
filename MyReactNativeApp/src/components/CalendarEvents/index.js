/* eslint-disable react/no-string-refs */
// @flow
import {
  VirtualizedList,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {Images} from '@config/index';

import styleConstructor from './style';

import DayView from './DayView';
import {getHeight} from '@common/index';

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styleConstructor(props.styles);
    this.state = {
      date: moment(this.props.initDate),
      index: this.props.size,
    };
  }

  static defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: 'DD MMMM YYYY',
  };

  _getItemLayout(data, index) {
    const {width} = this.props;
    return {length: width, offset: width * index, index};
  }

  _getItem(events, index) {
    const {initDate, size} = this.props;
    const date = moment(initDate).add(index - size, 'days');
    return _.filter(events, event => {
      const eventStartTime = moment(event.start);
      return (
        eventStartTime >= date.clone().startOf('day') &&
        eventStartTime <= date.clone().endOf('day')
      );
    });
  }

  _renderItem({index, item}) {
    const {
      width,
      format24h,
      initDate,
      scrollToFirst,
      size,
      formatHeader,
      headerStyle,
      renderEvent,
      eventTapped,
    } = this.props;
    const date = moment(initDate).add(index - size, 'days');
    return (
      <DayView
        date={date}
        index={index}
        format24h={format24h}
        formatHeader={formatHeader}
        headerStyle={headerStyle}
        renderEvent={renderEvent}
        eventTapped={eventTapped}
        events={item}
        width={width}
        styles={this.styles}
        scrollToFirst={scrollToFirst}
      />
    );
  }

  _goToPage(index) {
    const {size, initDate} = this.props;
    if (index <= 0 || index >= size * 2) {
      return;
    }
    const date = moment(initDate).add(index - size, 'days');
    this.refs.calendar.scrollToIndex({index, animated: false});
    this.setState({index, date});
  }
  _fixWidth(val) {
    return val.toFixed(4);
  }

  render() {
    const {
      width,
      virtualizedListProps,
      events,
      clawAction,
      initDate,
      size,
      renderHeader,
    } = this.props;

    return (
      <View style={[this.styles.container, {width}]}>
        {renderHeader && (
          <View style={this.styles.header}>
            <TouchableOpacity
              onPress={() => this._goToPage(this.state.index - 1)}>
              <Image source={Images.ic_back} style={this.styles.arrow} />
            </TouchableOpacity>
            <Text style={this.styles.headerText}>
              {this.state.date.format('DD MMMM YYYY')}
            </Text>
            <TouchableOpacity
              onPress={() => this._goToPage(this.state.index + 1)}>
              <Image source={Images.ic_back} style={this.styles.arrow} />
            </TouchableOpacity>
          </View>
        )}
        <VirtualizedList
          ref="calendar"
          windowSize={2}
          initialNumToRender={2}
          initialScrollIndex={size}
          data={events}
          getItemCount={() => size * 2}
          getItem={this._getItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={this._getItemLayout.bind(this)}
          horizontal
          pagingEnabled
          renderItem={this._renderItem.bind(this)}
          style={{width: width}}
          onMomentumScrollEnd={event => {
            var widthOfContent = this._fixWidth(
                event.nativeEvent.contentOffset.x,
              ),
              widthFixed = this._fixWidth(width);
            const index = parseInt(widthOfContent / widthFixed);
            const date = moment(initDate).add(index - size, 'days');
            this.setState({index, date});
            clawAction(moment(date).format('YYYY-MM-DD'));
          }}
          {...virtualizedListProps}
        />
      </View>
    );
  }
}
