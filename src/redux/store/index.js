import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Profile from '../reducers/profile'


const rootReducer = combineReducers({
  profile : Profile
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store