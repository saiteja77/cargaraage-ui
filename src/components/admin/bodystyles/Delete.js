import React, { Fragment } from 'react'
import Nav from '../../Layout/Nav';
import SideBar from '../Sidebar';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

export default function DeleteBodyStyles(){
    return (
        <Fragment>
            <Nav/>
            <SideBar/>
            <Container maxWidth="lg" style={{marginTop:'110px', marginLeft:'250px'}}>
                <Typography>Delete Body Styles</Typography>
            </Container>
        </Fragment>
    )
}