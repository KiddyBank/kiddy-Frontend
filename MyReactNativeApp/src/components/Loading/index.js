import React, {Component} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {Colors, ScreenHeight, ScreenWidth} from '@common/index';

export class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (state.visible !== props.visible) newState.visible = props.visible;
    return newState;
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={this.state.visible}>
        <View style={styles.container}>
          <DotIndicator color={Colors.c1} count={4} size={14} />
        </View>
      </Modal>
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
