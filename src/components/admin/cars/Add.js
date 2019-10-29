import React, { Fragment } from 'react'
import Nav from '../../Layout/Nav';
import SideBar from '../Sidebar';
import Container from '@material-ui/core/Container';
import AddCar from './add/AddCar';

export default function AddCars(){
    return (
        <Fragment>
            <Nav/>
            <SideBar/>
            <Container maxWidth="lg" style={{marginTop:'110px', marginLeft:'250px'}}>
                <AddCar/>
            </Container>
        </Fragment>
    )
}