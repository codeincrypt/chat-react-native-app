import { ACTIONS } from "../types"

const intitial_state = {}

export default (state = intitial_state, action) => {

  switch(action.type) {
    case ACTIONS.GET_CONTACT:
      return {...action.payload}
    default:
      return state  
  }
     

}