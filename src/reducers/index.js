import { combineReducers } from 'redux'
import makesReducer from './makesReducer'
import selectedReducer from './selectedReducer';
import usersCmsReducer from './usersCmsReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    props: makesReducer,
    selection: selectedReducer,
    usersCms: usersCmsReducer,
    authReducer: authReducer,
    cart: cartReducer
})