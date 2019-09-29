import { MAKE_SELECTED, BODY_STYLE_SELECTED } from "../actions/types";

const initialState = {
    selectedMake: '',
    selectedBodyStyle: ''
}

export default function(state=initialState, action){
    switch(action.type){
        case MAKE_SELECTED:
            return{
                ...state,
                selectedMake: action.payload
            }
        case BODY_STYLE_SELECTED:
            return{
                ...state,
                selectedBodyStyle: action.payload
            }
        default: 
            return state
    }
}