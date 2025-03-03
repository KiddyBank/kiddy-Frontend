import React, {Component, useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import {Images} from '@config/index';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function Notify({hasNotify}) {
  let [notify, setNotify] = useState(true);
  useEffect(() => {
    setNotify(hasNotify);
  }, [hasNotify]);

  return (
    <View style={styles.notifyView}>
      <Image style={styles.notify} source={Images.ic_notification} />
      {notify ? <View style={styles.hasNotify} /> : null}
    </View>
  );
}

function More({hasNotifyMore, question}) {
  let [notify, setNotify] = useState(true);
  useEffect(() => {
    setNotify(hasNotifyMore);
  }, [hasNotifyMore]);

  return (
    <View style={styles.rightAction}>
      {question && (
        <TouchableOpacity
          style={styles.notifyView}
          onPress={() => {
            // this.props.navigation.navigate('more');
          }}>
          <Image style={styles.question} source={Images.ic_question} />
        </TouchableOpacity>
      )}

      <View style={styles.notifyView}>
        <Image style={styles.more} source={Images.ic_more_square} />
        {notify ? <View style={styles.hasNotifyMore} /> : null}
      </View>
    </View>
  );
}

export class LinearHeader extends Component {
  constructor(props) {
    super(props);
  }

  onLeftPress = () => {
    if (this.props.left === 'back' || this.props.left === 'close') {
      this.props.navigation.goBack();
    } else if (this.props.left === 'welcome') {
      // this.props.navigation.goBack('profile');
    } else {
      typeof this.props.onLeftPress !== 'undefined' && this.props.onLeftPress();
    }
  };

  onRightPress = () => {
    if (this.props.right === 'notify') {
      this.props.navigation.navigate('Notification');
    } else if (this.props.right === 'more') {
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
    if (this.props.left === 'welcome') {
      return (
        <View style={styles.welcome}>
          <Image
            style={styles.welcomeImage}
            source={Images.ic_person_thumbnail}
          />
          <Text style={styles.welcomeText}> Welcome, </Text>
          <Text style={[styles.welcomeText, styles.welcomeBold]}>Tony</Text>
        </View>
      );
    }
  };

  renderCenter = () => {
    if (this.props.renderCenter) {
      return this.props.renderCenter;
    }
    return <Text style={styles.title}>{this.props.contentTitle}</Text>;
  };

  renderRight = () => {
    if (this.props.right === 'title') {
      return <Text style={styles.titleRight}>{this.props.contentRight}</Text>;
    } else if (this.props.right === 'notify') {
      return <Notify hasNotify={this.props.hasNotify} />;
    } else if (this.props.right === 'more') {
      return (
        <More
          hasNotifyMore={this.props.hasNotifyMore}
          question={this.props.question}
        />
      );
    }
  };

  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#e99d23', '#e18628', '#d76f2c']}
        style={styles.linearGradient}>
        <View
          style={[
            styles.container,
            this.props.styleContainer,
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
              this.props.bottomBorderNone ? styles.borderHeaderNone : null,
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
      </LinearGradient>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <LinearHeader {...props} navigation={navigation} />;
}
