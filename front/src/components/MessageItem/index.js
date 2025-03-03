/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Style, fontFamily} from '@common/index';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.item, this.props.keyItem === 0 && styles.itemActive]}
        disabled={this.props.disabled}
        onPress={() => {
          typeof this.props.onPress !== 'undefined' && this.props.onPress();
        }}>
        <View style={styles.itemTop}>
          <View style={styles.itemAvatar}>
            <Image style={styles.itemImage} source={this.props.avatar} />
            {this.props.activeAvatar && <View style={styles.activeAvatar} />}
          </View>
          <View style={styles.itemTopContent}>
            <View style={Style.spaceBetween}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemParent} numberOfLines={1}>
                  {this.props.parent}
                </Text>
                <Text style={styles.itemChild} numberOfLines={1}>
                  Phụ huynh bé:{' '}
                  <Text
                    style={{
                      fontFamily: fontFamily.f2,
                    }}>
                    {Array.isArray(this.props.children)
                      ? this.props.children.join(', ')
                      : this.props.children}
                  </Text>
                </Text>
              </View>
              <Text style={styles.itemTime}>
                {moment(this.props.time).isSame(moment(), 'days')
                  ? moment(this.props.time).format('HH:MM')
                  : moment(this.props.time).format('DD/MM/YYYY')}
              </Text>
            </View>
            {this.props.position == 'chatItem' && (
              <Text style={styles.itemChatContent} numberOfLines={1}>
                {this.props.message}
              </Text>
            )}
          </View>
        </View>
        {this.props.position != 'chatItem' && (
          <View style={styles.itemBody}>
            <Text style={styles.itemMessage}>{this.props.message}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <MessageItem {...props} navigation={navigation} />;
}
