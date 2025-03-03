/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import {getHeight} from '@common/index';
import React, {createRef} from 'react';
import styles from './styles';

export default class ItemCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: new Animated.Value(0),
      showInput: false,
      heightLayout: getHeight(47),
      text: '',
    };
    this._showInput = this._showInput.bind(this);
    this.textInput = createRef();
  }

  componentDidMount() {
    this.keyboardEvents = Keyboard.addListener('keyboardDidHide', () => {
      this._showInput(false);
    });
  }

  componentWillUnmount() {
    this.keyboardEvents.remove();
  }

  /**
   * fn show input
   * @author DatTD
   */
  _showInput(val) {
    const {heightLayout} = this.state;
    let string = JSON.stringify(this.state.fade),
      number = parseInt(string, 10),
      value = number === 0 ? 1 : 0,
      duration =
        heightLayout === getHeight(47)
          ? 200
          : (heightLayout / getHeight(47)) * 200;

    Animated.timing(this.state.fade, {
      toValue: value,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    this.setState(
      {showInput: val === undefined ? !this.state.showInput : val},
      () => {
        if (this.state.showInput === true) {
          setTimeout(() => {
            this.textInput.focus();
          }, 250);
        }
      },
    );
  }

  render() {
    const {text, heightLayout} = this.state;
    const {icon, title, subTitle, changeText} = this.props;
    const wrapHeight = this.state.fade.interpolate({
      inputRange: [0, 0.33, 0.5, 1],
      outputRange: [0, heightLayout / 3, heightLayout / 2, heightLayout],
    });
    const reserveOpacity = this.state.fade.interpolate({
      inputRange: [0, 0.33, 0.5, 1],
      outputRange: [1, 0.5, 0.33, 0],
    });

    return (
      <View>
        <TouchableOpacity
          style={[styles.item, styles.itemBreak]}
          onPress={() => {
            this._showInput();
          }}>
          <Image style={styles.iconLeft} source={icon} />
          <Text style={styles.textCenter}>{title}</Text>

          <Animated.View style={[styles.itemRight, {opacity: reserveOpacity}]}>
            <Text
              numberOfLines={1}
              style={[styles.textRight, text !== '' && styles.textWidthRight]}>
              {text === '' ? subTitle : text}
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              height: wrapHeight,
              opacity: this.state.fade,
              width: '100%',
              overflow: 'hidden',
              marginTop: getHeight(10),
              marginBottom: getHeight(-20),
              backgroundColor: 'transparent',
            }}>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              style={styles.inputText}
              placeholder={subTitle}
              placeholderTextColor={'#383e42'}
              onChangeText={text => {
                this.setState({text});
                changeText(text);
              }}
              onContentSizeChange={event => {
                let changeHeight = event.nativeEvent.contentSize.height;
                if (changeHeight > getHeight(120)) {
                  this.setState({
                    heightLayout: getHeight(120),
                  });
                } else if (changeHeight > getHeight(47)) {
                  this.setState({
                    heightLayout: changeHeight,
                  });
                }
              }}
              {...this.props}
              multiline
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}
