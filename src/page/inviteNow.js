import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from '../../style/style'
import Share from 'react-native-share';

const InviteNow = props => {

  const options = {
    title: `ChatApp`,
    message: `Check out ChatApp, I use it to message your I know about. Get it for free at https://bit.ly/3em0flr`,
    url: `https://bit.ly/3em0flr`,
  };

  const ShareData = async () => {
    try {
      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const number = props.route.params.number
  const name = props.route.params.name
    return (
      <>
      <SafeAreaView style={style.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content
            title={"Invite Now"}
            titleStyle={style.headertitle}
          />
        </Appbar.Header>
      <View style={style.body}>
        <ScrollView>
          <View style={style.whitebody}>
            <View style={style.nsection}>
              <Image
                source={require('../../assets/image/telegram.png')}
                resizeMode={'contain'}
                style={style.nicon}
              />
              <Text style={style.ntext1}>Your Message</Text>
              <Text style={style.invitetext1}>{name}</Text>
              <Text style={style.invitetext2}>{number}</Text>
              <Text style={style.ntext2}>
                Send Private message to your friend.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      </SafeAreaView>
    </>
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

export default InviteNow;