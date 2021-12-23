import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Profile from '../reducers/profile'
import Users from '../reducers/contactmatchuser'
import Aboutus from '../reducers/aboutus'
import Chatlist from '../reducers/chatlist'

const rootReducer = combineReducers({
  profile   : Profile,
  users     : Users,
  aboutus   : Aboutus,
  chatlist  : Chatlist,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store