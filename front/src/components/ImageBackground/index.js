/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScreenHeight, ScreenWidth} from '@common/Helper';
import {Images} from '@config/Images';
import {ImageBackground} from 'react-native';

const BackGroundKid = props => {
  return (
    <ImageBackground
      style={{
        flex: 1,
        width: ScreenWidth,
        height: ScreenHeight,
        resizeMode: 'center',
      }}
      source={Images.home.background}>
      {props.children}
    </ImageBackground>
  );
};

export default BackGroundKid;
