import { combineReducers } from 'redux'
import makesReducer from './makesReducer'

export default combineReducers({
    props: makesReducer
})