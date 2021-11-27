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
import {Avatar, Button, TextInput, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconButton from 'react-native-vector-icons/FontAwesome';

import Bottom from '../navs/Bottom';
import style from '../../style/style.js';

import io from 'socket.io-client/dist/socket.io';
import {WEBSOCKET} from '../../constant/config';
import {GET_CHATVIEW, sendMessage} from '../redux/actions/request';
const socket = io(WEBSOCKET, {transports: ['websocket']}, {jsonp: false});

const ViewChat = props => {
  const userdata = props.route.params.item;
  const [loading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chatlist, setChatlist] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchChatList();
    console.log('socket', socket)
    socket.on('newmessage', data => {
      console.log('newmessage', data);
      setChatlist(chatlist => [...chatlist, data]);
    });

    var date = new Date().getHours();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    console.log(date + '-' + month + '-' + year)
  }, []);

  // FETCH USER CHAT
  const fetchChatList = () => {
    GET_CHATVIEW(userdata.id).then(data => {
      setChatlist(data.message);
    });
  };

  const sendMsg = () => {
    if (message === '') {
      return;
    }
    sendMessage(userdata.id, message).then(data => {
      var info = {
        date    : "27-11-2021",
        doc     : "2021-11-26T19:49:45.000Z",
        fromuser: "4",
        id      : '',
        message : message,
        status  : 1,
        time    : "01:19 am",
        touser  : userdata.id
      }
      
      socket.emit('newmessage', info)
      setChatlist(chatlist => [info, ...chatlist]);
    });
  };

  const ItemList = ({item, index}) => {
    return (
      <View style={{padding: 5}}>
        {String(item.touser) === String(userdata.id) ? (
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 30,
                backgroundColor: '#DDD',
                color: '#000',
                fontSize: 16,
              }}>
              {item.message}
            </Text>
          </View>
        ) : (
          <View style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 30,
                backgroundColor: '#E30047',
                color: '#fff',
                fontSize: 16,
              }}>
              {item.message}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={style.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content
            title={userdata.name}
            titleStyle={style.headertitle}
          />
        </Appbar.Header>

        <ScrollView style={{padding: 10}}>
          <FlatList
            style={{marginBottom: 60}}
            data={chatlist}
            renderItem={ItemList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </ScrollView>
        <View
          style={{
            position: 'relative',
            left: 0,
            right: 0,
            bottom: 0,
            // bottomTop: 200,
          }}>
          <View style={{flexDirection: 'row', padding:5}}>
            <View style={{flex: 8}}>
              <TextInput
                mode="outlined"
                placeholder="Message"
                style={style.inputBox}
                value={message}
                onChangeText={setMessage}
                theme={{colors: {primary: '#000'}}}
              />
            </View>
            <View style={{flex: 2, alignItems: 'center', alignSelf: 'center'}}>
              {/* <Button
                mode="contained"
                style={style.roundbtn}
                onPress={sendMsg}> */}
                  
                <IconButton onPress={sendMsg} name={'telegram'} size={40} color="#000" />
              {/* </Button> */}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

var styles = StyleSheet.create({});

export default ViewChat;
