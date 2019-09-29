import React, {Component} from 'react'
import Nav from '../Layout/Nav'
import Carousel from './Carousal'
import Footer from '../Layout/Footer'
import Body from './Body';

class Home extends Component{

    render(){
        return (
        <div>
            <Nav/>
            <Carousel/>
            <Body/>
            <Footer/>
        </div>
        )
    }
  
}

export default Home;