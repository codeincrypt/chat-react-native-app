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
import IconButton from 'react-native-vector-icons/FontAwesome';
import _ from 'underscore';
import {Divider, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

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
import {GET_CONTACT} from '../redux/actions/contact';

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
        onPress={() => {
          sendMoveToSeen(item.id);
          props.navigation.navigate('Chat', {item: item, id: profile.id});
        }}
      />
    );
  };

  const fetchChatList = () => {
    props.GET_CHATLIST(
      data => {
        if (data.status === 'fail') {
          setNodataavail(true);
        } else {
          setNodataavail(false);
          setChatlist(data);
        }
        ToastAndroid.show(`Loading please wait...`, ToastAndroid.SHORT);
      },
      e => console.log({e}),
    );
  };

  const sendMoveToSeen = id => {
    moveToSeen(id).then(data => {
      console.log('moveToSeen', data);
    });
  };

  const fetchProfile = () => {
    const users = {};
    props.GET_PROFILE(
      data => {
        setProfile(data);
        socket.emit('userjoin', {userid: data.id});
      },
      e => console.log({e}),
    );
    props.GET_USERS(
      data => '',
      e => console.log({e}),
    );
  };

  useEffect(() => {
    appsetting();
    fetchProfile();
    fetchChatList();
    props.navigation.addListener('focus', () => {
      appsetting();
      fetchProfile();
      fetchChatList();
    });

    socket.on('newmessage', data => {
      console.log('socket-newmessage-chatlist', data);
      if (parseInt(profile.id) === parseInt(data.touser)) {
        function userExists(userid) {
          return chatlist.some(function (el) {
            return parseInt(el.id) === userid;
          });
        }

        const userExistsc = userExists(data.fromuser);
        // console.log('userExistsc', userExistsc)
        userExistsc === true && fetchChatList();
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
    <SafeAreaView style={style.body}>
      {/* <View style={{width: '100%', height: 55, padding:15, flexDirection: 'row', backgroundColor:'#FFF'}}>
        <Image
          source={require('../../assets/image/logo.png')}
          resizeMode={'contain'}
          style={{width: '40%', height: 40}}
        />
        <View style={{width: '60%'}}>

        </View>
      </View> */}
      <Appbar.Header style={style.mainheader}>
        <Image
          {...props}
          source={require('../../assets/image/logo.png')}
          resizeMode={'contain'}
          style={{width: '40%', height: 40}}
        />
        <Appbar.Action
          style={{alignContent: 'flex-end', alignItems: 'flex-end', flex: 1}}
          icon="search-web"
          onPress={() => props.navigation.navigate('chatuser')}
        />
      </Appbar.Header>
      <Divider style={{borderBottomWidth: 3, borderBottomColor: '#8CC63F'}} />

      {Array.isArray(chatlist) && chatlist.length > 0 ? (
        <FlatList
          // style={{paddingBottom: 10}}
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
          style={style.body}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }></ScrollView>
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
    </SafeAreaView>
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
  // console.log('state', JSON.stringify(state, null,2) )
  return {
    state,
  };
};

export default connect(mapStateToProps, {GET_PROFILE, GET_USERS, GET_CHATLIST})(
  ChatList,
);
