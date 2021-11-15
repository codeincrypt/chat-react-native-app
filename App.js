// import 'react-native-gesture-handler';
import React, {useEffect, createContext, useReducer, useMemo} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {UserNavigator} from './src/navigation/UserNavigation';
import LoginNavigation from './src/navigation/LoginNavigation';
import {WEBSOCKET} from './constant/config';
import io from 'socket.io-client/dist/socket.io';
// import AppNavigator from './navigation/AppNavigator';
import {loginReducer, initialLoginState} from './src/redux/reducers/userReducer';

// import NetInfo from '@react-native-community/netinfo';
// import NoInternetConnection from './src/screen/nointernet';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const UserContext = createContext();
const App = () => {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };
  //  const [loading, setLoading] = useState(false);
  const socket = io(WEBSOCKET, {transports: ['websocket']}, {jsonp: false});

  const [loginstate, dispatch] = useReducer(loginReducer, initialLoginState);
  const authContext = useMemo(() => ({
    signIn: async (token, details, partnerid) => {
      try {
        await AsyncStorage.setItem('lvkartmerchanttoken', token);
        await AsyncStorage.setItem('user', details);
        await AsyncStorage.setItem('socket', partnerid);
        socket.emit('userjoin', {userid: partnerid});
      } catch (e) {
        console.log('error', e);
      }
      dispatch({type: 'RETRIEVE_INFO', token: token, details: details});
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('lvkartmerchanttoken');
        await AsyncStorage.removeItem('user');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    info: async () => {
      var user;
      try {
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        console.log(e);
      }
      return user;
    },
  }));
  useEffect(() => {
    const tryLogin = async () => {
      let token = null;
      let user = null;
      try {
        token = await AsyncStorage.getItem('lvkartmerchanttoken');
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_INFO', token: token, details: user});
    };
    setTimeout(tryLogin, 2000);
  }, []);
  const display = () => {
    // NetInfo.addEventListener(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   if(state.isConnected === false){
    //     console.log('no')
    //     return (
    //         <NoInternetConnection />
    //     )
    //   }
    //   else {
    return (
      <UserContext.Provider value={authContext}>
        <StatusBar backgroundColor="#ce0041" />
        <NavigationContainer>
          {/* {loginstate.userToken === null ? (
            <LoginNavigation />
          ) : ( */}
            <UserNavigator />
          {/* )} */}
        </NavigationContainer>
      </UserContext.Provider>
    );
    //   }
    // });
  };
  return (
    <>
      <AnimatedSplash
        translucent={true}
        isLoaded={loginstate.loader}
        logoImage={require('./assets/image/chatapp-white.png')}
        backgroundColor={'#000'}
        logoHeight={200}
        logoWidth={200}>
        {display()}
      </AnimatedSplash>
    </>
  );
};

export default App;
