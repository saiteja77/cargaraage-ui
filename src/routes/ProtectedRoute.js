import React from 'react'
import { connect } from 'react-redux'
import Page401 from '../errorcomponents/Page401';
import { Route} from 'react-router-dom'
import { saveUserToken } from '../actions';

function ProtectedRoute({component: Component, allowed: groups, ...rest}){
    React.useEffect(()=> {
        rest.saveUserToken()
    }, [])
    let authorized = true
    if(rest.decodedToken.hasOwnProperty('exp') && rest.decodedToken.group !== undefined){
        groups.forEach(element => {
            if(!rest.decodedToken.group.includes(element)) {
                authorized = false
            }
          })
    } else if(!rest.decodedToken.hasOwnProperty('exp')){
        authorized = false
    }
    return (
        authorized ? 
        (<Route {...rest} render={(props)=>(
            <Component {...props}/>
            )}/>) : <Page401/>
    )
}

const mapStateToProps = state => ({
    decodedToken: state.authReducer.decodedToken,
    cartItems: state.cart.cartItems
  })

export default connect(mapStateToProps, {saveUserToken})(ProtectedRoute)