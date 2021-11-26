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
  paddbody: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  whitebody: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  bgwhite: {
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  mainheader: {
    backgroundColor: '#FFF',
    padding: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  header: {
    backgroundColor: '#222',
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
  },
  headertitle: {
    fontSize: 18,
    // fontWeight: '300',
    // marginLeft: -50,
    // fontFamily: fontFamilyNormal,
    // alignSelf: 'center',
    color: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: fontFamilyNormal,
  },
  slide: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  categoryslide: {
    flexDirection: 'row',
  },
  categoryname: {
    marginTop: 30,
    fontSize: 21,
    position: 'absolute',
    color: '#000',
    fontFamily: fontFamilyNormal,
    marginLeft: 30,
  },
  categorynameinfo: {
    marginTop: 80,
    fontSize: 13,
    position: 'absolute',
    color: '#666',
    fontFamily: fontFamilyThin,
    marginLeft: 30,
  },
  navimage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  smalltext: {
    color: '#222',
    paddingTop: 3,
    fontSize: 10,
  },

  smalldefaultbtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  inputBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  nodata: {
    paddingTop: '30%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  nodataicon: {
    width: '100%',
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  nodatatitle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#999',
  },
  nodataval: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#999',
  },

  cartheader: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  cartheadertext: {
    fontSize: 14,
    color: '#555',
    fontFamily: fontFamilyNormal,
  },
  filterbtn: {
    flex: 1,
    padding: 7,
    borderRadius: 0,
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

  pagetitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: fontFamilyBold,
  },
  pagetitlemd: {
    fontSize: 15,
    color: '#888',
    fontFamily: fontFamilyBold,
  },
  pagetitlemd2: {
    fontSize: 15,
    color: '#444',
    fontFamily: fontFamilyBold,
  },
  pagetitlethin: {
    fontSize: 15,
    color: '#000',
    fontFamily: fontFamilyThin,
  },

  slidercard: {
    backgroundColor: '#eee',
    borderRadius: 15,
    elevation: 5,
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#ddd',
    shadowOpacity: 0.7,
    margin: 10,
    height: 150,
  },
  sliderimage: {
    height: '100%',
    width: '100%',
  },

  pincodelist: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    margin: 5,
  },

  notificationcard: {
    backgroundColor: '#E30047',
    borderRadius: 10,
    elevation: 4,
    padding: 15,
    margin: 5,
    flexDirection: 'row',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 4,
    padding: 15,
    margin: 5,
  },
  boxcard: {
    backgroundColor: '#FFF',
    elevation: 4,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    padding: 20,
  },
  boxcardtext: {
    fontSize: 30,
    color: '#000',
    fontFamily: fontFamilyNormal,
  },
  boxtitle: {
    fontSize: 16,
    color: '#888',
    fontFamily: fontFamilyThin,
  },

  counting: {
    padding: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 40,
  },

  storecard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 4,
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#555',
    shadowOpacity: 0.7,
    margin: 5,
  },
  storeimage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  storename: {
    fontSize: 18,
    color: '#000',
    fontFamily: fontFamilyNormal,
  },
  storeaddress: {
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamilyThin,
  },
  storetype: {
    fontSize: 14,
    color: '#888',
    fontFamily: fontFamilyRegular,
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
  },
  inputBox: {
    fontSize: 15,
    height: 55,
    // borderRadius: 10,
    // padding:16,
    // borderColor:'#888',
    // borderWidth:1,
    marginBottom: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  inputBoxsm: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    height: 42,
  },
  inputicon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 22,
    right: 22,
  },

  buttonsm: {},
  buttonDark: {
    borderRadius: 0,
    padding: 8,
    backgroundColor: '#222',
  },
  buttonBrand: {
    borderRadius: 0,
    padding: 8,
    backgroundColor: '#E30047',
  },
  buttonDarkRounded: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#222',
  },
  bottomdarkbtn: {
    borderRadius: 10,
    margin: 10,
    padding: 8,
    backgroundColor: '#222',
  },
  roundfloatbtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 5,
    backgroundColor: '#222',
  },
  darkbtntext: {
    color: '#EEE',
    textTransform: 'none',
    fontSize: 14,
    fontFamily: fontFamilyNormal,
  },
  profileuploadicon: {
    borderRadius: 50,
    marginTop: -20,
    marginLeft: 60,
    padding: 9,
    backgroundColor: '#FFFFFFDD',
  },
  // NODATA
  ntext1: {
    color: '#333',
    paddingTop: 35,
    fontSize: 24,
    fontFamily: fontFamilyBold,
  },
  ntext2: {
    color: '#222',
    fontSize: 15,
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: fontFamilyThin,
  },
  ntext3: {
    color: '#222',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fontFamilyBold,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  nicon: {
    width: 120,
    height: 120,
  },
  nsection: {
    marginTop: 120,
    flex: 1,
    padding: 30,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  nsection2: {
    marginTop: 20,
    flex: 1,
    padding: 30,
    alignItems: 'center',
  },
  pills: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalicon: {
    padding: 5,
    height: 70,
    width: '100%',
    marginBottom: 25,
    resizeMode: 'contain',
  },
  popsubtitle: {
    color: '#BBB',
    fontFamily: fontFamilyNormal,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  poptitle: {
    color: '#000',
    fontFamily: fontFamilyNormal,
    fontSize: 17,
  },

  blueboxbg: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  bluebox: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    padding: 16,
    paddingBottom: 75,
  },
  textinput: {colors: {primary: '#000'}},

  lists: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  listicons: {
    flex: 2,
  },
  listicons2: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  listbody: {
    flex: 5,
    paddingLeft: 12,
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
    marginTop: 4,
    fontSize: 14,
    color: '#000',
  },
});
