import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Card, IconButton} from 'react-native-paper';
import {fontFamilyBold} from '../../constant/fonts';

const ChatCompList = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card.Title
        style={{paddingTop: 17}}
        title={item.name}
        subtitle={item.lastmsg}
        // left={(props) => <Avatar.Icon {...props} icon="folder" />}
        // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
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
          <Text style={styles.userstatus}>{item.userstatus}</Text>
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
    fontSize: 10,
    color: '#555',
  },
});

export default ChatCompList;
