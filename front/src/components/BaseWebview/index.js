import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {Loading} from '../Loading';

import {
  ScreenHeight,
  ScreenWidth,
  openURL,
  openPhoneCall,
  openEmailApp,
} from '@common/index';
import {Config} from '@config';

export class BWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  //switch interface
  switchInterface = val => {
    switch (val.act) {
      case 'openURL':
        openURL(val.url);
        break;
      case 'call':
        openPhoneCall(val.phone);
        break;
      case 'email':
        openEmailApp(val.to);
        break;
      case 'cusHead':
        this.showDetail(val);
        break;
      case 'toast':
        Toast.show(val.content);
        break;
      case 'share':
        this.shareSocial(val);
        break;
      case 'back':
        this.props.navigation.goBack();
        break;
    }
  };

  showDetail = val => {
    this.props.navigation.push('Webview', {
      url: val.link,
      show_header: val.show_header,
    });
  };

  render() {
    let scriptImport = `
        var imported = document.createElement('script');
        imported.src = '${Config.url_js}${
      Config.environment !== 'dev' ? '' : `?time=${Date.now()}`
    }';
        document.head.appendChild(imported);true;`;
    let headersWeb = {
      'x-token': Config.access_token,
      'lang-code': Config.lang_code,
      'show-header': '1',
    };
    return (
      <>
        <Loading visible={this.state.isLoading} />
        <WebView
          style={{width: ScreenWidth, height: ScreenHeight}}
          originWhitelist={['*']}
          showsVerticalScrollIndicator={false}
          source={{uri: this.props.url + '/0', headers: headersWeb}}
          injectedJavaScript={scriptImport}
          javaScriptEnabled={true}
          onMessage={event => {
            this.switchInterface(JSON.parse(event.nativeEvent.data));
          }}
          onLoadEnd={() => {
            this.setState({isLoading: false});
          }}
        />
      </>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <BWebView {...props} navigation={navigation} />;
}
