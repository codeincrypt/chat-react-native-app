import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../style/style';
import {createStackNavigator} from '@react-navigation/stack';
// import {DrawerContent} from './../navs/DrawerContent';

// CHAT
import ChatList from '../page/chatlist';
import ViewChat from '../page/chat';
import userProfile from '../page/userprofile';
// PROFILE
import MyaccountScreen from '../page/myaccount';
import MyStatusScreen from '../page/changeStatus';
// CONTACT
import ContactList from '../page/contact';
import InviteNow from '../page/inviteNow';
import { Divider } from 'react-native-paper';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ContactStack = createStackNavigator();

const Stack = createStackNavigator();
const logoIcon = () => {
  return (
    <>
      <View style={{width: '100%', height: 60, padding:15, flexDirection: 'row', backgroundColor:'red'}}>
        <Image
          source={require('../../assets/image/logo.png')}
          resizeMode={'contain'}
          style={{width: '40%', height: 30, marginLeft: -10, paddingVertical:30}}
        />
        <View style={{width: '60%'}}>

        </View>
      </View>
      <Divider style={{borderBottomWidth: 3, marginTop: 10, borderBottomColor: '#8CC63F'}} />
      {/* <View style={{width: '100%', height: 4, backgroundColor: '#000',marginTop: 30, marginLeft: -15, marginRight: '-15%'}}></View> */}
    </>
  );
};

const createHomeStack = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: 'transparent',
      }}>
      <HomeStack.Screen
        name="Home"
        component={ChatList}
        options={{
          headerShown: false,
        }}
        // options={{
        //   headerTitle: () => logoIcon(),
        //   headerRight: () => (
        //     <Button onPress={() => setCount(c => c + 1)} title="Update count" />
        //   ),
        // }}
      />
      <HomeStack.Screen
        name="Chat"
        component={ViewChat}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="chatuser"
        component={userProfile}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const createContactStack = ({navigation}) => {
  return (
    <ContactStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTintColor: 'transparent',
      }}>
      <ContactStack.Screen
        name="ContactScreen"
        component={ContactList}
        options={{
          headerShown: false,
        }}
      />
      <ContactStack.Screen
        name="InviteNow"
        component={InviteNow}
        options={{
          headerShown: false,
        }}
      />
    </ContactStack.Navigator>
  );
};

const createProfileStack = ({navigation}) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E30047',
        },
        headerTintColor: 'transparent',
      }}>
      <ProfileStack.Screen
        name="Myaccount"
        component={MyaccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="MyStatus"
        component={MyStatusScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export const UserNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      drawerContent={props => <BottomContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#352562',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={createHomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contact"
        component={createContactStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyaccountScreen"
        component={createProfileStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
