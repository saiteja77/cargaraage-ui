import { BODY_STYLES } from "./types";

export const getBodyStyles = () => dispatch => {
    fetch('https://car-garaage-api.herokuapp.com/bodyStyles/')
    .then(response => response.json())
    .then(data => 
        dispatch({
            type: BODY_STYLES,
            payload: data
        })
    )
}