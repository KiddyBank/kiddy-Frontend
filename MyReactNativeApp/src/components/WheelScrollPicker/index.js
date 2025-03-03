/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components';
import {
  View,
  ScrollView,
  Dimensions,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getHeight, getWidth, fontFamily} from '@common/index';

const Container = styled.View`
  height: ${props => props.wrapperHeight}px;
  overflow: hidden;
  align-self: center;
  width: ${props => props.wrapperWidth}px;
  background-color: ${props => props.wrapperBackground};
`;
export const HighLightView = styled.View`
  position: absolute;
  top: ${props => (props.wrapperHeight - props.itemHeight) / 2}px;
  height: ${props => props.itemHeight}px;
  width: ${props => props.highlightWidth}px;
  border-top-color: ${props => props.highlightColor};
  border-bottom-color: ${props => props.highlightColor};
  border-top-width: ${props => props.highlightBorderWidth}px;
  border-bottom-width: ${props => props.highlightBorderWidth}px;
`;
export const SelectedItem = styled.View`
  justify-content: center;
  align-items: center;
  height: ${props => props.itemHeight}px;
`;
export const ItemText = styled.Text`
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  line-height: ${props => props.lineHeight}px;
  text-align: center;
`;
const deviceWidth = Dimensions.get('window').width;
export default class ScrollPicker extends React.Component {
  constructor() {
    super();
    this.onMomentumScrollBegin = this.onMomentumScrollBegin.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    if (this.props.selectedIndex) {
      setTimeout(() => {
        this.scrollToIndex(this.props.selectedIndex);
      }, 0);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const {header, footer} = this.renderPlaceHolder();
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.cancel}>
            <Text style={styles.textLeftRight}>Hủy</Text>
          </TouchableOpacity>
          <Text style={styles.textCenter}> {this.props.textHeaderCenter}</Text>
          <TouchableOpacity onPress={this.props.save}>
            <Text style={styles.textLeftRight}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <Container
          wrapperHeight={this.props.wrapperHeight}
          wrapperWidth={this.props.wrapperWidth}
          wrapperBackground={this.props.wrapperBackground}>
          <HighLightView
            highlightColor={this.props.highlightColor}
            highlightWidth={this.props.highlightWidth}
            wrapperHeight={this.props.wrapperHeight}
            itemHeight={this.props.itemHeight}
            highlightBorderWidth={this.props.highlightBorderWidth}
          />
          <ScrollView
            ref={sview => {
              this.sview = sview;
            }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            onTouchStart={this.props.onTouchStart}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            onScrollBeginDrag={this.onScrollBeginDrag}
            onScrollEndDrag={this.onScrollEndDrag}>
            {header}
            {this.props.dataSource.map(this.renderItem.bind(this))}
            {footer}
          </ScrollView>
        </Container>
      </View>
    );
  }

  renderPlaceHolder() {
    const height = (this.props.wrapperHeight - this.props.itemHeight) / 2;
    const header = <View style={{height, flex: 1}} />;
    const footer = <View style={{height, flex: 1}} />;
    return {header, footer};
  }

  renderItem(data, index) {
    const isSelected = index === this.state.selectedIndex;
    const {fontSize, lineHeight, displayField} = this.props;

    // Render a custom property of an object
    let display = data;
    if (
      displayField !== undefined &&
      data.hasOwnProperty(displayField) === true
    ) {
      display = data[displayField];
    }

    const item = (
      <ItemText
        fontSize={fontSize}
        lineHeight={lineHeight}
        color={isSelected ? this.props.activeItemColor : this.props.itemColor}>
        {display}
      </ItemText>
    );

    return (
      <SelectedItem key={index} itemHeight={this.props.itemHeight}>
        {item}
      </SelectedItem>
    );
  }

  scrollFix(e) {
    let verticalY = 0;
    const h = this.props.itemHeight;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    const selectedIndex = Math.round(verticalY / h);
    const verticalElem = selectedIndex * h;
    if (verticalElem !== verticalY) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      this.sview.scrollTo({y: verticalElem});
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    this.setState({
      selectedIndex,
    });
    // onValueChange
    if (this.props.onValueChange) {
      const selectedValue = this.props.dataSource[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  }
  onScrollBeginDrag() {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  onScrollEndDrag(e) {
    this.props.onScrollEndDrag();
    this.dragStarted = false;
    // if not used, event will be garbaged
    const element = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this.scrollFix(element, 'timeout');
      }
    }, 10);
  }
  onMomentumScrollBegin() {
    this.momentumStarted = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  onMomentumScrollEnd(e) {
    this.props.onMomentumScrollEnd();
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this.scrollFix(e);
    }
  }

  scrollToIndex(ind) {
    this.setState({
      selectedIndex: ind,
    });
    const y = this.props.itemHeight * ind;
    this.sview.scrollTo({y});
  }
}
ScrollPicker.defaultProps = {
  textHeaderCenter: '',
  cancel: false,
  save: false,
  dataSource: [1, 2, 3],
  fontSize: 20,
  lineHeight: 26,
  itemHeight: 60,
  wrapperBackground: '#FFFFFF',
  wrapperHeight: 180,
  wrapperWidth: 150,
  highlightWidth: deviceWidth,
  highlightBorderWidth: 2,
  highlightColor: '#333',
  activeItemColor: '#222121',
  itemColor: '#B4B4B4',
  onMomentumScrollEnd: () => {},
  onScrollEndDrag: () => {},
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: getWidth(10),
    borderTopRightRadius: getWidth(10),
    padding: getWidth(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLeftRight: {
    fontSize: getHeight(17.13),
    fontFamily: fontFamily.f1,
    color: '#ffa901',
  },
  textCenter: {
    fontSize: getHeight(17.13),
    fontFamily: fontFamily.f1,
    color: '#343844',
  },
});
