import {
  Screen,
  ScreenHeight,
  ScreenWidth,
  getHeight,
  getWidth,
  getStatusBarHeight,
  normalize,
  hasNotch,
  isIPhoneSE,
  isIPhoneX,
  isIPhoneXr,
  isIPhoneXs,
  isIPhoneXsMax,
  parseUrl,
  openEmailApp,
  openPhoneCall,
  openURL,
  isLogin,
  isTeacher,
} from './Helper';
import {Request} from './Request';
import {Style, Colors, fontFamily} from './Style';
import {Images} from '../config';
import {Api} from './Api';
import {
  getKeys,
  getAllStorage,
  getStorage,
  setStorage,
  getMultiStorage,
  setMultiStorage,
  removeItemStorage,
  removeMultiStorage,
  clearStorage,
} from './Storage';

import {
  showErrorField,
  validateForm,
  validateItem,
  checkEmpty,
  minLength,
  maxLength,
  checkMail,
  checkPhone,
  cleanObject,
} from './Validation';

export {
  // Import from Helper
  Screen,
  ScreenHeight,
  ScreenWidth,
  getHeight,
  getWidth,
  getStatusBarHeight,
  normalize,
  hasNotch,
  isIPhoneSE,
  isIPhoneX,
  isIPhoneXr,
  isIPhoneXs,
  isIPhoneXsMax,
  parseUrl,
  openEmailApp,
  openPhoneCall,
  openURL,
  isLogin,
  isTeacher,
  // import style, image
  Style,
  Colors,
  Images,
  fontFamily,
  // import axios
  Request,
  Api,
  // import Storage
  getKeys,
  getAllStorage,
  getStorage,
  setStorage,
  getMultiStorage,
  setMultiStorage,
  removeItemStorage,
  removeMultiStorage,
  clearStorage,
  //Validation
  showErrorField,
  validateForm,
  validateItem,
  checkEmpty,
  minLength,
  maxLength,
  checkMail,
  checkPhone,
  cleanObject,
};
