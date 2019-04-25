import React from "react";
import {  MDBContainer, MDBRow, MDBCol  } from "mdbreact";
import Card from "./Card";

class BodyCarousel extends React.Component{

  render(){
    const properties = {
      card1 : {
        title : "Audi",
        src : "https://raw.githubusercontent.com/saiteja77/CarGaraage/master/images/Slide1.png",
        description: "Audi AG is a German automobile manufacturer that designs, engineers, produces, markets and distributes luxury vehicles"
      },
      card2 : {
        title : "Lamborghini",
        src : "https://raw.githubusercontent.com/saiteja77/CarGaraage/master/images/Slide2.jpg",
        description: "Automobili Lamborghini S.p.A. is an Italian brand and manufacturer of luxury sports cars and SUVs based in Sant'Agata Bolognese"
      },
      card3 : {
        title : "Bentley",
        src : "https://raw.githubusercontent.com/saiteja77/CarGaraage/master/images/Slide3.jpg",
        description: "Bentley Motors Limited is a British manufacturer and marketer of luxury cars and SUVs—and a subsidiary of the Volkswagen Group since 1998"
      }
  }
    return(
      <MDBContainer className="mt-5">
        <MDBRow style={{margin:"auto"}}>
          <MDBCol md="4" >
            <Card cardInfo = {properties.card1}/>
          </MDBCol>
          <MDBCol md="4">
            <Card cardInfo = {properties.card2}/>
          </MDBCol>
          <MDBCol md="4">
            <Card cardInfo = {properties.card3}/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}



export default BodyCarousel;