import { URL_STRING, API_KEY } from '../../../constant/config';
import { ACTIONS } from '../types';
import AsyncStorage from '@react-native-community/async-storage';

export const GET_PROFILE =  (success,error) => async (dispatch) => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  try {
    const response = await  fetch(`${URL_STRING}/user/profile`, {
      method : "GET",
      headers : {
        'Content-type': 'application/json',
        apikey: API_KEY,
        Authorization: 'Bearer ' + token,
      }
    })
  
    const json = await response.json()
    success(json)
    dispatch({type : ACTIONS.GET_PROFILE, payload : json})
    
  } catch (e) {
    error(e)
  }
}

export const GET_CHATLIST =  (success,error) => async (dispatch) => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  try {
    const response = await  fetch(`${URL_STRING}/user/userList`, {
      method : "GET",
      headers : {
        'Content-type': 'application/json',
        apikey: API_KEY,
        Authorization: 'Bearer ' + token,
      }
    })
  
    const json = await response.json()
    success(json)
    dispatch({type : ACTIONS.GET_CHATLIST, payload : json})
    
  } catch (e) {
      error(e)
  }
}