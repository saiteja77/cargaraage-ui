import React, { Fragment } from 'react'
import Nav from '../../Layout/Nav';
import SideBar from '../Sidebar';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

export default function DeleteUsers(){
    return (
        <Fragment>
            <Nav/>
            <SideBar/>
            <Container maxWidth="lg" style={{marginTop:'110px', marginLeft:'250px'}}>
                <Typography>Delete Users</Typography>
            </Container>
        </Fragment>
    )
}