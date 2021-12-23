import { ACTIONS } from "../types"

const intitial_state = {
  contact: "",
  email: "",
  id: "",
  lastmsg: "",
  msgid: "",
  mystatus: "",
  name: "",
  photo: "",
  unseencount: "",
  userid: "",
  userstatus: "",
}

export default (state = intitial_state, action) => {

  switch(action.type) {
    case ACTIONS.GET_CHATLIST:
      return [...action.payload]
    default:
      return state  
  }
}