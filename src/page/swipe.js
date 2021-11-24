import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Button} from 'react-native-paper';

const Slider = props => {
  return (
    <>
      <Swiper
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/image/icon1.jpg')}
            style={styles.images}
            resizeMode={'contain'}
          />
          <Text style={styles.title}>Chatapp</Text>
          <Text style={styles.text}>The World fastest message app</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/image/icon2.png')}
            style={styles.images}
            resizeMode={'contain'}
          />
          <Text style={styles.title}>Fast</Text>
          <Text style={styles.text}>
            Chatapp delivers faster message then other
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/image/icon3.png')}
            style={styles.images}
            resizeMode={'contain'}
          />
          <Text style={styles.title}>Free</Text>
          <Text style={styles.text}>Chatapp is free forever</Text>
        </View>
      </Swiper>
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <Button
          mode="contained"
          color="#000"
          style={styles.inputBtn}
          onPress={() => props.navigation.navigate('Login')}>
          Start Messaging
        </Button>
      </View>
    </>
  );
};

const {height, width} = Dimensions.get('screen');
const height_image = height * 0.5 * 0.9;
const width_image = height_image * 0.85;
const width_btn = width * 0.4;

var styles = StyleSheet.create({
  inputBtn: {
    marginTop: 10,
    padding: 7,
    borderRadius: 0,
  },
  dot: {
    backgroundColor: '#DDD',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 60,
  },
  slide: {
    marginTop: '50%',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  images: {
    height: 150,
    width: 150,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 23,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  text: {
    color: '#444',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default Slider;
