import { combineReducers } from 'redux'
import makesReducer from './makesReducer'
import selectedReducer from './selectedReducer';

export default combineReducers({
    props: makesReducer,
    selection: selectedReducer
})