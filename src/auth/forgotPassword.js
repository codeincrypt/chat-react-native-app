import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../style/style';
import {
  fontFamilyBold,
  fontFamilyNormal,
  fontFamilyRegular,
} from '../../constant/fonts';
import {
  getVerifyOTP,
  getResendOTP,
  getForgotChangePassword,
} from './request';

import Loader from '../components/loading';

const ForgotPassword = ({navigation}) => {
  const [loading, setIsloading] = useState(false);
  // LOGIN
  const [mobile, setMobile] = useState('');
  // FORGOT
  const [fotp, setFOTP] = useState('');
  const [fpassword, setFPassword] = useState('');
  const [fcpassword, setFcPassword] = useState('');

  const [btnLoginloading, setBtnLoginloading] = useState(false);

  const [forgot, setForgot] = useState(true);
  const [forgototp, setForgotOtp] = useState(false);
  const [passwordpage, setNewPassword] = useState(false);

  useEffect(() => {}, []);

  // FORGOT PASSWORD MOBILE
  const forgotSendOTP = () => {
    if (mobile.toString().length < 10) {
      return ToastAndroid.show(
        'Please enter 10 digit mobile number',
        ToastAndroid.LONG,
      );
    }
    setBtnLoginloading(true)
    getResendOTP(mobile).then(result => {
      ToastAndroid.show(result.message, ToastAndroid.LONG);
      if (result.status === 'success') {
        setForgotOtp(true);
        setBtnLoginloading(false)
        setForgot(false);
      } else {
        setBtnLoginloading(false)
      }
    });
  };

  const resendOTP = () => {
    if (mobile.toString().length < 10) {
      return Alert.alert('Please enter 10 digit mobile number');
    }
    getResendOTP(mobile).then(result => {
      if (result.status === 'success') {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      }
    });
  };
  // FORGOT PASSWORD OTP
  const VerifyForgotOTP = () => {
    if (fotp.toString().length < 4) {
      return Alert.alert('Please enter 4 digit OTP');
    }
    setBtnLoginloading(true)
    getVerifyOTP(mobile, fotp).then(result => {
      ToastAndroid.show(result.message, ToastAndroid.LONG);
      if (result.status === 'success') {
        setNewPassword(true);
        setBtnLoginloading(false)
        setForgotOtp(false);
      } else {
        setBtnLoginloading(false)
      }
    });
  };
  // FORGOT PASSWORD CHANGE PASSWORD
  const ChangePassword = () => {
    if (fpassword.toString().length < 6) {
      return;
    }
    if (fcpassword.toString().length < 6) {
      ToastAndroid.show('Please enter at least 6 digit password',ToastAndroid.LONG);
      return;
    }
    if (fpassword.toString() !== fcpassword.toString()) {
      ToastAndroid.show('Password did not match', ToastAndroid.LONG);
      return;
    }
    setBtnLoginloading(true)
    getForgotChangePassword(mobile, fpassword, fcpassword).then(result => {
      ToastAndroid.show(result.message, ToastAndroid.LONG);
      if (result.status === 'success') {
        setIsloading(true)
        setBtnLoginloading(false)
        const greeting = async () =>{
          setNewPassword(false)
          navigation.navigate('Login');
        }
        setTimeout(greeting, 2000);
      } else {
        setBtnLoginloading(false)
      }
    });
  };

  if (loading) {
    return <Loader message={'Loading...'} />;
  }

  if (forgot) {
    return (
      <>
        <View style={styles.body}>
          <View style={{padding: 15, marginTop: 40}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Icon
                name={'arrow-left'}
                size={22}
                color="black"
                style={{paddingRight: 0, marginTop: 5}}
              />
            </TouchableOpacity>
          </View>
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 4}}>
                <Text style={style.maintext}>Enter Your</Text>
                <Text style={style.maintext}>Mobile</Text>
                <Text style={style.maintext}>Number</Text>
              </View>
              <View style={{flex: 4}}>
                <Image
                  source={require('../../assets/icon/forgot-mobile.png')}
                  style={style.smallicon}
                />
              </View>
            </View>
            <Text style={{fontSize: 13, color: '#666', marginTop: 15}}>
              We will be send you OTP{' '}
            </Text>
            <View style={{marginTop: 30}}></View>
            <TextInput
              label="Mobile Number"
              mode="outlined"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="numeric"
              style={styles.inputBox}
              theme={style.textinput}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 15,
          }}>
          <View style={styles.roundbtnabs}>
            {btnLoginloading === false ? (
              <IconButton
                onPress={forgotSendOTP}
                style={styles.roundbtn}
                icon="arrow-right"
                color="#FFF"
                size={26}
              />
            ) : (
              <ActivityIndicator size={30} color="#FFF" style={styles.roundbtn} />
            )}

          </View>
        </View>
      </>
    );
  }

  if (forgototp) {
    return (
      <>
        <View style={styles.body}>
          <View style={{padding: 15, marginTop: 40}}></View>
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 4}}>
                <Text style={style.maintext}>Enter</Text>
                <Text style={style.maintext}>Verification</Text>
                <Text style={style.maintext}>OTP</Text>
              </View>
              <View style={{flex: 4}}>
                <Image
                  source={require('../../assets/icon/forgot-otp.png')}
                  style={style.smallicon}
                />
              </View>
            </View>
            <Text style={{fontSize: 13, color: '#666', marginTop: 15}}>
              OTP Sent to your mobile {mobile}
            </Text>
            <View style={{marginTop: 20}}></View>
            <TextInput
              label="OTP"
              mode="outlined"
              value={fotp}
              onChangeText={setFOTP}
              secureTextEntry={true}
              keyboardType="numeric"
              style={styles.inputBox}
              theme={style.textinput}
            />
            <View style={[style.forgetText, {marginTop: 15}]}>
              <TouchableOpacity onPress={resendOTP}>
                <Text>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 15,
          }}>
          <View style={styles.roundbtnabs}>

            {btnLoginloading === false ? (
              <IconButton
                onPress={VerifyForgotOTP}
                style={styles.roundbtn}
                icon="arrow-right"
                color="#FFF"
                size={26}
              />
            ) : (
              <ActivityIndicator size={30} color="#FFF" style={styles.roundbtn} />
            )}

          </View>
        </View>
      </>
    );
  }

  if (passwordpage) {
    return (
      <>
        <View style={styles.body}>
          <View style={{padding: 15, marginTop: 40}}></View>
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 4}}>
                <Text style={style.maintext}>Enter</Text>
                <Text style={style.maintext}>New</Text>
                <Text style={style.maintext}>Password</Text>
              </View>
              <View style={{flex: 4}}>
                <Image
                  source={require('../../assets/icon/forgot-password.png')}
                  style={style.smallicon}
                />
              </View>
            </View>
            <Text style={{fontSize: 13, color: '#666', marginTop: 15}}> </Text>
            <View style={{marginTop: 10}}></View>
            <TextInput
              label="New Password"
              mode="outlined"
              value={fpassword}
              secureTextEntry={true}
              onChangeText={setFPassword}
              style={style.inputBox}
              theme={style.textinput}
            />
            <TextInput
              label="Confirm New Password"
              mode="outlined"
              value={fcpassword}
              secureTextEntry={true}
              onChangeText={setFcPassword}
              style={style.inputBox}
              theme={style.textinput}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 15,
          }}>
          <View style={styles.roundbtnabs}>
          {btnLoginloading === false ? (
            <IconButton
              onPress={ChangePassword}
              style={styles.roundbtn}
              icon="arrow-right"
              color="#FFF"
              size={26}
            />
          ) : (
            <ActivityIndicator size={30} color="#FFF" style={styles.roundbtn} />
          )}
          </View>
        </View>
      </>
    );
  }
};
const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
  },
  image: {
    height: 250,
    width: '100%',
  },
  skips: {
    fontSize: 18,
    color: '#444',
    fontFamily: fontFamilyBold,
  },
  centerIcon: {
    marginTop: 40,
    padding: 20,
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  inputBtn2: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#FFF',
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
  },
  welcome: {
    fontSize: 30,
    color: '#000',
    fontFamily: fontFamilyBold,
  },
  signin: {
    fontSize: 20,
    color: '#AAA',
    fontFamily: fontFamilyNormal,
  },
  newuser: {
    color: '#000',
    fontFamily: fontFamilyNormal,
  },
  pagetitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#111',
    fontFamily: fontFamilyBold,
  },
  pagetitle2: {
    fontSize: 13,
    marginTop: 7,
    lineHeight: 22,
    textAlign: 'center',
    color: '#555',
    fontFamily: fontFamilyRegular,
  },
  filterlist: {
    marginBottom: 3,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  filtertext: {
    fontSize: 16,
    marginLeft: 18,
    marginTop: -5,
    marginBottom: 5,
    color: '#555',
    fontFamily: fontFamilyNormal,
  },

  inputBtn: {
    marginBottom: 20,
    marginTop: 5,
    padding: 10,
  },
  roundbtn: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 40,
  },
  roundbtnabs: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 15,
  },
  forgetText: {
    color: 'red',
    alignItems: 'center',
  },

  dashimage: {
    height: 250,
    width: '100%',
    backgroundColor: '#fff',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  smallicon: {
    height: 130,
    width: 130,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  maintext: {
    fontSize: 26,
    color: '#000',
    fontFamily: fontFamilyBold,
  },
  header: {
    backgroundColor: '#fff',
    position: 'relative',
    left: 0,
    right: 0,
    top: 40,
  },
  body: {
    backgroundColor: 'white',
    // padding: 10,
    width: '100%',
    height: '100%',
  },
});
export default ForgotPassword;
