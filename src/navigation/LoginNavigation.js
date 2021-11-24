import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SliderScreen from '../page/swipe';
import Login from '../auth/login';

const RootStack = createStackNavigator();

const LoginNavigation = ({navigation}) => (
    <RootStack.Navigator headerMode={{headerShown: false}}>
        <RootStack.Screen name="SliderScreen" component={SliderScreen}/>
        <RootStack.Screen name="Login" component={Login}/>
    </RootStack.Navigator>
);

export default LoginNavigation;