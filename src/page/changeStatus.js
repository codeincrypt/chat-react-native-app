import React, {useState, useEffect, useRef} from 'react';
import {Divider, Appbar, List, TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RBSheet from 'react-native-raw-bottom-sheet';

import {fontFamilyBold, fontFamilyNormal, fontFamilyRegular} from '../../constant/fonts';
import style from '../../style/style.js';
import {getUpdateStatus} from '../redux/actions/request';
import Loader from '../components/loading';

const MyStatusScreen = props => {
  const profiledata = props.route.params.profile;
  const statuslist = props.route.params.statuslist;

  const [loading, setIsloading] = useState(false);

  const refRBSheet = useRef();

  const [mystatusform, setmystatusform] = useState(false);
  const [mystatus, setmystatus] = useState(profiledata.status);

  const updateStatus = mystatus => {
    setIsloading(true);
    getUpdateStatus(mystatus).then(result => {
      setmystatus(mystatus);
      if (result.status === 'success') {
        setIsloading(false);
        refRBSheet.current.close();
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      }
    });
  };

  const SaveNewAbout = () => {
    updateStatus(mystatus)
  }

  const openAbout = () => {
    refRBSheet.current.open();
  }

  const cancelAbout = () => {
    refRBSheet.current.close();
  }

  useEffect(() => {}, []);

  const ItemList = ({item, index}) => {
    return (
      <List.Item
        onPress={() => {
          updateStatus(item.statustext);
        }}
        title={item.statustext}
      />
    );
  };

  return (
    <SafeAreaView style={style.body}>
      <Appbar.Header style={style.header}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="About" titleStyle={style.headertitle} />
      </Appbar.Header>
      {loading && (
        <Loader message={'Updating...'} />
      )}

          <List.Item
            titleStyle={{
              fontSize: 11,
              fontWeight: '700',
            }}
            title="CURRENTLY"
          />
          {/* <TouchableOpacity onPress={openAbout}> */}
          <List.Item
            onPress={() => {
              openAbout()
            }}
            title={mystatus}
            right={props => <List.Icon {...props} icon="pencil" />}
          />
          {/* </TouchableOpacity> */}
          <Divider />
          <List.Item
            titleStyle={{
              fontSize: 11,
              fontWeight: '700',
            }}
            title="SELECT ABOUT"
          />
          <FlatList
            data={statuslist}
            renderItem={ItemList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />


      <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={250}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000099',
            },
            draggableIcon: {
              backgroundColor: '#BBB',
            },
          }}>
          <View style={{paddingHorizontal: 20, paddingTop: 15}}>
            <Text style={styles.pagetitle}>Update About</Text>
          </View>

          <View style={{padding: 15}}>
            <TextInput
              // label="About"
              // mode="outlined"
              multiline={true}
              style={styles.inputBox}
              value={mystatus}
              onChangeText={setmystatus}
              theme={style.textinput}
            />
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{alignItems:'flex-end',padding:20}} onPress={cancelAbout}>
                <Text style={{color: "#E30047", fontWeight: 'bold', fontSize: 16}}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'flex-end',padding:20}} onPress={SaveNewAbout}>
                <Text style={{color: "#000", fontWeight: 'bold', fontSize: 16}}>UPDATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
     

    </SafeAreaView>
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
  overlaybox: {
    backgroundColor: '#FFF',
    width: '85%',
    height: 80,
    borderRadius: 5,
    flexDirection: 'row',
    textAlign: 'center',
    zIndex:9,
  },
  loading: {
    position: 'absolute',
    zIndex:1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00000088',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  pagetitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
    fontFamily: fontFamilyBold,
  },
});
export default MyStatusScreen;
