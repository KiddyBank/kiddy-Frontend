import React from 'react';
import {Text} from 'react-native';
import {lang} from '@assets/language/i18n';
import {Style} from './Style';

export function showErrorField(text) {
  if (text) {
    return <Text style={Style.validationText}>{text}</Text>;
  } else {
    return null;
  }
}

export function validateForm(rules) {
  let errors = {};
  rules.map(val => {
    errors[val.key] = validateItem(val.value, val.rules, val.label);
  });
  cleanObject(errors);
  return errors;
}

function validateItem(value, rules, label) {
  if (rules.length > 0) {
    let arrExp = rules.split('|');
    let error = '';
    for (var i = 0; i < arrExp.length; i++) {
      let elm, params, key, vParam;
      // tách phần tử để lấy tham số truyền vào
      elm = arrExp[i].split('[');
      if (elm.length > 1) {
        params = elm[1].split(']');
        vParam = params[0];
      }
      key = elm[0];
      switch (key) {
        case 'required':
          error = checkEmpty(value, label);
          break;
        case 'min_length':
          error = minLength(value, vParam, label);
          break;
        case 'max_length':
          error = maxLength(value, vParam, label);
          break;
        case 'email':
          error = checkMail(value, label);
          break;
        case 'phone':
          error = checkPhone(value, label);
          break;
        case 'match':
          error = checkConfirmPassword(value, vParam, label);
          break;
        default:
          break;
      }
      if (error !== true) break;
    }
    return error;
  }
  return;
}

function checkEmpty(val, label) {
  if (val === '') {
    let name = label + ' ' + lang('not_empty');
    return name;
  }
  return true;
}

function minLength(val, length, label) {
  if (val != '' && val.length < length) {
    let name =
      label + ' ' + lang('khongdcnhohon') + ' ' + length + ' ' + lang('char');
    return name;
  }
  return true;
}

function maxLength(val, length, label) {
  if (val !== '' && val.length > length) {
    let name =
      label + ' ' + lang('khongdclh') + ' ' + length + ' ' + lang('char');
    return name;
  }
  return true;
}

function checkConfirmPassword(value, check_value, label) {
  if (
    value !== '' &&
    check_value !== '' &&
    value.trim() !== check_value.trim()
  ) {
    let name = label + ' ' + lang('not_match');
    return name;
  }
  return true;
}

function checkMail(val, label) {
  if (val !== '') {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let is_email = regex.test(val);
    if (!is_email) {
      let name = label + ' ' + lang('dinhdang');
      return name;
    }
  }

  return true;
}

function checkPhone(val, label) {
  if (val !== '') {
    let regex = /((09|03|07|08|05)+([0-9]{8})\b)/;
    let is_phone = regex.test(val);
    if (!is_phone) {
      let name = label + ' ' + lang('illegal');
      return name;
    }
  }
  return true;
}

export function cleanObject(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === true
    ) {
      delete obj[propName];
    }
  }
  return obj;
}
