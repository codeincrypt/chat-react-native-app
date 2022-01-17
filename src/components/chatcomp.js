import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Card, IconButton} from 'react-native-paper';
import moment from 'moment';

const todayDate = moment().format('DD MMM YYYY');
  const yesterdayDate = moment().subtract(1, 'day').format('DD MMM YYYY')

const ChatCompList = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card.Title
        title={item.name}
        subtitle={item.lastmsg}
        leftStyle={{marginRight: 30}}
        rightStyle={{marginRight: 15}}
        left={props => (
          <View style={styles.rounded}>
            <Image
              source={{
                uri: item.photo,
              }}
              style={styles.userprofile}
              resizeMode={'contain'}
            />
          </View>
        )}
        right={props => (
          <>
            <Text style={styles.userstatus}>{item.userstatus === todayDate ? "Today" : item.userstatus === yesterdayDate ? "Yesterday" : item.userstatus}</Text>
            {item.unseencount > 0 ? (
              <Text style={styles.unseencount}>{item.unseencount}</Text>
            ):null}
          </>
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rounded: {
    backgroundColor: '#CCC',
    height: 55,
    width: 55,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  userprofile: {
    height: 55,
    width: 55,
    borderRadius: 30,
    overflow: 'hidden',
  },
  userstatus: {
    fontSize: 12,
    color: '#555',
  },
  unseencount: {
    marginTop:5,
    backgroundColor: '#ee5253',
    alignSelf: 'flex-end',
    textAlign: 'center',
    padding:3,
    width:22,
    height:22,
    borderRadius:15,
    fontSize: 13,
    color: '#FFF',
  },
});

export default ChatCompList;
