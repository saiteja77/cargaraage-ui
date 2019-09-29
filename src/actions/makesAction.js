import { MAKES } from "./types";

export const getMakes = () => dispatch => {
    fetch('https://car-garaage-api.herokuapp.com/makes/')
    .then(response => response.json())
    .then(data => 
        dispatch({
            type: MAKES,
            payload: data
        })
    )
}