import {CART} from '../actions/types'

const initialState = {
    cartItems: [],
    quantity: 0
}

export default function(state=initialState, action){
    switch(action.type){
        case CART:
            const quantity = action.payload.map(car=>car.quantity).reduce((a,b) => a+b, 0)
            return{
                ...state,
                cartItems: action.payload,
                quantity: quantity
            }
        default:
            return state
    }
}