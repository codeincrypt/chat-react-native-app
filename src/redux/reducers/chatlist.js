import { ACTIONS } from "../types"

const intitial_state = {
  "name": "",
  "email": "",
  "id": "",
  "contact": "",
  "userid": ""
}

export default (state = intitial_state, action) => {

  switch(action.type) {
    case ACTIONS.GET_CHATLIST:
      return {...action.payload}
    default:
      return state  
  }
     

}