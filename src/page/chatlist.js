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
import {WEBSOCKET, APPSVERSION} from '../../constant/config';
const socket = io(WEBSOCKET, {transports: ['websocket']}, {jsonp: false});

import {
  GET_PROFILE,
  GET_CHATLIST,
  getChatList,
  getProfile,
  getAppSetting,
} from '../redux/actions/request';

// import { GET_CONTACT} from '../redux/actions/contact';

import {connect} from 'react-redux';
import ChatCompList from '../components/chatcomp';

const ChatList = props => {
  const [loading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chatlist, setChatlist] = useState('');
  const [profile, setProfile] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchChatList();
    appsetting();
    fetchProfile();
    props.navigation.addListener('focus', () => {
      fetchChatList();
      appsetting();
    });
  }, []);

  
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
        onPress={() => props.navigation.navigate('Chat', {item: item, id:profile.id})}
      />
    );
  };

  // props.GET_PROFILE((data) => setProfile(data), (e) => console.log({e}))
  // props.GET_CONTACT((data) => console.log('GET_CONTACT'), (e) => console.log({e}))
  // props.GET_CHATLIST((data) => {
  //   console.log("hhjk",data)
  //   setChatlist(data)
  // }, (e) => console.log({e}))

  const fetchChatList = () => {
    getChatList().then(chatList => {
      setChatlist(chatList);
    });
  };

  const fetchProfile = () => {
    getProfile().then(data => {
      setProfile(data);
      socket.emit('userjoin', {userid: data.partnerid});
    });
  };

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
          <Text> No Data </Text>
        </ScrollView>
      )}


<Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={require('../../../assets/play-store.png')}
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
                    'https://play.google.com/store/apps/details?id=com.lvkart.delivery',
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

var styles = StyleSheet.create({});

// export default ChatList;
const mapStateToProps = state => {
  return {
    state,
  };
};

export default connect(mapStateToProps, {GET_PROFILE, GET_CHATLIST})(ChatList);
