import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../style/style.js';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import Contacts from 'react-native-contacts';
import {SafeAreaView} from 'react-native-safe-area-context';

import _ from 'underscore';

import {GET_CONTACT} from '../redux/actions/contact';
import {connect} from 'react-redux';
import Loader from '../components/loading.js';
import {getAllUserList, getProfile} from '../redux/actions/request.js';

const ContactList = props => {
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState('');
  const [number2, setNumber2] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      fetchChatList();
      fetchProfile();
    });
    fetchChatList();
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    getProfile().then(data => {
      setProfile(data);
    });
  };

  const loadContacts = chatList => {
    props.GET_CONTACT(data => {
      Contacts.getAll().then(contacts => {
        var sortedObjs = _.sortBy(contacts, 'displayName');
        var output = [];
        var cont;
        var displayContact;
        var userdata;
        var chatlistdata = [];
        chatList.map((value, key) => {
          chatlistdata.push(value.contact);
        });
        for (let i = 0; i < sortedObjs.length; i++) {
          for (let k = 0; k < sortedObjs[i].phoneNumbers.length; k++) {
            cont = sortedObjs[i].phoneNumbers[k].number;
            cont = cont.replace(/ +/g, '');
            if (cont.substring(0, 3) === '+91' || cont.length === 10) {
              displayContact = cont.substr(cont.length - 10, 10);
            }

            var matched = _.contains(chatlistdata, displayContact);
            var myArray = ['#10ac84', '#ee5253', '#0abde3', '#2e86de', '#222f3e', '#fa8231']
            var rand = myArray[(Math.random() * myArray.length) | 0];

            var userdata = chatList.find(function (element) {
              return element.contact === displayContact;
            });

            var contactlist = {
              color         : rand,
              displayName   : sortedObjs[i].displayName,
              hasThumbnail  : sortedObjs[i].hasThumbnail,
              thumbnailPath : sortedObjs[i].thumbnailPath,
              mobilenumber  : displayContact,
              matched       : matched,
              userdata      : userdata,
            };
            output.push(contactlist);
          }
        }
        var uniqueArray = _.uniq(output, 'mobilenumber');
        setNumber(uniqueArray);
        setNumber2(uniqueArray);
        setLoading(false);
      });
    });
  };

  const fetchChatList = () => {
    getAllUserList().then(chatList => {
      loadContacts(chatList);
    });
  };

  const comingSoon = () => {
    ToastAndroid.show(`Invite feature is coming soon`, ToastAndroid.LONG);
  }

  const search = e => {
    var searchString = e.toString().toLowerCase();
    const query = number2.filter(item => {
      return (
        item.displayName.toLowerCase().match(searchString) ||
        item.mobilenumber.toLowerCase().match(searchString)
      );
    });
    setNumber(query);
  };

  const ItemList = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {item.matched ===  true ? (
          props.navigation.navigate('Chat', {item: item.userdata, id:profile.id})
          ) : (
            // comingSoon()
            props.navigation.navigate('InviteNow', {
              number: item.mobilenumber,
              name: item.displayName,
            })
          )}
        }>
        <View style={style.lists}>
          <View style={style.contactlisticons}>
            {item.hasThumbnail === false ? (
              <View style={{width: 45,
                height: 45,
                borderRadius: 30,
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: item.color}}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 20,
                    paddingTop: 10,
                  }}>
                  {item.displayName.substring(0, 1)}
                </Text>
              </View>
            ) : (
              <Image
                source={{uri: item.thumbnailPath}}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  resizeMode: 'contain',
                  alignItems: 'center',
                }}
              />
            )}
          </View>
          <View style={style.listbody}>
            <Text style={style.contactname}>{item.displayName}</Text>
            {/* <Text style={style.contactnumber}>{item.mobilenumber}</Text> */}
            {item.matched ? (
              <Text style={style.statusmsg} numberOfLines={1}>{item.userdata.mystatus}</Text>
            ) : (
              <Text style={style.contactnumber}>Invite Now</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Loader message={'Loading Contact...'} />;
  }

  return (
    <>
      <SafeAreaView style={style.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content
            title={'Select Contact'}
            subtitle={`${number2.length} Contacts`}
            titleStyle={style.contactheadertitle}
          />
        </Appbar.Header>

        <View style={style.tbody}>
          <Searchbar placeholder="Search" onChangeText={search} />
        </View>
        <View style={style.tbody}>
          {Array.isArray(number) && number.length > 0 ? (
            <FlatList
              data={number}
              renderItem={ItemList}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              style={{marginBottom: 100}}
            />
          ) : (
            <ScrollView>
              <View />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});
// export default ContactList;
const mapStateToProps = state => {
  return {
    state,
  };
};

export default connect(mapStateToProps, {GET_CONTACT})(ContactList);
