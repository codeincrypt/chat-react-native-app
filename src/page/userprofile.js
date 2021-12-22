import React, {useState, useEffect, useContext} from 'react';
import {Appbar} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';

import Bottom from '../navs/Bottom';
import {fontFamilyNormal, fontFamilyRegular} from '../../constant/fonts';
import style from '../../style/style.js';

const userProfile = props => {
  const profile = props.route.params.userprofile;
  const [loading, setIsloading] = useState(true);

  useEffect(() => {}, []);

  const [animationValue] = useState(new Animated.Value(0));
  const [animationValue2] = useState(new Animated.Value(0));

  const backgroundInterpolate = animationValue.interpolate({
    inputRange: [0, 300],
    outputRange: ['white', '#000'],
  });

  const textInterpolate = animationValue2.interpolate({
    inputRange: [0, 300],
    outputRange: ['#000', 'white'],
  });

  const backgroundStyle = {
    backgroundColor: backgroundInterpolate,
  };

  const textStyle = {
    color: textInterpolate,
  };

  return (
    <>
      <SafeAreaView style={[style.body, {backgroundColor: '#FFF'}]}>
        {/* <Animated.View style={[styles.scrollViewStyle, backgroundStyle]}> */}
          <Appbar.Header style={style.header}>
            <Appbar.BackAction onPress={() => props.navigation.goBack()} />
            <Appbar.Content
              title="User Profile"
              titleStyle={style.headertitle}
              // titleStyle={[textStyle]}
            />
          </Appbar.Header>
        {/* </Animated.View> */}
        <ScrollView
          // scrollEventThrottle={16}
          // onScroll={Animated.event(
          //   [{nativeEvent: {contentOffset: {y: animationValue}}}],
          //   {useNativeDriver: false},
          // )}
          >
          <View style={{paddingBottom: 20, marginTop: -100}}>
            <Image
              source={{
                uri: profile.photo,
              }}
              style={{backgroundColor: '#FFF', width: '100%', height: 400, zIndex:9}}
            />
          </View>

          <View style={styles.lists}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'user'} size={26} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.title1}>Name</Text>
                <Text style={styles.title2}>{profile.name}</Text>
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
                <Text style={styles.title2}>{profile.mystatus}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.lists} onPress={() => Linking.openURL(`tel:${profile.contact}`)}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'phone'} size={26} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.title1}>Phone</Text>
                <Text style={styles.title2}>+91 {profile.contact}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.lists} onPress={() => Linking.openURL(`mailto:${profile.contact}`)}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.paymodeboxicon}>
                <Icon name={'envelope'} size={23} color="#333" />
              </View>
              <View style={{flex: 6}}>
                <Text style={styles.title1}>Email</Text>
                <Text style={styles.title2}>{profile.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
  scrollViewStyle: {
    height: 55,
  },
  theader: {
    backgroundColor: 'transparent',
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
  },
  theadertitle: {
    fontSize: 18,
    fontWeight: '300',
    marginLeft: -50,
    fontFamily: fontFamilyNormal,
    alignSelf: 'center',
  },
});
export default userProfile;
