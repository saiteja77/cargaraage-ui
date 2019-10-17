import { DELETE_USER, USERS_CMS, TOGGLE_USER, USER_TO_BE_SAVED } from "../actions/types";

const initialState = {
    
    users: [],
    deletedUser: null,
    editUser: {
        value: false,
        id: null
    },
    userToBeSaved: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case USERS_CMS:
            return {
                ...state,
                users: action.payload
            }
        case DELETE_USER: 
            const newArray = ({...state}).users.filter((item,index) => item.id !== action.payload.id);
            return {
                ...state,
                users: newArray,
                deletedUser: action.payload.id
            }
        case TOGGLE_USER: 
            return {
                ...state,
                editUser: action.payload
            }
        case USER_TO_BE_SAVED:
            return {
                ...state,
                userToBeSaved: action.payload
            }
        default:
            return {
                ...state
            }
    }
    
}