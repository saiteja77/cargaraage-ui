import React, { Fragment } from 'react'
import Nav from '../Layout/Nav';
import SideBar from './Sidebar';

class Admin extends React.Component {
    render(){
        return(
            <Fragment>
                <Nav/>
                <SideBar/>
            </Fragment>
        )
    }
}

export default Admin