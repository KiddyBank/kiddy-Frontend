import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export class Container extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
