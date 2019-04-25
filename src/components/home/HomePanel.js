import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBContainer } from "mdbreact"
import SelectInputField from './SelectInputField'
import Modal from './AdvancedSearchModal'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

class Panel extends React.Component {

    state = {
        optionValue: '',
        open: false
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
    render() {

        const allMakes = [
            {
                id: "1",
                value: "Audi"
            },
            {
                id: "2",
                value: "Bentley"
            },
            {
                id: "3",
                value: "Chevrolet"
            },
            {
                id: "4",
                value: "Dodge"
            },
            {
                id: "5",
                value: "Eagle"
            },
            {
                id: "6",
                value: "Ferrari"
            },
            {
                id: "7",
                value: "GMC"
            },
            {
                id: "8",
                value: "Honda"
            },
            {
                id: "9",
                value: "Infinity"
            }
        ]
        const bodyStyles = [
            {
                id: "1",
                value: "Sedan"
            },
            {
                id: "2",
                value: "Coupe"
            },
            {
                id: "3",
                value: "Convertivable"
            },
            {
                id: "4",
                value: "SUV"
            },
            {
                id: "5",
                value: "Wagon"
            }
        ]

        return (
            <MDBContainer style={{ marginTop: "-1rem", zIndex: "1" }}>
                <MDBCard style={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
                    <MDBCardHeader style={{ background: "#752205", color: "white" }}>
                        What are you looking for?
                    </MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardTitle>Search By</MDBCardTitle>
                        <MDBCardText>
                            <SelectInputField optionValue={allMakes} label="Make"></SelectInputField>
                            <SelectInputField optionValue={bodyStyles} label="Body Style"></SelectInputField>
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
        )
    }
}



export default Panel;