import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Appbar, HelperText} from 'react-native-paper';

// const image = require('../../assets/no-internet.png');

const NoInternetConnection = () => {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {/* <Appbar style={styles.appbar}>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
      </Appbar> */}
      <View style={styles.nodata}>
        {/* <Image source={image} style={styles.nodataicon} /> */}
        <Text style={styles.nodataval}>No Internet !</Text>
        <HelperText
          type="info"
          style={{fontSize: 16, textAlign: 'center', width: '85%'}}>
          Please check your internet connection and Try again
        </HelperText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    paddingLeft: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 50,
  },
  nodata: {
    paddingTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodataicon: {
    width: '100%',
    height: 250,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  nodataval: {
    fontSize: 20,
    color: '#000',
    alignSelf: 'center',
  },
});

export default NoInternetConnection;
