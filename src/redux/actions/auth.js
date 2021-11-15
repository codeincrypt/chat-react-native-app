import { URL_STRING, API_KEY } from '../../const/apitoken';
import { ACTIONS } from '../types';

const headers = {
  'Content-type': 'application/json',
  apikey: API_KEY,
  Authorization: 'Bearer ' + localStorage.getItem('lvkartmerchant'),
}

export const AUTH_LOGIN_MOBILE = async ({mobile}, success, error) => {
  try {
    const response = await fetch(`${URL_STRING}/authseller/merchant-login-mobile`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          mobile,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (e) {
    error(e)
  }
};

export const AUTH_LOGIN_PASSWORD = ({mobile, password}, success, error) => async (dispatch) => {
  try {
    const response = await fetch(
      `${URL_STRING}/authseller/merchant-login-password`,
      {
        headers,
        method: 'POST',
        body: JSON.stringify({
          mobile,
          password,
        }),
      }
    );
    const json = await response.json()
    success(json)
    dispatch({type : ACTIONS.LOGIN, payload : json})
  } catch (e) {
    error(e)
  }
};

export const GET_PROFILE =  (success,error) => async (dispatch) => {
  try {
    const response = await  fetch(`${URL_STRING}/merchant/profile`, {
      method : "GET",
      headers
    })
  
    const json = await response.json()
    success(json)
    dispatch({type : ACTIONS.GET_PROFILE, payload : json})
    
  } catch (e) {
      error(e)
  }
}