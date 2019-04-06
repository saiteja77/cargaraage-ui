import React, {Component} from 'react'
import Nav from './nav'
import Carousel from './carousal'
import Footer from '../footer'

class Home extends Component{

    render(){
        return (
        <div>
            <Nav/>
            <Carousel/>
            <Footer/>
        </div>
        )
    }
  
}

export default Home;