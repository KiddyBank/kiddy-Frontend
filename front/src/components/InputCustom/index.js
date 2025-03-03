import {View, TextInput, Image, Text, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import {showErrorField} from '@common';

export default class InputCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clear: this.props.value !== '' ? true : false,
      value: '',
      error: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.error !== prevState.error) {
      return {error: nextProps.error};
    }
    return null;
  }

  renderPrepend = () => {
    if (this.props.prependType === 'icon') {
      return (
        <TouchableOpacity
          style={styles.prependView}
          onPress={this.props.onPrependPress}>
          <Image style={styles.icon} source={this.props.iconPrepend} />
        </TouchableOpacity>
      );
    }
  };

  renderAppend = () => {
    if (this.props.appendType === 'icon') {
      return (
        <TouchableOpacity
          style={styles.appendView}
          onPress={this.props.onAppendPress}>
          <Image style={styles.icon} source={this.props.iconAppend} />
        </TouchableOpacity>
      );
    }
  };

  renderLabel() {
    return this.props.label ? (
      <Text style={styles.label}>{this.props.label}</Text>
    ) : null;
  }

  render() {
    return (
      <>
        {this.renderLabel()}
        <View style={[styles.formGroup, this.props.styleGroup]}>
          <View>
            {this.renderPrepend()}
            <TextInput
              style={[styles.input, this.props.styleInput]}
              placeholderStyle={styles.placeholder}
              placeholderTextColor={'rgba(84, 92, 95, 0.7)'}
              {...this.props}
            />
            {this.renderAppend()}
          </View>
          {this.state.error && showErrorField(this.state.error)}
        </View>
      </>
    );
  }
}
