/* eslint-disable react-native/no-inline-styles */
/**
 * @author TienTD
 */
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

export default class LinearButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ['#e99d23', '#d76f2c'],
      indicator: true,
    };
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    if (nextProps.colors !== currentState.color) {
      return {color: nextProps.colors};
    }
    return null;
  }

  _changeIndicator(value) {
    value && this.setState({indicator: value});
    this.setState({indicator: !this.state.indicator});
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={this.state.indicator === false && {opacity: 0.9}}>
        <LinearGradient
          useAngle={true}
          angle={90}
          colors={this.state.color}
          style={[styles.linearGradient, this.props.style]}>
          {this.state.indicator === true ? (
            <Text style={[styles.buttonText, this.props.textStyle]}>
              {this.props.text}
            </Text>
          ) : (
            <ActivityIndicator
              style={styles.indicator}
              size="small"
              color="#fff"
            />
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
