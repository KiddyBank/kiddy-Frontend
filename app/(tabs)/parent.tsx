import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

export default function ParentScreen() {
    const router = useRouter();

    function toChild() {
        router.push('/')
    }

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>יתרות הילדים</Text>
        </View>
      <View style={styles.kidsContainer}>
        <View style={styles.kid}>
            <TouchableHighlight onPress={() => toChild()}>
                <Image style={styles.image} source={{
                uri:"https://www.lumosia.com/wp-content/uploads/2024/01/Child-Actor-Headshots-and-model-portfolios-139-768x1151.jpg",
                }}/>
            </TouchableHighlight>
            <View style={styles.kidDetails}>
                <Text style={styles.kidBalance}>1000</Text>
                <Text style={styles.kidName}>Liron's Balance</Text>
            </View>
        </View>

        <View style={styles.kid}>
            <TouchableHighlight onPress={() => toChild()}>
                <Image style={styles.image} source={{
                uri:"https://pauladeegan.co.uk/wp-content/uploads/2022/03/what-to-wear-for-kids-acting-headshots-banner.jpg",
                }}/>
            </TouchableHighlight>
            <View style={styles.kidDetails}>
                <Text style={styles.kidBalance}>500</Text>
                <Text style={styles.kidName}>Emma's Balance</Text>
            </View>
        </View>

        <View style={styles.kid}>
            <TouchableHighlight onPress={() => toChild()}>
                <Image style={styles.image} source={{
                uri:"https://images.squarespace-cdn.com/content/v1/6204821bfe06b76898b431c5/1679513348194-TS0BIMV5Z21XXU1T6H4N/AW5A4201.jpg",
                }}/>
            </TouchableHighlight>
            <View style={styles.kidDetails}>
                <Text style={styles.kidBalance}>500</Text>
                <Text style={styles.kidName}>George's Balance</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerContainer: {
    width: "100%",
    backgroundColor: '#3F51B5',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20
  },
  kidsContainer: {
    width: "100%",
  },
  kid: {
    display: "flex",
    flexDirection: "row-reverse",
    flex: 1,
    gap: 30,
    margin: 20
  },
  kidDetails: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  kidBalance: {
    fontSize: 40,
    fontWeight: "bold",
    color: '#3F51B5'
  },
  kidName: {
    fontWeight: "bold",
    color: '#3F51B5'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: "50%"
  }
});

