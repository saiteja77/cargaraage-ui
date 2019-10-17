import React from 'react'
import Nav from '../../Layout/Nav';
import SideBar from '../Sidebar';
import Container from '@material-ui/core/Container';
import Table from './Table';

export default function EditUsers(){
    return (
        <div style={{backgroundColor:'#404040', minHeight:'100vh'}}>
            <Nav/>
            <SideBar/>
            <Container maxWidth="lg" style={{marginTop:'20vh', marginLeft:'250px', paddingBottom:'14vh'}}>
                <Table url='API_URL'/>
            </Container>
        </div>
    )
}