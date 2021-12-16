import React, {useState, useEffect, useContext} from 'react';
import {Avatar, Appbar} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {UserContext} from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';

import {connect} from 'react-redux';
import {GET_PROFILE, GET_CHATLIST, getProfile} from '../redux/actions/request';

import Bottom from '../navs/Bottom';
import {
  fontFamilyThin,
  fontFamilyNormal,
  fontFamilyRegular,
  fontFamilyBold,
} from '../../constant/fonts';
import style from '../../style/style.js';

const MyaccountScreen = props => {
  const {signOut} = useContext(UserContext);
  const [loading, setIsloading] = useState(true);

  const [profiledata, setProfile] = useState('');
  const [profileimg, setProfileimg] = useState(
    'https://chatapi.lvkart.com/default/default-user.png',
  );

  // props.GET_PROFILE((data) => {
  //   console.log('GET_PROFILE', data)
  //   setProfileData(data)
  //   setProfileimg(data.photo)
  // }, (e) => console.log({e}))

  const fetchProfile = () => {
    getProfile().then(data => {
      setProfile(data);
      setProfileimg(data.photo);
    });
  };

  const signOuts = () => {
    signOut();
    setIsloading(true);
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.5,
    }).then(image => {
      setProfileimg(image.path);
      changeProfilePhoto(image);
    });
  };

  useEffect(() => {
    fetchProfile();
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
          <View style={styles.profilebluebox}>
            <View style={styles.profile}>
              <Avatar.Image
                style={{
                  backgroundColor: '#fff',
                }}
                source={{
                  uri: profileimg,
                }}
                size={120}
              />
              <TouchableHighlight
                onPress={selectImage}
                style={styles.profileuploadicon}
                underlayColor="#FFFFFF55">
                <Icon name={'camera'} size={15} color="#222" />
              </TouchableHighlight>
            </View>
            <View style={styles.profilebox}>
              <Text style={styles.username}>{profiledata.name}</Text>
              <Text style={styles.usertext}>+91 {profiledata.contact}</Text>
              <Text style={styles.usertext}>{profiledata.email}</Text>
            </View>
          </View>

          <View style={{backgroundColor: '#FFF', marginBottom: 7}}>
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilebluebox: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: '#000',
  },
  profilebox: {
    marginTop: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    marginBottom: 6,
    color: '#fff',
    fontFamily: fontFamilyRegular,
  },
  usertext: {
    marginTop: 3,
    fontSize: 14,
    color: '#EEE',
    fontFamily: fontFamilyNormal,
  },
  profileuploadicon: {
    borderRadius: 50,
    marginTop: -20,
    marginLeft: 60,
    padding: 8,
    backgroundColor: '#FFFFFFDD',
  },
});
export default MyaccountScreen;
