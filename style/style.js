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
    marginVertical: 5,
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

  roundbtn : {
    backgroundColor: 'transparent'
  }
});
