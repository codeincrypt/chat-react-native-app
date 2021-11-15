import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';

import style from '../../style/style.js';
// import {colourScheme} from '../../../constant/color';
// import {getChangePassword} from '../request/user';

const ChangePassword = props => {
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');

  const [btnloading, setBtnloading] = useState(false);
  const [passwordsecureold, setPasswordsecureold] = useState(true);
  const [passwordsecurenew, setPasswordsecurenew] = useState(true);
  const [passwordsecurenew2, setPasswordsecurenew2] = useState(true);

  const changePassword = () => {
    if (oldpass === '') {
      return ToastAndroid.show('Please enter old password', ToastAndroid.LONG);
    }
    if (newpass === '') {
      return ToastAndroid.show('Please enter new password', ToastAndroid.LONG);
    }
    if (confirmpass === '') {
      return ToastAndroid.show(
        'Please enter confirm new password',
        ToastAndroid.LONG,
      );
    }
    if (newpass !== confirmpass) {
      return ToastAndroid.show(
        'Confirm password did not match',
        ToastAndroid.LONG,
      );
    }
    setBtnloading(true);
    getChangePassword(oldpass, newpass, confirmpass).then(result => {
      if (result.status === 'fail') {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
        setBtnloading(false);
      } else {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
        props.navigation.goBack();
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <SafeAreaView style={style.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content
            title="Change Password"
            titleStyle={style.headertitle}
          />
        </Appbar.Header>
        {/* <View style={[style.whitebody, {padding: 15}]}> */}
          {/* <View>
            <TextInput
              label="Old Password"
              mode="outlined"
              style={style.inputBox}
              value={oldpass}
              onChangeText={setOldpass}
              minLength={6}
              secureTextEntry={passwordsecureold}
              theme={{colors: {primary: colourScheme.textfocus}}}
            />
            {passwordsecureold === true ? (
              <TouchableOpacity
                onPress={e => setPasswordsecureold(false)}
                style={style.inputicon}>
                <Icon name={'eye'} size={18} color="#444" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={e => setPasswordsecureold(true)}
                style={style.inputicon}>
                <Icon name={'eye-slash'} size={18} color="#444" />
              </TouchableOpacity>
            )}
          </View>

          <View>
            <TextInput
              label="New Password"
              mode="outlined"
              style={style.inputBox}
              value={newpass}
              secureTextEntry={passwordsecurenew}
              onChangeText={setNewpass}
              minLength={6}
              theme={{colors: {primary: colourScheme.textfocus}}}
            />
            {passwordsecurenew === true ? (
              <TouchableOpacity
                onPress={e => setPasswordsecurenew(false)}
                style={style.inputicon}>
                <Icon name={'eye'} size={18} color="#444" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={e => setPasswordsecurenew(true)}
                style={style.inputicon}>
                <Icon name={'eye-slash'} size={18} color="#444" />
              </TouchableOpacity>
            )}
          </View>

          <View>
            <TextInput
              label="Confirm New Password"
              mode="outlined"
              style={style.inputBox}
              value={confirmpass}
              secureTextEntry={passwordsecurenew2}
              onChangeText={setConfirmpass}
              minLength={6}
              theme={{colors: {primary: colourScheme.textfocus}}}
            />
            {passwordsecurenew2 === true ? (
              <TouchableOpacity
                onPress={e => setPasswordsecurenew2(false)}
                style={style.inputicon}>
                <Icon name={'eye'} size={18} color="#444" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={e => setPasswordsecurenew2(true)}
                style={style.inputicon}>
                <Icon name={'eye-slash'} size={18} color="#444" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={{marginBottom: 10, fontSize: 12}}>
            Your password field at least 6 character long. Update your password
            to secure your account
          </Text>
        </View> */}
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <View style={{padding: 15}}>
            <Button
              mode="contained"
              loading={btnloading}
              style={style.buttonDarkRounded}
              // onPress={changePassword}
              >
              <Text style={style.darkbtntext}>Update Password</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

var styles = StyleSheet.create({});

export default ChangePassword;
