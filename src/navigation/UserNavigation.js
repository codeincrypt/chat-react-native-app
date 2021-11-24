import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './../navs/Bottom';
// import {DrawerContent} from './../navs/DrawerContent';

// HOME PAGE
import HomeScreen from '../page/userlist';

const HomeStack = createStackNavigator();

const UserDrawerNavigator = createDrawerNavigator();

const logoIcon = () => {
  return (
    <View style={{width: 100}}>
      <Image
        source={require('../../assets/image/chatapp-black.png')}
        resizeMode={'contain'}
        style={{width: '100%', height: 35, marginLeft: -15}}
      />
    </View>
  );
};

const createHomeStack = ({navigation}) => {
  const ActionBarIcon = () => {
    return (
      <View style={{margin: 10, marginLeft: 20, marginRight: 0}}>
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/icon/white-menu.png')}
            resizeMode={'contain'}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity> */}
      </View>
    );
  };
  const rightIcon = () => {
    return (
      <View
        style={{
          flex: 2,
          marginRight: 10,
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={{marginRight: 25}}>
          <Icon name={'bell'} size={22} color={'#FFF'} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{marginRight:15}} >
          <Icon name={'shopping-cart' } size={22} color={'#FFF'} />
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E30047',
        },
        headerTintColor: 'transparent',
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => ActionBarIcon(),
          headerTitle: () => logoIcon(),
          headerRight: () => rightIcon(),
        }}
      />
    </HomeStack.Navigator>
  );
};


export const UserNavigator = ({navigation}) => {
  return (
    <UserDrawerNavigator.Navigator
      initialRouteName="Home"
      // drawerContent={props => <DrawerContent {...props} />}
      drawerContentOptions={{ activeTintColor: '#352562' }}>
      <UserDrawerNavigator.Screen name="Home" component={createHomeStack} options={{headerShown: false}} />
      {/* <UserDrawerNavigator.Screen name="Myaccount" component={createProfileStack} options={{headerShown: false}} /> */}
    </UserDrawerNavigator.Navigator>
  );
};
