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
  Linking,
  ToastAndroid,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'underscore';
import Bottom from '../navs/Bottom';
import style from '../../style/style.js';

import io from 'socket.io-client/dist/socket.io';
import {WEBSOCKET, APPSVERSION} from '../../constant/config';
const socket = io(WEBSOCKET, {transports: ['websocket']}, {jsonp: false});

import {
  GET_PROFILE,
  GET_CHATLIST,
  moveToSeen,
  getAppSetting,
  GET_USERS,
} from '../redux/actions/request';
import { GET_CONTACT} from '../redux/actions/contact';

import {connect} from 'react-redux';
import ChatCompList from '../components/chatcomp';

const ChatList = props => {

  const [nodataavail, setNodataavail] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [chatlist, setChatlist] = useState('');
  const [profile, setProfile] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [appsettingdata, setAppsetting] = useState([]);

  const appsetting = () => {
    getAppSetting().then(result => {
      if (APPSVERSION !== result.appversion) {
        if (result.appupdate === 1) {
          setModalVisible(true);
          ToastAndroid.show(`A New version is available`, ToastAndroid.LONG);
        }
      }
      setAppsetting(result);
    });
  };

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    fetchChatList();
    wait(1000).then(() => setRefreshing(false));
  });

  const ItemList = ({item, index}) => {
    return (
      <ChatCompList
        item={item}
        onPress={() =>
          {
            sendMoveToSeen(item.id)
            props.navigation.navigate('Chat', {item: item, id: profile.id})
          }
        }
      />
    );
  };  

  const fetchChatList = () => {
    props.GET_CHATLIST((data) => {
      if(data.status === "fail"){
        setNodataavail(true)
      } else {
        setNodataavail(false)
        setChatlist(data);
      }
      ToastAndroid.show(`Loading please wait...`, ToastAndroid.SHORT);
    }, (e) => console.log({e}))
  };

  // const userArrayList = [];

  // const fetchChatList2 = () => {
  //   getChatList().then(chatList => {
  //     if(chatList.status !== "fail"){
  //       for(let chat of chatList){
  //         userArrayList.push(parseInt(chat.id))
  //       }
  //     }
  //   });
  // };

  const sendMoveToSeen = (id) => {
    moveToSeen(id).then(data => {
      console.log('moveToSeen', data)
    });
  };

  const fetchProfile = () => {
    props.GET_PROFILE((data) => {
      setProfile(data)
      socket.emit('userjoin', {userid: data.id});
    }, (e) => console.log({e}))
    props.GET_USERS((data) => "", (e) => console.log({e}))
    // fetchChatList2();
  };

  useEffect(() => {
    appsetting();
    fetchProfile();
    fetchChatList()
    props.navigation.addListener('focus', () => {
      appsetting();
      fetchProfile();
      fetchChatList()
    });
    
    socket.on('newmessage', data => {
      // console.log('data', data)
      // {"fromuser": 1, "touser": 2}
      // console.log('profile', profile, parseInt(profile.id), parseInt(data.touser))
      if (parseInt(profile.id) === parseInt(data.touser)) {
        // console.log('if cond', userArrayList, parseInt(data.fromuser))
        // var checkdata = _.contains(userArrayList, parseInt(data.fromuser))
        // console.log('checkdata', checkdata)
        // if(checkdata === true) {
        //   console.log('fetchChatList()');
        //   fetchChatList();
        // }
        function userExists(userid) {
          return chatlist.some(function(el) {
            return parseInt(el.touser) === userid;
          }); 
        }

        const userExistsc = userExists(data.fromuser)
        console.log('userExistsc', userExistsc)
      }
    });


  }, []);

  if (nodataavail) {
    return (
      <View style={style.body}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={style.whitebody}>
            <View style={style.nsection}>
              <Image
                source={require('../../assets/image/telegram.png')}
                resizeMode={'contain'}
                style={style.nicon}
              />
              <Text style={style.ntext1}>Your Message</Text>
              <Text style={style.ntext2}>
                Send Private message to your friend.
              </Text>
            </View>
          </View>
        </ScrollView>
        <Bottom props={props}></Bottom>
      </View>
    );
  }

  return (
    <View style={style.body}>
      {Array.isArray(chatlist) && chatlist.length > 0 ? (
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
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          
        </ScrollView>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../assets/image/play-store.png')}
              style={style.modalicon}
            />
            <Text style={styles.modalTextTitle}>App Update Available</Text>
            <Text style={styles.modalTextSubtitle}>
              A New Version is available. Please upgrade now {'\n'}
              (Current: {APPSVERSION} Latest: {appsettingdata.appversion})
            </Text>
            <TouchableOpacity
              style={styles.modalicon}
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.intagedesign.chat',
                )
              }>
              <Text style={styles.textStyle}>
                <Icon name={'upload'} size={15} color="#e74c3c" /> Update Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Bottom props={props}></Bottom>
    </View>
  );
};

var styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    // padding: 10,
    width: '100%',
    height: '100%',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: '#e74c3c',
    textAlign: 'center',
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  modalTextSubtitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    color: '#999',
  },
  modalicons: {
    borderTopColor: '#EEE',
    borderTopWidth: 1,
    width: '100%',
    paddingTop: 15,
  },
  modalicon: {
    padding: 5,
    // height: 70,
    width: '100%',
    // marginBottom: 10,
    // resizeMode: 'contain',
  },
});

// export default ChatList;
const mapStateToProps = state => {
  return {
    state,
  };
};

export default connect(mapStateToProps, {GET_PROFILE, GET_USERS, GET_CHATLIST})(ChatList);
