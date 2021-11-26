import Contacts from 'react-native-contacts';
import _ from 'underscore';
import { ACTIONS } from '../types';

export const GET_CONTACT = (success, error) => async (dispatch) => {
  try {
    Contacts.getAll().then(contacts => {
      var sortedObjs = _.sortBy(contacts, 'displayName');
      success(sortedObjs)
      dispatch({type : ACTIONS.GET_CONTACT, payload : sortedObjs})
    })
  } catch (e) {
    error(e)
  }
}