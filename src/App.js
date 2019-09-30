import React from 'react'
import { Provider } from 'react-redux'
import store from './stores'
import Routes from './routes';

export default class extends React.Component{
    
  render(){
    return (
        <Provider store = {store}>
          <Routes/>
        </Provider>
    )
  }
}
