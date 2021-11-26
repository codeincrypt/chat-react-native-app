import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fontFamilyBold} from '../../constant/fonts';

const ChatCompList = ({item, onPress}) => {
  console.log('item', item)
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={{flexDirection: 'row', marginTop: 18, paddingHorizontal: 15}}>
      <View style={{flex: 2}}>
        <View style={styles.rounded}>
          <Text
            style={{fontSize: 20, fontFamily: fontFamilyBold, color: '#FFF'}}
            >
            {item.userid}
          </Text>
        </View>
      </View>
      <View style={{flex: 8}}>
        <Text
          style={{fontSize: 16, color: '#000', fontFamily: fontFamilyBold, marginBottom: 4}}>
          {item.name}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rounded: {
    backgroundColor: '#16a085',
    height: 45,
    width: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default ChatCompList;
