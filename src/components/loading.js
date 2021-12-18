import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const Loader = ({message}) => {
  return (
    <View style={styles.loading}>
      <View style={styles.overlaybox}>
        <ActivityIndicator size={45} color="#000" style={{marginLeft: 20}} />
        <Text
          style={{
            color: '#000',
            fontSize: 17,
            alignSelf: 'center',
            marginLeft: 20,
          }}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlaybox: {
    backgroundColor: '#FFF',
    width: '85%',
    height: 80,
    borderRadius: 5,
    flexDirection: 'row',
    textAlign: 'center',
    zIndex:9,
  },
  loading: {
    position: 'absolute',
    zIndex:1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00000088',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
