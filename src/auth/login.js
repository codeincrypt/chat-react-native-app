import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {TextInput, Button, Snackbar, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-fast-toast';
import {PERMISSIONS, requestMultiple, checkMultiple} from 'react-native-permissions';

import {UserContext} from '../../App';
import style from '../../style/style';
import {
  fontFamilyBold,
  fontFamilyNormal,
  fontFamilyRegular,
  fontFamilyThin,
} from '../../constant/fonts';
import {
  getLoginMobile,
  getLoginPassword,
  getCreateAccount,
  getVerifyOTP,
  getResendOTP,
  getForgotOtpVerify,
  getForgotChangePassword,
} from './request';
// import {getAppSetting} from './../redux/store/index';
import {APPSVERSION} from '../../constant/config';

const LoginScreen = ({navigation, onDone}) => {
  const toast = useRef(null);

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const {signIn} = useContext(UserContext);
  // LOGIN
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // SIGNUP
  const [name, setName] = useState('');
  const [mobilereg, setMobilereg] = useState('');
  const [cropmobile, setCropMobile] = useState('');
  const [passwordreg, setPasswordreg] = useState('');
  const [otp, setOTP] = useState('');
  // FORGOT
  const [fotp, setFOTP] = useState('');
  const [fpassword, setFPassword] = useState('');
  const [fcpassword, setFcPassword] = useState('');

  const [loading, setIsloading] = useState(false);
  const [btnLoginloading, setBtnLoginloading] = useState(false);

  const [login, setLogin] = useState(true);
  const [loginpassword, setLoginPassword] = useState(true);
  const [signup, setSignup] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgototp, setForgotOtp] = useState(false);
  const [passwordpage, setNewPassword] = useState(false);

  const [passwordsecure, setPasswordsecure] = useState(true);
  const [visibleerror, setVisibleError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [appsettingdata, setAppsetting] = useState([]);

  useEffect(() => {
    appsetting();

    try {
      requestMultiple(
        Platform.select({
          android: [PERMISSIONS.ANDROID.READ_SMS, PERMISSIONS.ANDROID.RECEIVE_SMS, PERMISSIONS.ANDROID.READ_CONTACTS],
        }),
      ).then(() => {
        checkMultiple([PERMISSIONS.ANDROID.READ_SMS, PERMISSIONS.ANDROID.RECEIVE_SMS, PERMISSIONS.ANDROID.READ_CONTACTS]).then((statuses) => {
          if (statuses[PERMISSIONS.ANDROID.READ_SMS] === 'denied' || statuses[PERMISSIONS.RECEIVE_SMS] === 'denied' || statuses[PERMISSIONS.READ_CONTACTS] === 'denied') {
            console.log('denied');
            Alert.alert(
              'Warning!',
              'All services needs to be enabled',
              [
                {
                  text: 'Cancel',
                  onPress: () => props.navigation.navigate('Swipe'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => props.navigation.navigate('Swipe'),
                },
              ],
              { cancelable: false },
            );
          }
          console.log('location', statuses);
          if (statuses[PERMISSIONS.ANDROID.READ_SMS] === 'granted' && statuses[PERMISSIONS.ANDROID.RECEIVE_SMS] === 'granted' && statuses[PERMISSIONS.ANDROID.READ_CONTACTS] === 'granted') {
            console.log(statuses);
            // DeviceInfo.syncUniqueId().then(uniqueId => {
            //   setDevice(uniqueId)
            // });
            
            // let deviceId = DeviceInfo.getDeviceId();

              // DeviceInfo.getDeviceName().then(deviceName => {
              //   console.log('deviceName', deviceName)
              //   setDeviceName(deviceName)
              // });

              // let model = DeviceInfo.getModel();
              // setModel(model)
              // console.log('model', model)

              // let systemName = DeviceInfo.getSystemName();
              // setSystemName(systemName)
              // console.log('systemName', systemName)
              
              // let systemVersion = DeviceInfo.getSystemVersion();
              // console.log('systemVersion', systemVersion)
              // setSystemVersion(systemVersion)
              
              // let brand = DeviceInfo.getBrand();
              // setBrands(brand)
              // console.log('brands', brand)

              // DeviceInfo.getPhoneNumber()
              // .then(phoneNumber => {
              //   setPhonenumber(phoneNumber)
              //   console.log('phoneNumber', phoneNumber)
              // });
              
            
          } else {
            console.log('else');
            Alert.alert(
              'Warning!',
              'All services needs to be enabled',
              [
                {
                  text: 'Cancel',
                  onPress: () => props.navigation.navigate('SliderScreen'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => props.navigation.navigate('SliderScreen'),
                },
              ],
              { cancelable: false },
            );
          }
        });
      });
    } catch (error) {
      console.log('location set error:', error);
    }

  }, []);

  const appsetting = () => {
    // getAppSetting().then(result => {
    //   if (APPSVERSION !== result.appversion) {
    //     if (result.appupdate === 1) {
    //       setModalVisible(true);
    //       ToastAndroid.show(`A New version is available`, ToastAndroid.LONG);
    //     }
    //   }
    //   setAppsetting(result);
    // });
  };

  const setMobileregdata = e => {
    setMobilereg(e);
    var crop1 = e.substring(0, 2);
    var crop2 = e.substring(7, 10);
    var cropdata = `${crop1}XXXXX${crop2}`;
    setCropMobile(cropdata);
  };

  const setShowSignup = () => {
    setSignup(true);
    setLogin(false);
  };

  const setShowLogin = () => {
    setLogin(true);
    setSignup(false);
    setForgot(false);
  };

  const setShowForgot = () => {
    setForgot(true);
    setLogin(false);
  };

  const refRBSheet = useRef();
  // LOGIN A/C
  const Loginnow = () => {
    if (username === '') {
      return toast.current.show('Enter your mobile or email', {type: 'danger'});
    }

    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    var checkdata = validateEmail(username);
    if (checkdata === true) {
      setEmail(username);
    } else {
      setEmail(username);
    }
    // console.log('checkdata', checkdata, mobile);
    getLoginMobile(username).then(async result => {
      console.log('result', result);
      if (result.status === 'fail') {
        setBtnLoginloading(false);
        return toast.current.show(result.message, {type: 'danger'});
      } else {
        // setIsloading(true);
        setLogin(false);
        setLoginPassword(true);
        toast.current.show(result.message, {type: 'success'});
      }
    });
  };

  const Passwordnow = () => {
    if (password === '') {
      return toast.current.show('Enter your mobile or email', {type: 'danger'});
    }
    getLoginPassword(username, password).then(async result => {
      console.log('result', result);
      if (result.status === 'fail') {
        setBtnLoginloading(false);
        return toast.current.show(result.message, {type: 'danger'});
      } else {
        toast.current.show(result.message, {type: 'success'});
        await signIn(result.token);
      }
    });
  }
  // // REGISTER A/C
  // const RegisterAccount = () => {
  //   if (name === '' && name.toString().trim().length < 3) {
  //     return toast.current.show("Please Enter your name", { type: "danger" });
  //   }
  //   if (mobilereg.toString().length < 10) {
  //     return toast.current.show("Please enter 10 digit mobile number", { type: "danger" });
  //   }
  //   if (email === '') {
  //     return toast.current.show("Please enter Email Id", { type: "danger" });
  //   }
  //   if (passwordreg.toString().trim().length < 6) {
  //     return toast.current.show('Please enter 6 digit password', { type: "danger" });
  //   }
  //   getCreateAccount(name, mobilereg, email, passwordreg).then(result => {
  //     ToastAndroid.show(result.message, ToastAndroid.LONG);
  //     if (result.status === 'success') {
  //       refRBSheet.current.open();
  //     }
  //   });
  // };
  // // REGISTRATION RESEND OTP
  // const ResendRegOTP = () => {
  //   getResendOTP(mobilereg).then(result => {
  //     if (result.status === 'fail') {
  //       ToastAndroid.show(result.message, ToastAndroid.LONG);
  //     } else {
  //       ToastAndroid.show(
  //         `OTP Resend to mobile ${cropmobile}`,
  //         ToastAndroid.LONG,
  //       );
  //     }
  //   });
  // };
  // // REGISTRATION VERIFY OTP
  // const VerifyOTP = () => {
  //   if (otp.toString().trim().length !== 4) {
  //     return Alert.alert('Enter 4 digit vefication OTP');
  //   }
  //   getVerifyOTP(mobilereg, otp).then(result => {
  //     ToastAndroid.show(result.message, ToastAndroid.LONG);
  //     if (result.status === 'fail') {
  //     } else {
  //       refRBSheet.current.close();
  //       setIsloading(true);
  //       signIn(result.token);
  //     }
  //   });
  // };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="blue"
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      />
    );
  }

  if (login) {
    return (
      <SafeAreaView style={styles.body}>
        <Appbar.Header style={style.header}>
          <Appbar.Content
            title="Your Phone"
            titleStyle={style.headertitle}
          />
        </Appbar.Header>
        <Toast ref={toast} duration={3000} />
        <View style={{padding: 15}}>
          <View style={{marginTop: 50}}>
            <TextInput
              label="Mobile or Email Id"
              mode="outlined"
              style={style.inputBox}
              value={username}
              onChangeText={setUsername}
              theme={style.textinput}
            />

            <TouchableOpacity onPress={setShowForgot}>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 15,
                  textAlign: 'right',
                  fontFamily: fontFamilyNormal,
                  color: '#000',
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.roundbtnabs}>
          <Button
            mode="contained"
            style={styles.roundbtn}
            onPress={Loginnow}>
            <Icon name={'arrow-right'} size={26} color="#FFF" />
          </Button>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Image
                source={require('../../../assets/image/play-store.png')}
                style={styles.modalicon}
              /> */}
              <Text style={styles.modalTextTitle}>App Update Available</Text>
              <Text style={styles.modalTextSubtitle}>
                A New Version is available. Please upgrade now {'\n'}
                (Current: {APPSVERSION} Latest: {appsettingdata.appversion})
              </Text>
              <TouchableOpacity
                style={styles.modalicons}
                onPress={() => Linking.openURL(appsettingdata.androidlink)}>
                <Text style={styles.textStyle}>
                  <Icon name={'upload'} size={15} color="#e74c3c" /> Update Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    );
  }

  if (loginpassword) {
    return (
      <SafeAreaView style={styles.body}>
        <Appbar.Header style={style.header}>
          <Appbar.Content
            title="Your Password"
            titleStyle={style.headertitle}
          />
        </Appbar.Header>
        <Toast ref={toast} duration={3000} />
        <View style={{padding: 15}}>
          <View style={{marginTop: 50}}>
            <TextInput
              label="Password"
              mode="outlined"
              style={style.inputBox}
              value={password}
              onChangeText={setPassword}
              theme={style.textinput}
            />
          </View>
        </View>

        <View style={styles.roundbtnabs}>
          <Button
            mode="contained"
            style={styles.roundbtn}
            onPress={Passwordnow}>
            <Icon name={'arrow-right'} size={26} color="#FFF" />
          </Button>
        </View>

      </SafeAreaView>
    );
  }

  if (signup) {
    return (
      <SafeAreaView style={styles.body}>
        {/* <Toast ref={toast}
          duration={3000} 
        /> */}
        <View style={{padding: 15}}>
          <TouchableOpacity onPress={setShowLogin}>
            <Icon
              name={'arrow-left'}
              size={22}
              color="black"
              style={{paddingRight: 0, marginTop: 5}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={style.body}>
          <View style={{padding: 15}}>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <Text style={style.welcome}>Create Account,</Text>
                <Text style={style.signin}>Signup to get started!</Text>
              </View>
            </View>

            <View style={{marginTop: 50}}>
              <TextInput
                label="Name"
                mode="outlined"
                style={style.inputBox}
                value={name}
                onChangeText={setName}
                theme={{colors: {primary: 'transparent'}}}
              />
              <TextInput
                label="Mobile Number"
                mode="outlined"
                keyboardType={'phone-pad'}
                style={style.inputBox}
                value={mobilereg}
                onChangeText={setMobileregdata}
                theme={{colors: {primary: 'transparent'}}}
              />
              <TextInput
                label="Email Id"
                mode="outlined"
                style={style.inputBox}
                value={email}
                onChangeText={setEmail}
                theme={{colors: {primary: 'transparent'}}}
              />
              <TextInput
                label="Password"
                mode="outlined"
                style={style.inputBox}
                value={passwordreg}
                secureTextEntry={true}
                onChangeText={setPasswordreg}
                theme={{colors: {primary: 'transparent'}}}
              />
            </View>

            <Button
              mode="contained"
              style={style.bottomdarkbtn}
              onPress={RegisterAccount}>
              Create Account
            </Button>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <Text style={style.newuser}>Already have account? </Text>
              <TouchableOpacity onPress={setShowLogin}>
                <Text style={{fontFamily: fontFamilyBold, color: '#E30047'}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={330}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000099',
            },
            draggableIcon: {
              backgroundColor: '#BBB',
            },
          }}>
          <View style={{paddingHorizontal: 20, paddingTop: 15}}>
            <Text style={style.pagetitle}>Verify Phone</Text>
            <Text style={style.pagetitle2}>
              Enter the 4 digit verification code sent on your mobile number{' '}
              {cropmobile}
            </Text>
          </View>

          <View style={{padding: 15}}>
            <TextInput
              label="OTP"
              mode="outlined"
              style={style.inputBox}
              value={otp}
              onChangeText={setOTP}
              keyboardType={'number-pad'}
              theme={{colors: {primary: "transparent"}}}
            />

            <Button mode="contained" style={style.inputBtn} onPress={VerifyOTP}>
              Verify and Create Account
            </Button>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Text style={style.newuser}>Didn't receive code? </Text>
            <TouchableOpacity onPress={ResendRegOTP}>
              <Text style={{fontFamily: fontFamilyBold, color: '#E30047'}}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>

          <Snackbar visible={visibleerror}>
            OTP sent to mobile {mobilereg}.
          </Snackbar>
        </RBSheet> */}
      </SafeAreaView>
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
  inputBtn: {
    padding: 7,
    marginTop: 6,
    borderRadius: 5,
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

  inputBox: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderColor: 'red',
  },
  inputBtn: {
    marginBottom: 20,
    marginTop: 5,
    padding: 10,
  },
  roundbtn: {
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    width:65,
    height:65,
    backgroundColor:'#000',
    borderRadius:40,
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: '#e74c3c',
    fontFamily: fontFamilyNormal,
    textAlign: 'center',
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    fontFamily: fontFamilyBold,
  },
  modalTextSubtitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    color: '#999',
    fontFamily: fontFamilyNormal,
  },
  modalicons: {
    borderTopColor: '#EEE',
    borderTopWidth: 1,
    width: '100%',
    paddingTop: 15,
  },
  modalicon: {
    padding: 5,
    height: 70,
    width: '100%',
    marginBottom: 25,
    resizeMode: 'contain',
  },
});
export default LoginScreen;
