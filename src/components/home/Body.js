import React, {Component} from 'react';
import BodyCarousel from './CardCarousel';
import Panel from './HomePanel';

class Body extends Component{

    render(){
        return(
            <div>
                <Panel/>
                <BodyCarousel/>
            </div>
        );
    }
}

export default Body;