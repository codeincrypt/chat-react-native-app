import { ACTIONS } from "../types"

const intitial_state = {
  contact: "",
  email: "",
  id: "",
  mystatus: "",
  name: "",
  photo: "",
}

export default (state = intitial_state, action) => {

  switch(action.type) {
    case ACTIONS.GET_USERS:
      return [...action.payload]
    default:
      return state  
  }
}