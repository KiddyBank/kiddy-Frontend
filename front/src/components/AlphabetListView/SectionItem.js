import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {openPhoneCall, openEmailApp} from '@common/index';
import {Images} from '@config/index';
import styles from './styles';

export default function SectionItem(props) {
  const SectionItem = props.component;
  const {element, sectionItemHeight} = props;
  const content = SectionItem ? (
    <SectionItem {...props} />
  ) : (
    <View
      style={[styles.item, sectionItemHeight && {height: sectionItemHeight}]}>
      <View style={styles.wrapAvatar}>
        <Image style={styles.avatar} source={element.avatar} />
      </View>
      <View style={styles.info}>
        <Text style={styles.fullName}>{element.name}</Text>
        <Text style={styles.position}>{element.position}</Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.buttonEmail}
          onPress={() => openEmailApp('duckh@apecsoft.asia')}>
          <Image style={styles.iconEmail} source={Images.ic_email} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonEmail}
          onPress={() => openPhoneCall('0932345678')}>
          <Image style={styles.iconPhone} source={Images.ic_phone} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return <View>{content}</View>;
}
