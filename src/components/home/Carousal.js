import React from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from 'mdbreact';

const Carousel = () => {
  return (
    <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true } className="z-depth-1">
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img className="d-block w-100" src="https://raw.githubusercontent.com/saiteja77/CarGaraage/master/images/Slide1.png" alt="First slide" />
          </MDBView>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img className="d-block w-100" src="https://raw.githubusercontent.com/saiteja77/CarGaraage/master/images/Slide2.jpg" alt="Second slide" />
          </MDBView>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img className="d-block w-100" src="https://raw.githubusercontent.com/saiteja77/CarGaraage/master/images/Slide3.jpg" alt="Third slide" />
          </MDBView>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
}

export default Carousel;