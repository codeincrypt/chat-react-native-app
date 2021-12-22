import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button, Appbar, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-fast-toast';
import {
  PERMISSIONS,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions';
import DatePicker from 'react-native-date-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import moment from 'moment';

import {UserContext} from '../../App';
import style from '../../style/style';
import {
  fontFamilyBold,
  fontFamilyNormal,
  fontFamilyRegular,
} from '../../constant/fonts';
import {
  getLoginMobile,
  getLoginPassword,
  getSignupUsername,
  getVerifyOTP,
  getResendOTP,
  getSignupPassword,
  getSignupProfile,
  getForgotOtpVerify,
  getForgotChangePassword,
} from './request';
// import {getAppSetting} from './../redux/store/index';
import {APPSVERSION} from '../../constant/config';
import Loader from '../components/loading';
import {getAppSetting} from '../redux/actions/request';

const LoginScreen = ({navigation, onDone}) => {
  const toast = useRef(null);

  const {signIn} = useContext(UserContext);
  // LOGIN
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // SIGNUP
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [cropmobile, setCropMobile] = useState('');
  const [passwordreg, setPasswordreg] = useState('');
  const [cpasswordreg, setCpasswordreg] = useState('');
  const [otp, setOTP] = useState('');

  const [loading, setIsloading] = useState(false);
  const [btnLoginloading, setBtnLoginloading] = useState(false);

  const [login, setLogin] = useState(true);
  const [signupstep1, setSignupStep1] = useState(false);
  const [signupstep2, setSignupStep2] = useState(false);
  const [signupstep3, setSignupStep3] = useState(false);

  const [loginpassword, setLoginPassword] = useState(false);
  const [passwordsecure, setPasswordsecure] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [appsettingdata, setAppsetting] = useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const data = [{label: 'Male'}, {label: 'Female'}];

  const setDobDates = e => {
    setDate(e);
    const newdates = moment(e).format('DD-MM-YYYY');
    setDob(newdates);
  };

  useEffect(() => {
    appsetting();

    try {
      requestMultiple(
        Platform.select({
          android: [
            PERMISSIONS.ANDROID.READ_SMS,
            PERMISSIONS.ANDROID.RECEIVE_SMS,
            PERMISSIONS.ANDROID.READ_CONTACTS,
          ],
        }),
      ).then(() => {
        checkMultiple([
          PERMISSIONS.ANDROID.READ_SMS,
          PERMISSIONS.ANDROID.RECEIVE_SMS,
          PERMISSIONS.ANDROID.READ_CONTACTS,
        ]).then(statuses => {
          if (
            statuses[PERMISSIONS.ANDROID.READ_SMS] === 'denied' ||
            statuses[PERMISSIONS.RECEIVE_SMS] === 'denied' ||
            statuses[PERMISSIONS.READ_CONTACTS] === 'denied'
          ) {
            console.log('denied');
            Alert.alert(
              'Warning!',
              'All services needs to be enabled',
              [
                {
                  text: 'Cancel',
                  onPress: () => navigation.navigate('SliderScreen'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('SliderScreen'),
                },
              ],
              {cancelable: false},
            );
          }
          console.log('location', statuses);
          if (
            statuses[PERMISSIONS.ANDROID.READ_SMS] === 'granted' &&
            statuses[PERMISSIONS.ANDROID.RECEIVE_SMS] === 'granted' &&
            statuses[PERMISSIONS.ANDROID.READ_CONTACTS] === 'granted'
          ) {
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
                  onPress: () => navigation.navigate('SliderScreen'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('SliderScreen'),
                },
              ],
              {cancelable: false},
            );
          }
        });
      });
    } catch (error) {
      console.log('location set error:', error);
    }
  }, []);

  const appsetting = () => {
    getAppSetting().then(result => {
      if (APPSVERSION !== result.appversion) {
        if (result.appupdate === 1) {
          setModalVisible(true);
          ToastAndroid.show(`A New version is available`, ToastAndroid.LONG);
        }
      }
      setAppsetting(result);
    });
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
      setMobile('');
    } else {
      setMobile(username);
      setEmail();
    }
    setBtnLoginloading(true);
    getLoginMobile(username).then(async result => {
      if (result.status === 'fail') {
        setBtnLoginloading(false);
        setSignupStep1(true);
        setLogin(false);
        return toast.current.show(result.message, {type: 'danger'});
      } else {
        setBtnLoginloading(true);
        setLoginPassword(true);
        setLogin(false);
        toast.current.show(result.message, {type: 'success'});
      }
    });
  };

  const signup1ToLoginUsername = () => {
    setLogin(true);
    setSignupStep1(false);
  };

  const LoginPasswordToLoginUsername = () => {
    setLogin(true);
    setLoginPassword(false);
  };

  const Passwordnow = () => {
    if (password === '') {
      return toast.current.show('Enter your mobile or email', {type: 'danger'});
    }
    setBtnLoginloading(true);
    getLoginPassword(username, password).then(async result => {
      if (result.status === 'fail' && result.state === 'profile') {
        setSignupStep3(true);
        setLoginPassword(false);
        setBtnLoginloading(false);
        return toast.current.show(result.message, {type: 'danger'});
      } else if (result.status === 'fail') {
        setBtnLoginloading(false);
        return toast.current.show(result.message, {type: 'danger'});
      } else {
        setIsloading(true);
        setBtnLoginloading(false);
        const logging = async () => {
          setIsloading(false);
          await signIn(result.token);
        };
        setTimeout(logging, 2000);
      }
    });
  };
  // // REGISTER STEP - 2 - SET USERNAME - MOBILE, EMAIL
  const onSubmitSignupStep1 = () => {
    if (mobile.toString().length < 10) {
      return toast.current.show('Please enter 10 digit mobile number', {
        type: 'danger',
      });
    }
    if (email === '') {
      return toast.current.show('Please enter Email Id', {type: 'danger'});
    }
    setBtnLoginloading(true);
    getSignupUsername(mobile, email).then(result => {
      // ToastAndroid.show(result.message, ToastAndroid.LONG);
      if (result.status === 'success') {
        setBtnLoginloading(false);
        refRBSheet.current.open();
      } else {
        setBtnLoginloading(false);
        return toast.current.show(result.message, {type: 'danger'});
      }
    });
  };
  // // REGISTRATION RESEND OTP
  const ResendRegOTP = () => {
    getResendOTP(mobile).then(result => {
      if (result.status === 'fail') {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show(
          `OTP Resend to mobile ${cropmobile}`,
          ToastAndroid.LONG,
        );
      }
    });
  };
  // // REGISTRATION VERIFY OTP
  const VerifyOTP = () => {
    if (otp.toString().trim().length !== 4) {
      return Alert.alert('Enter 4 digit vefication OTP');
    }
    setBtnLoginloading(true);
    getVerifyOTP(mobile, otp).then(result => {
      ToastAndroid.show(result.message, ToastAndroid.LONG);
      if (result.status === 'fail') {
        setBtnLoginloading(false);
      } else {
        refRBSheet.current.close();
        setBtnLoginloading(false);
        setSignupStep2(true);
        setSignupStep1(false);
      }
    });
  };
  // // REGISTER STEP - 2 - SET PASSWORD
  const onSubmitSignupStep2 = () => {
    if (passwordreg.toString().trim().length < 6) {
      return toast.current.show('Please enter 6 digit password', {
        type: 'danger',
      });
    }
    if (cpasswordreg.toString().trim().length < 6) {
      return toast.current.show('Please confirm your password', {
        type: 'danger',
      });
    }
    if (passwordreg.toString().trim() !== cpasswordreg.toString().trim()) {
      return toast.current.show('Password did not match', {
        type: 'danger',
      });
    }
    setBtnLoginloading(true);
    getSignupPassword(mobile, passwordreg).then(result => {
      ToastAndroid.show(result.message, ToastAndroid.LONG);
      if (result.status === 'success') {
        setSignupStep3(true);
        setSignupStep2(false);
        setBtnLoginloading(false);
      } else {
        setBtnLoginloading(false);
      }
    });
  };
  // // REGISTER STEP - 3 - SET PROFILE - NAME, GENDER, DOB
  const onSubmitSignupStep3 = () => {
    if (name === '' && name.toString().trim().length < 3) {
      return toast.current.show('Please Enter your name', {type: 'danger'});
    }
    if (gender === '') {
      return toast.current.show('Please select your gender', {type: 'danger'});
    }
    if (dob === '') {
      return toast.current.show('Please select your date of birth', {
        type: 'danger',
      });
    }
    setBtnLoginloading(true);
    getSignupProfile(mobile, name, gender.label, dob).then(async result => {
      if (result.status === 'success') {
        toast.current.show(result.message, {type: 'success'});

        const greeting = async () => {
          setBtnLoginloading(false);
          setIsloading(true);
        };

        setTimeout(greeting, 1000);

        const logging = async () => {
          setIsloading(false);
          await signIn(result.token);
        };

        setTimeout(logging, 2000);
      }
    });
  };

  if (loading) {
    return <Loader message={'Loading...'} />;
  }

  if (login) {
    return (
      <SafeAreaView style={styles.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Your Phone" titleStyle={style.headertitle} />
        </Appbar.Header>
        <Toast ref={toast} duration={3000} />
        <View style={{padding: 15}}>
          <View style={{marginTop: 50}}>
            <TextInput
              label="Mobile or Email Id"
              mode="outlined"
              style={styles.inputBox}
              value={username}
              onChangeText={setUsername}
              theme={style.textinput}
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ForgotPassword', {mobile: mobile})
            }>
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

        <View style={styles.roundbtnabs}>
          {btnLoginloading === false ? (
            <IconButton
              onPress={Loginnow}
              style={styles.roundbtn}
              icon="arrow-right"
              color="#FFF"
              size={26}
            />
          ) : (
            <ActivityIndicator size={30} color="#FFF" style={styles.roundbtn} />
          )}
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={require('../../assets/image/play-store.png')}
                style={style.modalicon}
              />
              <Text style={styles.modalTextTitle}>App Update Available</Text>
              <Text style={styles.modalTextSubtitle}>
                A New Version is available. Please upgrade now {'\n'}
                (Current: {APPSVERSION} Latest: {appsettingdata.appversion})
              </Text>
              <TouchableOpacity
                style={styles.modalicon}
                onPress={() =>
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.intagedesign.chat',
                  )
                }>
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
          <Appbar.BackAction onPress={() => LoginPasswordToLoginUsername()} />
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
              style={styles.inputBox}
              value={password}
              secureTextEntry={passwordsecure}
              right={
                passwordsecure === true ? (
                  <TextInput.Icon
                    name="eye"
                    onPress={e => setPasswordsecure(false)}
                  />
                ) : (
                  <TextInput.Icon
                    name="eye-off"
                    onPress={e => setPasswordsecure(true)}
                  />
                )
              }
              onChangeText={setPassword}
              theme={style.textinput}
            />
          </View>
        </View>

        <View style={styles.roundbtnabs}>
          <IconButton
            onPress={Passwordnow}
            style={styles.roundbtn}
            icon="arrow-right"
            color="#FFF"
            size={26}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (signupstep1) {
    return (
      <SafeAreaView style={styles.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => signup1ToLoginUsername()} />
          <Appbar.Content title="Signup" titleStyle={style.headertitle} />
        </Appbar.Header>
        <Toast ref={toast} duration={3000} />
        <View style={{padding: 15}}>
          <View style={{marginTop: 50}}>
            <TextInput
              label="Mobile"
              mode="outlined"
              style={styles.inputBox}
              value={mobile}
              onChangeText={setMobile}
              theme={style.textinput}
            />
            <TextInput
              label="Email Id"
              mode="outlined"
              style={styles.inputBox}
              value={email}
              onChangeText={setEmail}
              theme={style.textinput}
            />
          </View>
        </View>

        <View style={styles.roundbtnabs}>
          <IconButton
            onPress={onSubmitSignupStep1}
            style={styles.roundbtn}
            icon="arrow-right"
            color="#FFF"
            size={26}
          />
        </View>

        <RBSheet
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
            <Text style={styles.pagetitle}>Verify Phone</Text>
            <Text style={styles.pagetitle2}>
              Enter the 4 digit verification code sent on your mobile number{' '}
              {cropmobile}
            </Text>
          </View>

          <View style={{padding: 15}}>
            <TextInput
              label="OTP"
              mode="outlined"
              secureTextEntry={true}
              style={styles.inputBox}
              value={otp}
              onChangeText={setOTP}
              keyboardType={'number-pad'}
              theme={style.textinput}
            />

            <Button mode="contained" style={style.btnlg} onPress={VerifyOTP}>
              Verify Mobile
            </Button>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Text style={styles.newuser}>Didn't receive code? </Text>
            <TouchableOpacity onPress={ResendRegOTP}>
              <Text style={{fontFamily: fontFamilyBold, color: '#000'}}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </SafeAreaView>
    );
  }

  if (signupstep2) {
    return (
      <SafeAreaView style={styles.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => signup1ToLoginUsername()} />
          <Appbar.Content title="Set Password" titleStyle={style.headertitle} />
        </Appbar.Header>
        <Toast ref={toast} duration={3000} />
        <View style={{padding: 15}}>
          <View style={{marginTop: 50}}>
            <TextInput
              label="Password"
              mode="outlined"
              style={styles.inputBox}
              value={passwordreg}
              secureTextEntry={true}
              onChangeText={setPasswordreg}
              theme={style.textinput}
            />
            <TextInput
              label="Confirm Password"
              mode="outlined"
              style={styles.inputBox}
              value={cpasswordreg}
              secureTextEntry={true}
              onChangeText={setCpasswordreg}
              theme={style.textinput}
            />
          </View>
        </View>

        <View style={styles.roundbtnabs}>
          <IconButton
            onPress={onSubmitSignupStep2}
            style={styles.roundbtn}
            icon="arrow-right"
            color="#FFF"
            size={26}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (signupstep3) {
    return (
      <SafeAreaView style={styles.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => signup1ToLoginUsername()} />
          <Appbar.Content
            title="Update Profile"
            titleStyle={style.headertitle}
          />
        </Appbar.Header>
        <Toast ref={toast} duration={3000} />
        <View style={{padding: 15}}>
          <View style={{marginTop: 50}}>
            <TextInput
              label="Name"
              mode="outlined"
              style={styles.inputBox}
              value={name}
              onChangeText={setName}
              theme={style.textinput}
            />

            <View style={{marginBottom: 10}}>
              <Text style={{color: '#444'}}>Gender</Text>
              <RadioButtonRN
                data={data}
                activeColor="#000"
                selectedBtn={e => setGender(e)}
                icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
              />
            </View>

            <DatePicker
              modal
              open={open}
              title="Select Date of Birth"
              textColor="gray"
              fadeToColor="none"
              date={date}
              androidVariant="nativeAndroid"
              mode="date"
              onConfirm={date => {
                setOpen(false);
                setDobDates(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <TextInput
              label="Date of Birth"
              mode="outlined"
              style={styles.inputBox}
              value={dob}
              disabled={true}
              onChangeText={setDob}
              theme={style.textinput}
              right={
                <TextInput.Icon name="calendar" onPress={() => setOpen(true)} />
              }
            />
          </View>
        </View>

        <View style={styles.roundbtnabs}>
          {btnLoginloading === false ? (
            <IconButton
              onPress={onSubmitSignupStep3}
              style={styles.roundbtn}
              icon="arrow-right"
              color="#FFF"
              size={26}
            />
          ) : (
            <ActivityIndicator size={30} color="#FFF" style={styles.roundbtn} />
          )}
        </View>
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
    // height: 70,
    width: '100%',
    // marginBottom: 10,
    // resizeMode: 'contain',
  },
});
export default LoginScreen;
