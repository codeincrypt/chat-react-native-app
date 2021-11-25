import React, {useState, useEffect, useContext} from 'react';
import {Avatar, Appbar} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {UserContext} from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

import Bottom from '../navs/Bottom';
// import Loader from '../../constant/loader';

import {
  fontFamilyThin,
  fontFamilyNormal,
  fontFamilyRegular,
  fontFamilyBold,
} from '../../constant/fonts';
// import {getProfile} from '../request/userrequest';
import style from '../../style/style.js';

const MyaccountScreen = props => {
  const {signOut} = useContext(UserContext);
  const [token, setToken] = useState('');
  const [loading, setIsloading] = useState(true);

  const [profiledata, setProfileData] = useState('');
  const [profileimg, setProfileimg] = useState('https://api.lvkart.com/default/default-user.png');


  const signOuts = () => {
    signOut();
    setIsloading(true);
    // tokennow();
  };

  // const fetchProfile = e => {
  //   getProfile(e).then(async result => {
  //     if (result.status === 'fail') {
  //       ToastAndroid.show(result.message, ToastAndroid.LONG);
  //     } else {
  //       setProfileimg(result.profileimg);
  //       await setProfileData(result);
  //       await setIsloading(false);
  //     }
  //   });
  // };

  useEffect(() => {
    // tokennow();
    // props.navigation.addListener('focus', () => {
    //   tokennow();
    // });
  }, []);

  if (loading) {
    // return <Loader />;
  }

  return (
    <>
      <SafeAreaView style={style.body}>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content title="My Account" titleStyle={style.headertitle} />
        </Appbar.Header>
        <ScrollView>
          {profiledata.status === 0 ? (
            <>
              <View style={styles.kyccard}>
                <View style={styles.kycicon}>
                  <Icon name="info" size={20} color="#FFF" />
                </View>
                <View style={{flex: 8, paddingHorizontal: 10}}>
                  <Text style={styles.kyctitle}>Verification pending</Text>
                  <Text style={styles.kycsubtitle}>
                    Your profile verification was still pending.
                  </Text>
                </View>
              </View>
            </>
          ) : null}
          <View style={{backgroundColor: '#FFF', marginBottom: 7}}>
            {/* <View style={styles.profilebluebox}>
              <View style={styles.profile}>
                <View style={{flex: 2}}>
                  <Avatar.Image
                    style={{
                      backgroundColor: 'red',
                    }}
                    source={{
                      uri: profileimg,
                    }}
                    size={70}
                  />
                </View>
                <View style={styles.profilebox}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: '#000',
                      fontFamily: fontFamilyBold,
                    }}>
                    {profiledata.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 5,
                      color: '#000',
                      fontFamily: fontFamilyRegular,
                    }}>
                    ID :{profiledata.partnerid}
                  </Text>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                  <View style={style.pills}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#000',
                        fontFamily: fontFamilyBold,
                      }}>
                      {profiledata.rating}{' '}
                      <Icon name="star" size={20} color="#f1c40f" />
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 5,
                      color: '#000',
                      fontFamily: fontFamilyRegular,
                    }}>
                    rating
                  </Text>
                </View>
              </View>
            </View> */}
            {/* <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/mobile-black.png')}
                  style={styles.ImageStyle2}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize3}>
                  Phone : {profiledata.contact}
                </Text>
              </View>
            </View> */}
            {/* <View
              style={{flexDirection: 'row', marginTop: 7, marginBottom: 20}}>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/map-black.png')}
                  style={styles.ImageStyle2}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize3}>
                  Locality : {profiledata.address}
                </Text>
              </View>
            </View> */}
          </View>
{/* 
          <View style={style.bgwhite}>
            <TouchableOpacity
              style={styles.paymodebox}
              onPress={() =>
                props.navigation.navigate('Myprofile', {token: token})
              }>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/black-profile.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize}>Profile Detail</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymodebox}
              onPress={() => props.navigation.navigate('Myorder')}>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/black-order.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize}>Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymodebox}
              onPress={() =>
                props.navigation.navigate('Review', {token: token})
              }>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/review-comment.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize}>Review & Comments</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymodebox}
              onPress={() =>
                props.navigation.navigate('Password', {token: token})
              }>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/black-password.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize}>Password Setting</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymodebox}>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/black-help.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize}>Help</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymodebox}>
              <View style={styles.paymodeboxicon}>
                <Image
                  source={require('../../../assets/icon/black-faq.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize}>FAQ</Text>
              </View>
            </TouchableOpacity>
             </View>
 */}
            <TouchableOpacity
              style={styles.paymodebox}
              onPress={() => {
                signOuts();
              }}>
              <View style={styles.paymodeboxicon}>
                {/* <Image
                  source={require('../../assets/icon/black-logout.png')}
                  style={styles.ImageStyle}
                /> */}
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.typesize}>Logout</Text>
              </View>
            </TouchableOpacity>
         
        </ScrollView>

        <Bottom props={props}></Bottom>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
  },
  profilebluebox: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    padding: 16,
    paddingBottom: 30,
  },
  profilebox: {
    flex: 4,
    paddingLeft: 8,
  },
  myname: {
    fontSize: 20,
  },
  paymodebox: {
    padding: 15,
    paddingTop: 20,
    flexDirection: 'row',
    borderTopColor: '#EEE',
    borderTopWidth: 1,
  },
  paymodeboxicon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typesize: {
    fontSize: 14,
    fontFamily: fontFamilyNormal,
  },
  typesize2: {
    fontSize: 12,
    fontFamily: fontFamilyThin,
    color: '#777',
  },
  typesize3: {
    fontSize: 13,
    fontFamily: fontFamilyNormal,
    color: '#222',
  },
  ImageStyle: {
    padding: 5,
    height: 24,
    width: '100%',
    resizeMode: 'contain',
  },
  ImageStyle2: {
    padding: 5,
    height: 16,
    width: '100%',
    resizeMode: 'contain',
  },
  kyccard: {
    backgroundColor: '#E30047BB',
    padding: 12,
    flexDirection: 'row',
  },
  kycicon: {
    backgroundColor: '#ff7675',
    padding: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  kyctitle: {
    color: '#222',
    fontFamily: fontFamilyNormal,
    fontSize: 18,
    color: '#FFF',
  },
  kycsubtitle: {
    color: '#222',
    fontFamily: fontFamilyNormal,
    fontSize: 13,
    color: '#FFF',
  },
});
export default MyaccountScreen;
