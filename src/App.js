import React from 'react'
import Home from './components/home';
import { Provider } from 'react-redux'
import store from './stores'

export default class extends React.Component{
    
  render(){
    return (
        <Provider store = {store}>
            <Home/>
        </Provider>
    )
  }
}
