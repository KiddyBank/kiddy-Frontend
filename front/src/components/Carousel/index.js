/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';

export class Carousel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{width: '100%'}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

export default Carousel;
