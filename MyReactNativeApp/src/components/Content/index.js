import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {getHeight} from '@common/index';

export class Content extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

export default Content;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    paddingHorizontal: getHeight(15),
  },
});
