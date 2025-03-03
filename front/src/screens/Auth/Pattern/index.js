/* eslint-disable react-native/no-inline-styles */
/*
 *
 * @author DatTD
 * Created on Wed Jul 15 2020
 * Copyright (c) 2020 ApecSoft
 *
 */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Keyboard} from 'react-native';
import {Content, Container} from '@components/index';
import Toast from 'react-native-simple-toast';
import styles from './styles';

export default function Pattern(props) {
  const [code, setCode] = useState();
  /**
   * constructor data
   * @author TienTD
   */
  useEffect(() => {
    _getData();
  }, []);

  /**
   * fn get data
   * @author DatTD
   */
  var _getData = async () => {
    let dataInfo;
    let result = await auth.faceIdFailed();
    console.log('result', result);
    if (result.data.code === 200) {
      dataInfo = result.data.data.checkin_code;
      setCode(dataInfo);
    } else {
      Toast.show(result.data.message);
    }
  };
  return (
    <Container>
      <Content>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => Keyboard.dismiss()}
          activeOpacity={1}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Hệ thống không thể quét FaceID của bạn
            </Text>
            <Text style={styles.description}>
              Nhập mã xác minh bên dưới để check-in
            </Text>
          </View>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}
