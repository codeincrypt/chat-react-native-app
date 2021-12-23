import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ToastAndroid
} from 'react-native';
import {Avatar, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconButton from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'underscore';

import style from '../../style/style.js';

import io from 'socket.io-client/dist/socket.io';
import {WEBSOCKET} from '../../constant/config';
import {GET_CHATVIEW, sendMessage, getProfile} from '../redux/actions/request';
const socket = io(WEBSOCKET, {transports: ['websocket']}, {jsonp: false});
import Clipboard from '@react-native-community/clipboard';

const ViewChat = props => {
  const userdata = props.route.params.item;
  const myid = props.route.params.id;

  const [loading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chatlist, setChatlist] = useState([]);
  const [chatuser, setChatUser] = useState();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [profiledata, setProfile] = useState('');

  const todayDate = moment().format('DD MMM YYYY');
  const yesterdayDate = moment().subtract(1, 'day').format('DD MMM YYYY')

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      fetchChatList();
      fetchProfile();
    });
    fetchChatList();
    fetchProfile();
    socket.on('newmessage', data => {
      if (
        parseInt(myid) === parseInt(data.touser) &&
        parseInt(userdata.id) === parseInt(data.fromuser)
      ) {
        setChatlist(chatlist => [data, ...chatlist]);
      }
      setTyping(false);
    });
    socket.on('typing', data => { 
      console.log('touser', data.touser, myid)
      console.log('fromuser', data.fromuser, userdata.id)
      if (parseInt(data.touser) === parseInt(myid) && parseInt(data.fromuser) === parseInt(userdata.id) && data.typing === true) {
        typingRunningTimeout();
      } else {
        setTimeout(typingTimeout, 3000);
      }
    });
  }, []);

  // FETCH USER CHAT
  const fetchChatList = () => {
    GET_CHATVIEW(userdata.id).then(data => {
      setChatUser(data.chatuser);
      if(data.status === 'fail'){
        setChatlist([]);
      } else {
        setChatlist(data.message);
      }
    });
  };

  const fetchProfile = () => {
    getProfile().then(data => {
      setProfile(data);
    });
  };

  const typingTimeout = () => {
    setTyping(false);
  };

  const typingRunningTimeout = () => {
    setTyping(true);
  };

  const setMessageType = data => {
    setMessage(data);
    if (data.length > 1) {
      var info = {
        fromuser: myid,
        touser: userdata.id,
        typing: true,
      };
      socket.emit('typing', info);
    } else {
      var info = {
        fromuser: myid,
        touser: userdata.id,
        typing: false,
      };
      socket.emit('typing', info);
    }
  };

  const sendMsg = () => {
    const currentdate = moment().format('DD MMM YYYY');
    const currenttime = moment().format('hh:mm A');

    var message2 = message.replace(/^[ ]+/g, "");

    if (message2 === '') {
      return;
    }
    setSending(true);
    sendMessage(userdata.id, message2).then(data => {
      var info = {
        date: currentdate,
        fromuser: myid,
        id: 1,
        message: message2,
        status: 1,
        time: currenttime,
        touser: userdata.id,
      };

      socket.emit('sendmessage', info);
      setChatlist(chatlist => [info, ...chatlist]);
      setMessage('');
      setSending(false);
    });
  };

  const ItemList = ({item, index}) => {
    return (
      <View style={{paddingVertical: 5, paddingHorizontal: 15}}>
          {item.matched === true ? (
            <View style={{alignItems: 'center', padding: 10}}>
              <Text
                style={{
                  fontSize: 11,
                  color: '#000',
                  backgroundColor: '#EEE',
                  borderRadius: 20,
                  paddingHorizontal: 25,
                  paddingVertical: 4,
                }}>
                {item.date === todayDate ? "Today" : item.date === yesterdayDate ? "Yesterday" : item.date}
              </Text>
          </View>
          ) : (null)}
        <TouchableHighlight 
          underlayColor='rgba(73,182,17,1,0.5)'
          onPress={() => console.log('short-press', item.id)}
          onLongPress={e => copyToClipboard(item.message)}
          style={
            parseInt(item.touser) === parseInt(userdata.id)
              ? styles.mychatalign
              : styles.yourchatalign
          }>
          <View
            style={
              parseInt(item.touser) === parseInt(userdata.id)
                ? styles.mychat
                : styles.yourchat
            }>
            <Text style={
                parseInt(item.touser) === parseInt(userdata.id)
                  ? styles.mychatmessage
                  : styles.yourchatmessage
              }>{item.message}</Text>
            <Text
              style={
                parseInt(item.touser) === parseInt(userdata.id)
                  ? styles.mychattime
                  : styles.yourchattime
              }>
              {item.time}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  const copyToClipboard = text => {
    Clipboard.setString(text);
    ToastAndroid.show(`Message Copied`, ToastAndroid.LONG);
  };

  return (
    <>
      <SafeAreaView style={style.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content
            title={userdata.name}
            subtitle={typing === true ? `Typing...` : ``}
            titleStyle={style.leftheadertitle}
          />
          <Appbar.Action icon="dots-vertical" onPress={() => props.navigation.navigate('chatuser', {userprofile: userdata})} />
        </Appbar.Header>

        {Array.isArray(chatlist) && chatlist.length > 0 ? (
          <>
            <FlatList
              // style={{marginBottom: 20}}
              data={chatlist}
              renderItem={ItemList}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              inverted
            />
            {typing === true ? (
              <View style={styles.typing}>
                <Text style={styles.typingchat}>Typing...</Text>
              </View>
            ) : null}
          </>
        ) : (
          <ScrollView>
            
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
              placeholderTextColor="#AAA"
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
    paddingRight: 40,
    paddingLeft: 20,
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
    borderRadius: 15,
    backgroundColor: '#079992',
    color: '#FFF',
    fontSize: 16,
    maxWidth: '80%',
  },
  yourchat: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#DDD',
    color: '#000',
    fontSize: 16,
    maxWidth: '80%',
  },
  mychattime: {
    color: '#FFF',
    fontSize: 10,
    marginTop: 5,
    marginBottom: -5,
    alignSelf:'flex-end'
  },
  yourchattime: {
    color: '#000',
    fontSize: 10,
    marginTop: 5,
    marginBottom: -5,
    alignSelf:'flex-end'
  },
  mychatmessage: {
    color: '#FFF',
    fontSize: 16,
    // alignItems: 'flex-end'
  },
  yourchatmessage: {
    color: '#000',
    fontSize: 16,
    // alignItems: 'flex-end'
  },
  mychatalign: {alignItems: 'flex-end'},
  yourchatalign: {
    alignItems: 'flex-start',
  },
  typing: {
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingLeft: 15,
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
