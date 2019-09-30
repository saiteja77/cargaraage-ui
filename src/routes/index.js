import React from 'react'
import Home from '../components/home';
import { BrowserRouter, Route } from 'react-router-dom'
import Admin from '../components/admin/Admin'
import EditUsers from '../components/admin/users/Edit';
import AddUsers from '../components/admin/users/Add';
import DeleteUsers from '../components/admin/users/Delete';
import EditBodyStyles from '../components/admin/bodystyles/Edit';
import AddBodyStyles from '../components/admin/bodystyles/Add';
import DeleteBodyStyles from '../components/admin/bodystyles/Delete';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route exact path = '/'><Home/></Route>
            <Route exact path = '/admin'><Admin/></Route>
            <Route exact path = '/users/edit'><EditUsers/></Route>
            <Route exact path = '/users/add'><AddUsers/></Route>
            <Route exact path = '/users/delete'><DeleteUsers/></Route>
            <Route exact path = '/bodystyles/edit'><EditBodyStyles/></Route>
            <Route exact path = '/bodystyles/add'><AddBodyStyles/></Route>
            <Route exact path = '/bodystyles/delete'><DeleteBodyStyles/></Route>
        </BrowserRouter>
    )
}