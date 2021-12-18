import React, {useState, useEffect, useContext} from 'react';
import {Divider, Appbar, Menu} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {fontFamilyNormal, fontFamilyRegular} from '../../constant/fonts';
import style from '../../style/style.js';
import {getUpdateStatus} from '../redux/actions/request';
import Loader from '../components/loading';

const MyStatusScreen = props => {
  const profiledata = props.route.params.profile;
  const statuslist = props.route.params.statuslist;

  const [loading, setIsloading] = useState(false);

  const [mystatusform, setmystatusform] = useState(false);
  const [mystatus, setmystatus] = useState(profiledata.status);

  const updateStatus = mystatus => {
    setIsloading(true);
    getUpdateStatus(mystatus).then(result => {
      setmystatus(mystatus);
      if (result.status === 'success') {
        setIsloading(false);
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      }
    });
  };

  useEffect(() => {}, []);

  const ItemList = ({item, index}) => {
    return (
      <Menu.Item
        onPress={() => {
          updateStatus(item.statustext);
        }}
        title={item.statustext}
      />
    );
  };

  return (
    <SafeAreaView style={style.body}>
      <Appbar.Header style={style.header}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="About" titleStyle={style.headertitle} />
      </Appbar.Header>
      {loading && (
        <Loader message={'Updating...'} />
      )}
      <ScrollView>
        <View
          style={{
            flex: 1,
            padingBottom: 5,
          }}>
          <Menu.Item
            titleStyle={{
              fontSize: 12,
              fontWeight: '700',
            }}
            title="CURRENTLY"
          />
          <Menu.Item
            onPress={() => {
              updateStatus(mystatus);
            }}
            title={mystatus}
          />
          <Divider />
          <Menu.Item
            titleStyle={{
              fontSize: 11,
              fontWeight: '700',
            }}
            title="SELECT ABOUT"
          />
          <FlatList
            data={statuslist}
            renderItem={ItemList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilebluebox: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  profilebox: {
    marginTop: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    marginBottom: 6,
    color: '#000',
    fontFamily: fontFamilyRegular,
  },
  usertext: {
    marginTop: 3,
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamilyNormal,
  },
  profileuploadicon: {
    borderRadius: 50,
    marginTop: -40,
    marginLeft: 110,
    padding: 15,
    backgroundColor: '#000',
  },
  paymodeboxicon: {
    padding: 12,
    paddingRight: 20,
  },
  paymodeboxicon2: {
    padding: 8,
    paddingRight: 20,
  },
  title1: {
    color: '#000',
    fontSize: 14,
    paddingTop: 2,
    paddingLeft: 10,
  },
  title2: {
    color: '#000',
    fontSize: 18,
    paddingTop: 2,
    paddingLeft: 10,
  },
  logout: {
    color: '#000',
    fontSize: 18,
    paddingTop: 14,
    paddingLeft: 10,
  },
  lists: {
    backgroundColor: '#FFF',
    marginBottom: 5,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  overlaybox: {
    backgroundColor: '#FFF',
    width: '85%',
    height: 80,
    borderRadius: 5,
    flexDirection: 'row',
    textAlign: 'center',
    zIndex:9,
  },
  loading: {
    position: 'absolute',
    zIndex:1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00000088',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MyStatusScreen;
