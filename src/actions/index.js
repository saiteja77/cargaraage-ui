import { BODY_STYLES, MAKES, MAKE_SELECTED, BODY_STYLE_SELECTED } from "./types";

export const getBodyStyles = () => dispatch => {
    fetch('https://cargaraage-api.herokuapp.com/bodyStyles/')
    .then(response => response.json())
    .then(data => 
        dispatch({
            type: BODY_STYLES,
            payload: data
        })
    )
}

export const getMakes = () => dispatch => {
    fetch('https://cargaraage-api.herokuapp.com/makes/')
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