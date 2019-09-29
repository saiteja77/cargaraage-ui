import React, { Fragment } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBContainer } from "mdbreact"
import SelectInputField from './SelectInputField'
import Modal from './AdvancedSearchModal'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { getMakes, getBodyStyles } from '../../actions'

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

    buttonClicked = (e) => {
        e.preventDefault()
        if(this.props.selectedMake === '' && this.props.selectedBodyStyle === ''){
            alert('Please select either of Makes or BodyStyles')
        } else{

        }
        console.log('SelectedMake: ' + this.props.selectedMake + '\nSelected BodyStyle: ' + this.props.selectedBodyStyle)
    }

    componentWillMount(){
        this.props.getMakes()
        this.props.getBodyStyles()
    }
    
    render() {

        return (
            <Fragment>
                {this.props.makes.length !==0 && this.props.bodyStyles.length !==0 &&
                    <MDBContainer style={{ marginTop: "-1rem", zIndex: "1" }}>
                    <MDBCard style={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
                        <MDBCardHeader style={{ background: "#752205", color: "white" }}>
                            What are you looking for?
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>Search By</MDBCardTitle>
                            <MDBCardText>
                                <SelectInputField optionValue={this.props.makes} label="Make"></SelectInputField>
                                <SelectInputField optionValue={this.props.bodyStyles} label="Body Style"></SelectInputField>
                                <Button onClick={this.buttonClicked} style={{backgroundColor:'rgb(117, 34, 5)', color: '#fff', marginTop:'10px', marginLeft:'5px'}}>Search</Button>
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

const mapStateToProps = state => ({
    makes: state.props.makes,
    bodyStyles: state.props.bodyStyles,
    selectedMake: state.selection.selectedMake,
    selectedBodyStyle: state.selection.selectedBodyStyle
})

export default connect(mapStateToProps, { getMakes, getBodyStyles }) (Panel);