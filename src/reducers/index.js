import { combineReducers } from 'redux'
import makesReducer from './makesReducer'
import selectedReducer from './selectedReducer';
import usersCmsReducer from './usersCmsReducer';

export default combineReducers({
    props: makesReducer,
    selection: selectedReducer,
    usersCms: usersCmsReducer
})