import { BODY_STYLES, MAKES, MAKE_SELECTED, BODY_STYLE_SELECTED, USERS_CMS, DELETE_USER, TOGGLE_USER, USER_TO_BE_SAVED } from "./types";
import Axios from "axios";

export const getBodyStyles = () => dispatch => {
    fetch('http://ec2-18-218-233-7.us-east-2.compute.amazonaws.com/bodyStyles/')
    .then(response => response.json())
    .then(data => 
        dispatch({
            type: BODY_STYLES,
            payload: data
        })
    )
}

export const getMakes = () => dispatch => {
    fetch('http://ec2-18-218-233-7.us-east-2.compute.amazonaws.com/makes/')
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
    Axios.delete('http://ec2-18-218-233-7.us-east-2.compute.amazonaws.com/users' + index.id )
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

