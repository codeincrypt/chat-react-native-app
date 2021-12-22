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

export const GET_CHATVIEW = async (id) => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/userMessage/${id}`, {
    method:'GET',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    }
  });
  const data = await response.json();
  return data;
};

export const getProfile = async () => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/profile`, {
    method:'GET',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    }
  });
  const data = await response.json();
  return data;
};


export const uploadProfilePicture = async (image) => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  var filesname = image.path.substring(image.path);
  const data = new FormData();
    data.append('photo', {
      uri: image.path,
      type: image.mime,
      name: filesname,
    });
    const response = await fetch(`${URL_STRING}/user/updatePhoto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        apikey: API_KEY,
        Authorization: 'Bearer ' + token,
      },
      body: data,
    });
    const newdata = await response.json();
    return newdata;
}

export const getStatusList = async () => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/statusList`, {
    method:'GET',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    }
  });
  const data = await response.json();
  return data;
};

export const getChatList = async () => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/userList`, {
    method:'GET',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    }
  });
  const data = await response.json();
  return data;
};

export const moveToSeen = async (userid) => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/moveToSeen/${userid}`, {
    method:'GET',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    }
  });
  const data = await response.json();
  return data;
};

export const getAllUserList = async () => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/chatContactUser`, {
    method:'GET',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    }
  });
  const data = await response.json();
  return data;
};

export const sendMessage = async (userid, message) => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/sendMessage`, {
    method:'POST',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      userid, message
    }),
  });
  const data = await response.json();
  return data;
};

export const getUpdateStatus = async (mystatus) => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/updateStatus`, {
    method:'POST',
    headers : {
      'Content-type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      mystatus
    }),
  });
  const data = await response.json();
  return data;
};

export const getAppSetting = async () => {
  const token = await AsyncStorage.getItem('thelvchatapp');
  const response = await fetch(`${URL_STRING}/user/appsetting`, {
    headers : {
      'Content-Type': 'application/json',
      apikey: API_KEY,
      Authorization: 'Bearer ' + token,
    },
    method:"GET",
  });
  const data = await response.json();
  return data;
};

