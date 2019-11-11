import { BODY_STYLES, MAKES, MAKE_SELECTED, BODY_STYLE_SELECTED, USERS_CMS, DELETE_USER, TOGGLE_USER, USER_TO_BE_SAVED, LOGIN, CART } from "./types";
import Axios from "axios"
import jwt from 'jwt-decode'

export const getBodyStyles = () => dispatch => {
    fetch('https://saiteja.dev/cars-api/bodyStyles/')
    .then(response => response.json())
    .then(data => 
        dispatch({
            type: BODY_STYLES,
            payload: data
        })
    )
}

export const getMakes = () => dispatch => {
    fetch('https://saiteja.dev/cars-api/makes/')
    .then(response => response.json())
    .then(data => 
        dispatch({
            type: MAKES,
            payload: data
        })
    )
}

export const setSelected = props => dispatch => {
    if(props.type === 'Make'){
        dispatch({
            type: MAKE_SELECTED,
            payload: props.value
        })
    } else{
        dispatch({
            type: BODY_STYLE_SELECTED,
            payload: props.value
        })
    } 
}

export const setUsersCms = props => dispatch => {
        dispatch({
            type: USERS_CMS,
            payload: props
        })
}

export const deleteUser = index => dispatch => {
    Axios.delete('https://saiteja.dev/cars-api/users' + index.id )
    .then(response => console.log)
    .catch(error => console.log)
    dispatch({
        type: DELETE_USER,
        payload: index
    })
}

export const userTobeSaved = props => dispatch => {
    dispatch({
        type: USER_TO_BE_SAVED,
        payload: props
    })
}

export const toggleEditUser = props => dispatch => {
    dispatch({
        type: TOGGLE_USER,
        payload: props
    })
}

export const saveUserToken = () => dispatch => {
    if(localStorage.getItem("cg-tk")){
        const decodedToken = jwt(localStorage.getItem("cg-tk"))
        dispatch({
            type: LOGIN,
            payload: decodedToken
        })
    } else {
        dispatch({
            type: LOGIN,
            payload: {}
        })
    }
}

export const addToCart = props => dispatch => {
    dispatch({
        type: CART,
        payload: props
    })
}