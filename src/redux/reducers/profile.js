import { ACTIONS } from "../types"

const intitial_state = {
  "id": "",
  "name": "",
  "email": "",
  "contact": "",
  "status": "",
  "photo": ""
}

export default (state = intitial_state, action) => {

  switch(action.type) {
    case ACTIONS.GET_PROFILE:
      return {...action.payload}
    default:
      return state  
  }
     

}