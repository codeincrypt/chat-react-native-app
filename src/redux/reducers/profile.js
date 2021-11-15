import { ACTIONS } from "../types"

const intitial_state = {
  "id": 0,
  "accountid": "",
  "merchanttype": "",
  "status": 0,
  "kycstatus": 0,
  "audioalert": 0,
  "name": "",
  "mobile": "",
  "email": "",
  "gender": "",
  "dob": "",
  "bizname": "",
  "bizurl": "",
  "photo": "",
  "bizimage": "",
  "bizmobile": "",
  "bizaddress": "",
  "bizcity": "",
  "bizpincode": "",
  "bizstate": "",
  "bizdist": "",
  "gst": "",
  "pan": "",
  "aadhar": "",
  "address": "",
  "city": "",
  "district": "",
  "state": "",
  "pincode": "",
  "storenav": "",
  "balance": "",
  "bankbalance": "",
  "cashbalance": "",
  "mainbalance": "",
  "store": 0
}

export default (state = intitial_state, action) => {

  switch(action.type) {
    case ACTIONS.GET_PROFILE:
      return {...action.payload}
    default:
      return state  
  }
     

}