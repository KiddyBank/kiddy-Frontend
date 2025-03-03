/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Modal, StatusBar} from 'react-native';
import {styles} from './styles';

export default class ModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }

  changeModal() {
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="rgba(0,0,0,0.5)"
          hidden={true}
          translucent={true}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
          style={[styles.wrapModal, this.props.styleWrap]}>
          <TouchableOpacity
            style={styles.modal}
            onPress={() => {
              this.changeModal();
            }}>
            <View style={[styles.modalContent, this.props.styleContent]}>
              <View style={styles.children}>{this.props.children}</View>
              <View style={styles.groupButton}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.props.onPressLeft();
                      this.changeModal();
                    }}>
                    <Text style={styles.buttonText}>
                      {this.props.buttonLeftContent}
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.props.buttonRightContent && (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.props.onPressRight();
                        this.changeModal();
                      }}>
                      <Text
                        style={[
                          styles.buttonText,
                          styles.textBold,
                          this.props.styleBtnRight,
                        ]}>
                        {this.props.buttonRightContent}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
