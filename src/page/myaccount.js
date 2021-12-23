import React, {useState, useEffect, useContext} from 'react';
import {Avatar, Appbar, List} from 'react-native-paper';
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

import { uploadProfilePicture} from '../redux/actions/request';
import {connect} from 'react-redux';

import { GET_PROFILE, GET_STATUS} from '../redux/actions/request';

import Bottom from '../navs/Bottom';
import {
  fontFamilyNormal,
  fontFamilyRegular,
} from '../../constant/fonts';
import style from '../../style/style.js';

const MyaccountScreen = (props) => {
  const profile = props.profile;
  const {signOut} = useContext(UserContext);
  const [loading, setIsloading] = useState(true);

  const [profiledata, setProfile] = useState(profile);
  const [profileimg, setProfileimg] = useState('https://chatapi.lvkart.com/default/default-user.png');

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

  const changeProfilePhoto = (image) => {
    uploadProfilePicture(image).then(profile => {
      
    })
  }

  const fetchProfile = () => {
    props.GET_PROFILE((data) => {
      setProfile(data)
    }, (e) => console.log({e}))
  }

  useEffect(() => {
    setProfileimg(profile.photo)
    fetchProfile();
    props.navigation.addListener('focus', () => {
      fetchProfile();
    });
    props.GET_STATUS((data) => console.log(''), (e) => console.log({e}))
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
                  backgroundColor: '#FFF',
                }}
                source={{
                  uri: profileimg,
                }}
                size={160}
              />
              <TouchableHighlight
                onPress={selectImage}
                style={styles.profileuploadicon}
                underlayColor="#FFFFFF55">
                <Icon name={'camera'} size={18} color="#FFF" />
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.lists}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'user'} size={26} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.title1}>Name</Text>
                <Text style={styles.title2}>{profiledata.name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.lists}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'info-circle'} size={26} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.title1}>About</Text>
                <Text style={styles.title2}>{profiledata.status}</Text>
              </View>
              <TouchableOpacity style={styles.paymodeboxicon2}
                onPress={() => props.navigation.navigate('MyStatus')}>
                <Icon name={'pencil'} size={18} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lists}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'phone'} size={26} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.title1}>Phone</Text>
                <Text style={styles.title2}>+91 {profiledata.contact}</Text>
              </View>
            </View>
          </View>

          <View style={styles.lists}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'envelope'} size={23} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.title1}>Email</Text>
                <Text style={styles.title2}>{profiledata.email}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.lists}
            onPress={() => {
              signOuts();
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'sign-in'} size={26} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.logout}>Logout</Text>
              </View>
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
    backgroundColor: '#FFF',
  },
  profilebox: {
    marginTop: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    marginBottom: 6,
    color: '#000',
    fontFamily: fontFamilyRegular,
  },
  usertext: {
    marginTop: 3,
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamilyNormal,
  },
  profileuploadicon: {
    borderRadius: 50,
    marginTop: -40,
    marginLeft: 110,
    padding: 15,
    backgroundColor: '#000',
  },
  paymodeboxicon: {
    padding: 12,
    paddingRight: 20,
  },
  paymodeboxicon2: {
    padding: 8,
    paddingRight: 20,
  },
  title1: {
    color: '#000',
    fontSize: 14,
    paddingTop: 2,
    paddingLeft: 10,
  },
  title2: {
    color: '#000',
    fontSize: 18,
    paddingTop: 2,
    paddingLeft: 10,
  },
  logout: {
    color: '#000',
    fontSize: 18,
    paddingTop: 14,
    paddingLeft: 10,
  },
  lists: {
    backgroundColor: '#FFF',
    marginBottom: 5,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = ({profile}) => {
  return {
    profile
  };
};

export default connect(mapStateToProps, {GET_PROFILE, GET_STATUS})(MyaccountScreen);

