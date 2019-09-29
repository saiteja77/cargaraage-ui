import { MAKES, BODY_STYLES } from "../actions/types";

const initialState = {
    makes: [],
    bodyStyles: []
}

export default function(state=initialState, action){
    switch(action.type){
        case MAKES:
            return{
                ...state,
                makes: action.payload
            }
        case BODY_STYLES:
            return{
                ...state,
                bodyStyles: action.payload
            }
        default: 
            return state
    }
}