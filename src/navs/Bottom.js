import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {fontFamilyNormal} from '../../constant/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
// import DeviceInfo from 'react-native-device-info';

const Bottom = ({props}) => {
  const RedirectModule = async link => {
    await props.navigation.navigate(link);
  };

  const [battery, setBattery] = useState('');

  useEffect(() => {
    DeviceIn();
  }, []);

  const DeviceIn = () => {
  //   DeviceInfo.getBatteryLevel().then(batteryLevel => {
  //     setBattery(parseFloat(batteryLevel) * 100);
  //   });
  };
  return (
    <>
      {/* {battery < 15 ? (
        <View style={styles.batterycard}>
          <View style={styles.batteryicon}>
            <Icon name="info" size={20} color="#FFF" />
          </View>
          <View style={{flex:8, paddingHorizontal:10}}>
            <Text style={styles.batterytitle}>Battery is low</Text>
            <Text style={styles.batterysubtitle}>Charge your phone to atleast 15% to go online</Text>
          </View>
        </View>
      ) : null} */}
      <View
        style={{
          position: 'relative',
          left: 0,
          right: 0,
          bottom: 0,
          bottomTop: 200,
        }}>
        <View style={styles.footer}>

          <TouchableOpacity
            onPress={e => RedirectModule('Home')}
            style={styles.bottombtn}>
            <Image
              source={require('../../assets/image/icon2.png')}
              resizeMode={'contain'}
              style={styles.icons}
            />
            <Text style={styles.footertext}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={e => RedirectModule('Contact')}
            style={styles.bottombtn}>
            <Image
              source={require('../../assets/image/icon2.png')}
              resizeMode={'contain'}
              style={styles.icons}
            />
            <Text style={styles.footertext}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={e => RedirectModule('Myaccount')}
            style={styles.bottombtn}>
            <Image
              source={require('../../assets/image/icon2.png')}
              resizeMode={'contain'}
              style={styles.icons}
            />
            <Text style={styles.footertext}>Profile</Text>
          </TouchableOpacity>

        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  footer: {
    borderTopColor: '#EEE',
    borderTopWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    elevation: 5,
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#EEE',
    shadowOpacity: 0.7,
  },
  footertext: {
    color: '#222',
    fontFamily: fontFamilyNormal,
    paddingTop: 3,
    fontSize: 10,
  },
  icons: {
    width: 25,
    height: 25,
  },
  bottombtn: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  batterycard : {
    backgroundColor: '#E30047BB', padding:12, flexDirection:'row'
  },
  batteryicon : {
    backgroundColor: '#ff7675', padding:5, width:40, height:40, borderRadius:20, justifyContent:'center', alignContent:'center', alignItems:'center', flex:1
  },
  batterytitle : {
    color: '#222',
    fontFamily: fontFamilyNormal,
    fontSize: 18,
    color:'#FFF'
  },
  batterysubtitle : {
    color: '#222',
    fontFamily: fontFamilyNormal,
    fontSize: 13,
    color:'#FFF'
  },
});
export default Bottom;
