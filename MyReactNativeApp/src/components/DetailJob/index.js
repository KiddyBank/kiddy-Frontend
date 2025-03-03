/**
 * @author TienTD
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from './styles';
import {Images} from '@config';
export default class Detail_Job extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {this.props.data &&
              this.props.data.map((val, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => this.props.onPress(val.key)}>
                    <View style={styles.select}>
                      <View style={styles.title}>
                        <View style={styles.textIcon}>
                          <View style={styles.Icon}>
                            <Image style={styles.iconTitle} source={val.icon} />
                          </View>
                          <Text style={styles.company}>{val.title}</Text>
                        </View>
                        <Text style={styles.companyName}>{val.detail}</Text>
                      </View>
                      <View style={styles.arrow}>
                        <Image
                          style={[
                            styles.arrowRight,
                            val.type === 'input' && styles.noButton,
                          ]}
                          source={Images.News.ic_arrow_right}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </>
    );
  }
}
