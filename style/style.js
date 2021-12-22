import {StyleSheet, Dimensions} from 'react-native';
import {
  fontFamilyBold,
  fontFamilyThin,
  fontFamilyNormal,
  fontFamilyRegular,
} from '../constant/fonts';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  body: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: '#111',
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
  },
  headertitle: {
    fontSize: 18,
    fontWeight: '300',
    marginLeft: -50,
    fontFamily: fontFamilyNormal,
    alignSelf: 'center',
    color: '#FFF',
  },
  leftheadertitle: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: fontFamilyNormal,
    color: '#FFF',
  },
  contactheadertitle: {
    fontSize: 19,
    fontWeight: '300',
    color: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: fontFamilyNormal,
  },
  textinput: {colors: {primary: '#000'}},
  lists: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    paddingBottom: 10,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  listicons: {
    flex: 2,
  },
  contactlisticons: {
    flex: 2,
    justifyContent: 'center', alignItems: 'center', alignContent: 'center', padding: 7 
  },
  listicons2: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  listbody: {
    flex: 8,
    paddingLeft: 12,
    paddingTop: 12,
  },
  listicon: {
    padding: 13,
    backgroundColor: '#fff',
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  listimage: {
    padding: 10,
    height: 30,
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  contactname: {
    fontSize: 17,
    color: '#000',
    fontWeight: '700',
  },
  contactnumber: {
    marginTop: 3,
    fontSize: 14,
    color: '#444',
  },
  statusmsg: {
    marginTop: 3,
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
  },

  roundbtn : {
    backgroundColor: 'transparent'
  },
  btnlg: {
    padding: 7,
    marginTop: 6,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  
  modalicon: {
    padding: 5,
    height: 70,
    width: '100%',
    marginBottom: 25,
    resizeMode: 'contain',
  },
  maintext: {
    fontSize: 26,
    color: '#000',
  },

  
    // NODATA
    ntext1: {
      color: '#333',
      paddingTop: 35,
      fontSize: 24,
      fontFamily:fontFamilyBold,
  },
    invitetext1: {
      color: '#333',
      paddingTop: 5,
      fontSize: 24,
      fontWeight: 'bold',
  },
    invitetext2: {
      color: '#333',
      paddingTop: 5,
      fontSize: 22,
      fontFamily:fontFamilyBold,
  },
  ntext2: {
      color: '#222',
      fontSize: 15,
      paddingTop: 10,
      textAlign:'center',
      fontFamily:fontFamilyThin,
  },
  ntext3: {
      color: '#222',
      fontSize: 16,
      textAlign:'center',
      fontFamily:fontFamilyBold,
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal:20,
  },
  nicon: {
    width: 120,
    height: 120,
  },
  nsection: {
      marginTop:120,
      flex:1,
      padding: 30,
      alignItems: 'center'
  },
  nsection2: {
      marginTop:20,
      flex:1,
      padding: 30,
      alignItems: 'center'
  },
});
