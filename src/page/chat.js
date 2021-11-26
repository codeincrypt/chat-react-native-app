import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Bottom from '../navs/Bottom';
import style from '../../style/style.js';

import io from 'socket.io-client/dist/socket.io';
import {WEBSOCKET} from '../../constant/config';
const socket = io(WEBSOCKET, {transports: ['websocket']}, {jsonp: false});

const ChatList = props => {
  const item = props.route.params.item;
  const [loading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chatlist, setChatlist] = useState('');

  useEffect(() => {
    fetchChatList();
  }, [])

  
  // FETCH USER CHAT
  const fetchChatList = () => {
    socket.on('newmessage', data => {
      // fetchOrderList();
      console.log('data', data);
    });

  }

  return (
    <>
      <SafeAreaView style={styles.body}>
        <Appbar.Header style={style.header}>
          <Appbar.Content title="Your Phone" titleStyle={style.headertitle} />
        </Appbar.Header>

        <ScrollView>
          <FlatList
            style={{marginBottom: 60}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={chatlist}
            renderItem={ItemList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </ScrollView>
        <Bottom props={props}></Bottom>
      </SafeAreaView>
    </>
  );
};

var styles = StyleSheet.create({});

export default ChatList;