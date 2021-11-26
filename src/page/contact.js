import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../style/style.js'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { TextInput, Appbar, Searchbar } from 'react-native-paper';
import Contacts from 'react-native-contacts';
import {SafeAreaView} from 'react-native-safe-area-context';

import _ from 'underscore';

import {GET_CONTACT} from '../redux/actions/contact';
import {connect} from 'react-redux'

const ContactList = (props) => {
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState('');

  useEffect(() => {
    loadContacts();
  }, [])

  const loadContacts = () => {
    console.log('props.GET_CONTACT')
    props.GET_CONTACT((data) => {
      var sortedObjs = _.sortBy(contacts, 'displayName');
      setNumber(sortedObjs);
      console.log(sortedObjs);
    }, (e) => console.log({e}))
    // Contacts.getAll().then(contacts => {
    //   var sortedObjs = _.sortBy(contacts, 'displayName');
    //     setNumber(sortedObjs)
    // })
  }

  const search = (text) => {
    const phoneNumberRegex = '/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m';
    if (text === "" || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.match(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        contacts.sort((a, b) => a.displayName.toLowerCase() > b.displayName.toLowerCase());
        setNumber(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        contacts.sort((a, b) => a.displayName.toLowerCase() > b.displayName.toLowerCase());
        setNumber(contacts);
      });
    }
  }

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="blue"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }
  return (
    <>
    <SafeAreaView style={style.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content title="Contact" titleStyle={style.headertitle} />
        </Appbar.Header>
        <ScrollView>
      {/* <View style={{ flexDirection: 'row', backgroundColor: '#1D1346', padding: 16 }}>
        <View style={{ flex: 6 }}>
          <Text style={style.headertitle}>Search Contact</Text>
        </View>
      </View>
    <ScrollView style={style.body}> */}
    <View style={style.tbody}>
      <Searchbar
        placeholder="Search"
        onChangeText={search}
      />
    </View>
        <View style={style.tbody}>
          {Array.isArray(number) && number.length ? (
            number.map((item, index) => {
              let cont
              let displayCon
              if (item.phoneNumbers.length > 0) {
                {
                  return (
                    item.phoneNumbers.map((itemNumber) => {
                      cont = itemNumber.number
                      cont = cont.replace(/ +/g, "")
                      if (cont.substring(0, 3) === '+91' || cont.length === 10) {
                        displayCon = cont.substr(cont.length - 10, 10)
                        // console.log('here', displayCon)
                        return (
                          <TouchableOpacity
                            key={itemNumber.id}
                            onPress={() => props.navigation.navigate('Chat', {
                              number: displayCon,
                              name: item.displayName,
                            })}>
                            <View style={style.lists}>
                              <View style={[style.listicons], { justifyContent: 'center', alignItems: 'center', alignContent: 'center', padding: 7 }}>
                                {item.thumbnailPath === "" ? (
                                  <View style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius:30,
                                    alignItems: 'center',
                                    backgroundColor:'red',
                                    overflow: 'hidden'
                                  }}
                                  >
                                    <Text style={{color: '#FFF', fontSize:20, paddingTop: 10}}>{item.displayName.substring(0, 1)}</Text>
                                  </View>
                                ) : (
                                  <Image
                                    source={{ uri: item.thumbnailPath }}
                                    style={{
                                      width: 45,
                                      height: 45,
                                      borderRadius:30,
                                      resizeMode: 'contain',
                                      alignItems: 'center',
                                    }}
                                  />
                                )}
                              </View>
                              <View style={style.listbody}>
                                <Text style={style.contactname}>{item.displayName}</Text>
                                {/* <Text style={style.contactnumber}>{displayCon}</Text> */}
                                <Text style={style.contactnumber}>Invite Now</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      }
                    })
                  )
                }
              }
            })) : <View />
          }
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({

});
// export default ContactList;
const mapStateToProps = (state) => {
  console.log("GET_CONTACT", JSON.stringify(state,null,2))
  return {
    state
  }
}

export default connect(mapStateToProps,{GET_CONTACT})(ContactList);

