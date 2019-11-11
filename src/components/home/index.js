import React, {Component} from 'react'
import Nav from '../Layout/Nav'
import Carousel from './Carousal'
import Footer from '../Layout/Footer'
import Body from './Body';
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";

class Home extends Component{

    render(){
        const theme = createMuiTheme({
            palette: {
              primary: {
                main: "#752205"
              },
              secondary: {
                main: "#ffffff"
              }
            }
          });
        return (
        <MuiThemeProvider theme={theme}>
            <Nav/>
            <Carousel/>
            <Body/>
            <Footer/>
        </MuiThemeProvider>
        )
    }
  
}

export default Home;