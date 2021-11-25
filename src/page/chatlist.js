import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Appbar} from 'react-native-paper';
import Bottom from '../navs/Bottom';
import style from '../../style/style.js'

const ChatList = props => {
  return (
    <>
    {/* <SafeAreaView style={styles.body}>
      <Appbar.Header style={style.header}>
          <Appbar.Content
            title="Your Phone"
            titleStyle={style.headertitle}
          />
        </Appbar.Header>
        </SafeAreaView> */}
        <ScrollView>

        </ScrollView>
        <Bottom props={props}></Bottom>
    </>
  );
};

const {height, width} = Dimensions.get('screen');
const height_image = height * 0.5 * 0.9;
const width_image = height_image * 0.85;
const width_btn = width * 0.4;

var styles = StyleSheet.create({
});

export default ChatList;
