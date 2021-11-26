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
import style from '../../style/style.js'

import { GET_PROFILE, GET_CHATLIST } from '../redux/actions/request';
import {connect} from 'react-redux'
import ChatCompList from '../components/chatcomp';

const ChatList = (props) => {

  const [loading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chatlist, setChatlist] = useState('');

  // useEffect(() => {
  //   fetchChatList();
  // }, [])

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    fetchRating();
    wait(1000).then(() => setRefreshing(false));
  });

  const ItemList = ({item, index}) => {
    return <ChatCompList item={item} onPress={() =>
      props.navigation.navigate('Chat', {item:item})
    } />;
  };

  props.GET_PROFILE((data) => console.log(data), (e) => console.log({e}))
  props.GET_CHATLIST((data) => setChatlist(data), (e) => console.log({e}))

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
        <FlatList
          style={{marginBottom:60}}
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
    </>
  );
};

var styles = StyleSheet.create({
});

// export default ChatList;
const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps,{GET_PROFILE, GET_CHATLIST})(ChatList);

