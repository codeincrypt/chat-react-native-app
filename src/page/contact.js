import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../style/style.js'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
  Modal,
} from 'react-native';
import { TextInput, Button, Searchbar } from 'react-native-paper';
import Contacts from 'react-native-contacts';
import _ from 'underscore';
const ContactList = (props) => {
  const [loading, setLoading] = useState(true)
  // const numberSet = (text) => {
  //   setNumber(text)
  // }
  // const nextPage = () => {
  //   if(number.toString().length !== 10){
  //     return Alert.alert('Enter 10 digit number')
  //   }
  //   props.navigation.navigate('RequestMoneyAmount', {
  //     number: number
  //   })
  // }
  const [number, setNumber] = useState('');
  const token = props.route.params.token;
  useEffect(() => {
    loadContacts()
  }, [])
  const loadContacts = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // error
      } else {
        // contacts returned in Array
        // console.log(contacts)
        var sortedObjs = _.sortBy(contacts, 'displayName');
        setNumber(sortedObjs)
        setLoading(false)
      }
    })
  }
  const search = (text) => {
    const phoneNumberRegex = '/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m';
    if (text === "" || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.match(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        contacts.sort((a, b) => a.displayName.toLowerCase() > b.displayName.toLowerCase());
        setNumber(contacts);
        console.log('contacts', contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        contacts.sort((a, b) => a.displayName.toLowerCase() > b.displayName.toLowerCase());
        setNumber(contacts);
        console.log('contacts', contacts);
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
      <View style={{ flexDirection: 'row', backgroundColor: '#1D1346', padding: 16 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ReqMoneyDash')}>
            <Icon name={'arrow-left'} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={style.headertitle}>Search Contact</Text>
        </View>
      </View>
      <View style={style.tbody}>
        <Searchbar
          placeholder="Search"
          onChangeText={search}
        />
      </View>
      <ScrollView style={style.body}>
        <View style={style.tbody}>
          {Array.isArray(number) && number.length ?
            (
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
                              onPress={() => props.navigation.navigate('RequestMoneyAmount', {
                                token: token,
                                number: displayCon,
                                name: item.displayName,
                              })}>
                              <View style={style.lists}>
                                <View style={[style.listicons], { justifyContent: 'center', alignItems: 'center', alignContent: 'center', padding: 7 }}>
                                  <Icon name={'user-circle-o'} size={32} color="#888" />
                                </View>
                                <View style={style.listbody}>
                                  <Text style={style.contactname}>{item.displayName}</Text>
                                  <Text style={style.contactnumber}>{displayCon}</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          )
                        }
                      })
                    )
                  }
                  {/* return (
                           <Text>here</Text>
                         ) */}
                }
                // console.log(item)
              })
            )
            :
            <View />
          }
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({

});
export default ContactList;
