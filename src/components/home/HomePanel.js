import React, { Fragment } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBContainer } from "mdbreact"
import SelectInputField from './SelectInputField'
import Modal from './AdvancedSearchModal'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

class Panel extends React.Component {

    state = {
        optionValue: '',
        open: false,
        allMakes: [],
        bodyStyles: [],

    }
    handleClickOpen = (e) => {
        e.preventDefault()
        if (this.state.open === false) {
            this.setState({ open: true });
        }
        else {
            this.setState({ open: false })
        }
    }

    componentDidMount(){
        Axios.get('https://car-garaage-api.herokuapp.com/makes/').then(response=>{
            this.setState({allMakes: response.data})
        })
        Axios.get('https://car-garaage-api.herokuapp.com/bodyStyles/').then(response=>{
            this.setState({bodyStyles: response.data})
        })
    }
    
    render() {

        return (
            <Fragment>
                {this.state.allMakes.length !== 0 && this.state.bodyStyles.length !== 0 &&
                    <MDBContainer style={{ marginTop: "-1rem", zIndex: "1" }}>
                    <MDBCard style={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
                        <MDBCardHeader style={{ background: "#752205", color: "white" }}>
                            What are you looking for?
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>Search By</MDBCardTitle>
                            <MDBCardText>
                                <SelectInputField optionValue={this.state.allMakes} label="Make"></SelectInputField>
                                <SelectInputField optionValue={this.state.bodyStyles} label="Body Style"></SelectInputField>
                                <Button style={{backgroundColor:'rgb(117, 34, 5)', color: '#fff', marginTop:'10px', marginLeft:'5px'}}>Search</Button>
                            </MDBCardText>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={this.handleClickOpen}
                                style={{ float: 'right', color: '#752205'}}
                            >
                                Advanced Search
                                </Link>
                            <Modal open={this.state.open} change={this.handleClickOpen} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
                }
            </Fragment>
        )
    }
}


export default Panel;