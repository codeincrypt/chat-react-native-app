import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../style/style'
import {createStackNavigator} from '@react-navigation/stack';
// import {DrawerContent} from './../navs/DrawerContent';

// HOME PAGE
import ChatList from '../page/chatlist';
import ContactList from '../page/contact';
import MyaccountScreen from '../page/myaccount';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ContactStack = createStackNavigator();

const Stack = createStackNavigator();
const logoIcon = () => {
  return (
    <View style={{width: 100, flexDirection: 'row'}}>
      <Image
        source={require('../../assets/image/chatapp-white.png')}
        resizeMode={'contain'}
        style={{width: '100%', height: 30, marginLeft: -20}}
      />
      <Text style={style.headertitle}>Chat App</Text>
    </View>
  );
};

const createHomeStack = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTintColor: 'transparent',
      }}>
      <HomeStack.Screen
        name="Home"
        component={ChatList}
        options={{
          headerTitle: () => logoIcon(),
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
          headerShown:false
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
          headerShown:false
        }}
      />
    </ProfileStack.Navigator>
  );
};

export const UserNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <BottomContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#352562',
      }}
      >
      <Stack.Screen name="HomeScreen" component={createHomeStack} options={{headerShown:false}} />
      <Stack.Screen name="Contact" component={createContactStack} options={{headerShown:false}} />
      <Stack.Screen name="MyaccountScreen" component={createProfileStack} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};