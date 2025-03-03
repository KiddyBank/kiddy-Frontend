/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

class BillItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.BillItem}
        onPress={() =>
          this.props.navigation.navigate('BillDetails', {
            student_id: this.props.student_id,
            invoice_id: this.props.invoice_id,
          })
        }
        disabled={this.props.disabled}>
        <View style={styles.BillItemLeft}>
          <Text style={styles.BillItemTime}>{this.props.time}</Text>
        </View>
        <View style={styles.BillItemRight}>
          <Text style={styles.BillItemText1}>
            {this.props.text1}{' '}
            {this.props.invoice_id && (
              <Text style={{textDecorationLine: 'underline'}}>đ</Text>
            )}
          </Text>
          <Text style={styles.BillItemText2}>{this.props.text2}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <BillItem {...props} navigation={navigation} />;
}
