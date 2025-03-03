import React, {Component, useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import {Images} from '@config/index';
import {useNavigation} from '@react-navigation/native';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  onLeftPress = () => {
    if (this.props.left === 'back' || this.props.left === 'close') {
      this.props.navigation.goBack();
    } else {
      typeof this.props.onLeftPress !== 'undefined' && this.props.onLeftPress();
    }
  };

  onRightPress = () => {
    if (this.props.right === 'more') {
      // this.props.navigation.navigate('more');
    } else {
      typeof this.props.onRightPress !== 'undefined' &&
        this.props.onRightPress();
    }
  };

  renderLeft = () => {
    if (this.props.left === 'title') {
      return <Text style={styles.titleLeft}>{this.props.contentLeft}</Text>;
    }
    if (this.props.left === 'back') {
      return (
        <Image
          style={[
            styles.back,
            this.props.backgroundColor === 'transparent'
              ? // eslint-disable-next-line react-native/no-inline-styles
                {tintColor: '#fff'}
              : null,
          ]}
          source={Images.ic_back}
        />
      );
    }
    if (this.props.left === 'close') {
      return (
        <Image
          style={[
            styles.back,
            this.props.backgroundColor === 'transparent'
              ? // eslint-disable-next-line react-native/no-inline-styles
                {tintColor: '#fff'}
              : null,
          ]}
          source={Images.ic_close}
        />
      );
    }
  };

  renderCenter = () => {
    if (this.props.renderCenter) {
      return this.props.renderCenter;
    }
    if (this.props.title === 'sub') {
      return (
        <View>
          <Text style={styles.subTitle}>{this.props.subTitle}</Text>
        </View>
      );
    }
    return <Text style={styles.title}>{this.props.contentTitle}</Text>;
  };

  renderRight = () => {
    if (this.props.right === 'title') {
      return <Text style={styles.titleRight}>{this.props.contentRight}</Text>;
    } else if (this.props.right === 'more') {
      return <Image source={Images.ic_more} style={styles.filter} />;
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.backgroundColor && {
            backgroundColor: this.props.backgroundColor,
          },
        ]}>
        <StatusBar
          barStyle={this.props.barStyle || 'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
          animated={true}
        />
        <View
          style={[
            styles.header,
            this.props.bottomBorderNone && styles.borderHeaderNone,
          ]}>
          <View style={styles.content}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.left, this.props.styleLeft]}
              onPress={() => this.onLeftPress()}>
              {this.renderLeft()}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.props.onCenterPress}
              style={[styles.center, this.props.styleCenter]}>
              {this.renderCenter()}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.right, this.props.styleRight]}
              onPress={() => this.onRightPress()}>
              {this.renderRight()}
            </TouchableOpacity>
          </View>
          {typeof this.props.renderCustom !== 'undefined' &&
            this.props.renderCustom()}
        </View>
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <Header {...props} navigation={navigation} />;
}
