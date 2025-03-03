/**
 * All common function
 * @author dattd
 * @since 2020
 * @version 1.0.0
 */

import {
  Platform,
  StatusBar,
  Dimensions,
  Linking,
  PixelRatio,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Config} from '@config/index';

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const iPhoneX_HEIGHT = 812;
const iPhoneXr_HEIGHT = 896;
const iPhoneXs_HEIGHT = 896;
const iPhoneXsMax_HEIGHT = 896;
const iPhoneSE_HEIGHT = 568;
const pixelRatio = PixelRatio.get();
export const Screen = Dimensions.get('window');
export const ScreenWidth = Screen.width;
export const ScreenHeight = Screen.height;

export function getWidth(width) {
  return widthPercentageToDP((width / guidelineBaseWidth) * 100);
}

export function getHeight(height) {
  return heightPercentageToDP((height / guidelineBaseHeight) * 100);
}

export function normalize(size) {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (ScreenWidth < 360) {
      return size * 0.95;
    }

    // iphone 5
    if (ScreenWidth < 667) {
      return size;
      // iphone 6-6s
    }

    if (ScreenHeight >= 667 && ScreenHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }

  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (ScreenWidth <= 360) {
      return size;
    }

    // Catch other weird android width sizings
    if (ScreenHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (ScreenHeight >= 667 && ScreenHeight <= 735) {
      return size * 1.2;
    }

    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }

  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (ScreenWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }

    if (ScreenHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (ScreenHeight >= 667 && ScreenHeight <= 735) {
      return size * 1.25;
    }

    // catch larger phablet devices
    return size * 1.4;
  }

  return size;
}

export function hasNotch() {
  return detection();
}

export function isIPhoneSE(dim) {
  return dim.height === iPhoneSE_HEIGHT;
}

export function isIPhoneX(dim) {
  return dim.height === iPhoneX_HEIGHT;
}

export function isIPhoneXs(dim) {
  return dim.height === iPhoneXs_HEIGHT;
}

export function isIPhoneXsMax(dim) {
  return dim.height === iPhoneXsMax_HEIGHT;
}

export function isIPhoneXr(dim) {
  return dim.height === iPhoneXr_HEIGHT;
}

export function getStatusBarHeight() {
  return Platform.select({
    ios: hasNotch() ? 44 : 30,
    android: StatusBar.currentHeight,
  });
}

export function parseUrl(url) {
  var match = url.match(
    // eslint-disable-next-line no-useless-escape
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
  );
  return (
    match && {
      href: url,
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7],
    }
  );
}

export function openURL(url) {
  Linking.openURL(url);
}

export function openPhoneCall(phone) {
  let phoneCall = Platform.OS === 'ios' ? 'telprompt:' + phone : 'tel:' + phone;
  Linking.openURL(phoneCall);
}

export function openEmailApp(email) {
  let emailTo = 'mailto:' + email;
  Linking.openURL(emailTo);
}

export function isLogin() {
  return Number.parseInt(Config.is_login, 10) === 1;
}

function detection() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (isIPhoneX(Screen) ||
      isIPhoneXr(Screen) ||
      isIPhoneXs(Screen) ||
      isIPhoneXsMax(Screen))
  );
}
