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
  TextInput,
} from 'react-native';
import {Avatar, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconButton from 'react-native-vector-icons/FontAwesome';

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
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    fetchChatList();
    socket.on('newmessage', data => {
      console.log('newmessage', data);
      setChatlist(chatlist => [...chatlist, data]);
    });

    socket.on('typing', data => {
      console.log('typing', data);
      if (data.touser === '4' && data.typing === true) {
        typingRunningTimeout()
      } else {
        setTimeout(typingTimeout, 3000)
      }
    });

    var date = new Date().getHours();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    console.log(date + '-' + month + '-' + year);
  }, []);

  // FETCH USER CHAT
  const fetchChatList = () => {
    GET_CHATVIEW(userdata.id).then(data => {
      setChatlist(data.message);
    });
  };

  const typingTimeout = () => {
    setTyping(false);
  }

  const typingRunningTimeout = () => {
    setTyping(true);
  }

  const setMessageType = data => {
    setMessage(data);
    if(data.length > 1){
      var info = {
        fromuser: '4',
        touser: userdata.id,
        typing : true
      };
      socket.emit('typing', info);
    }
    else {
      var info = {
        fromuser: '4',
        touser: userdata.id,
        typing : false
      };
      socket.emit('typing', info);
    }
  };

  const sendMsg = () => {
    if (message === '') {
      return;
    }
    setSending(true);
    sendMessage(userdata.id, message).then(data => {
      var info = {
        date: '27-11-2021',
        fromuser: '4',
        id: '',
        message: message,
        status: 1,
        time: '01:19 am',
        touser: userdata.id,
      };

      socket.emit('newmessage', info);
      setChatlist(chatlist => [...chatlist, info]);
      setMessage('');
      setSending(false);
    });
  };

  const ItemList = ({item, index}) => {
    return (
      <View style={{paddingVertical: 5, paddingHorizontal:15}}>
        <View
          style={
            String(item.touser) === String(userdata.id)
              ? styles.mychatalign
              : styles.yourchatalign
          }>
          <Text
            style={
              String(item.touser) === String(userdata.id)
                ? styles.mychat
                : styles.yourchat
            }>
            {item.message}
          </Text>
        </View>
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

        {Array.isArray(chatlist) && chatlist.length > 0 ? (
          <>
          <FlatList
            // style={{marginBottom: 20}}
            data={chatlist}
            renderItem={ItemList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            vertical="true"
          />
          {typing === true ? (
            <View style={styles.typing}>
              <Text style={styles.typingchat}>Typing...</Text>
            </View>
          ) : null}
        </>
          ) : (
            <ScrollView>
              {/* <Text> No Data </Text> */}
            </ScrollView>
          )}
        
        <View style={{position: 'relative', left: 0, right: 0, bottom: 0}}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <TextInput
              mode="outlined"
              multiline={true}
              placeholder="Message"
              style={styles.inputBox}
              value={message}
              onChangeText={setMessageType}
              theme={{colors: {primary: '#000'}}}
            />
            <View style={styles.floatbtn}>
              {sending === true ? (
                <IconButton name={'telegram'} size={40} color="red" />
              ) : (
                <IconButton
                  onPress={sendMsg}
                  name={'telegram'}
                  size={40}
                  color="#000"
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

var styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    padding: 10,
    paddingRight: 30,
    borderRadius: 50,
    borderColor: 'transparent',
    backgroundColor: '#EDEDED',
    color: '#000',
    width: '100%',
  },
  floatbtn: {
    alignItems: 'flex-end',
    position: 'absolute',
    zIndex: 99,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    right: 15,
    top: 10,
  },
  mychat: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: '#E30047',
    color: '#fff',
    fontSize: 16,
    maxWidth: '80%',
  },
  yourchat: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: '#DDD',
    color: '#000',
    fontSize: 16,
    maxWidth: '80%',
  },
  mychatalign: {alignItems: 'flex-end'},
  yourchatalign: {
    alignItems: 'flex-start',
  },
  typing: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  typingchat: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: '#DDD',
    color: '#000',
    fontSize: 16,
  },
});

export default ViewChat;
