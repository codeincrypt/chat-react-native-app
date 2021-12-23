import { ACTIONS } from "../types"

const intitial_state = {
  id: "",
  status: "",
  statustext: "",
}

export default (state = intitial_state, action) => {

  switch(action.type) {
    case ACTIONS.GET_ABOUTUS:
      return [...action.payload]
    default:
      return state  
  }
}