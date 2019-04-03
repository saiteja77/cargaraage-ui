import React, {Component} from 'react'
import Nav from './nav'
import Carousel from './carousal'

class Home extends Component{

    render(){
        return (
        <div>
            <Nav/>
            <Carousel/>
        </div>
        )
    }
  
}

export default Home;