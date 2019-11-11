import React from 'react'
import Home from '../components/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Admin from '../components/admin/Admin'
import EditUsers from '../components/admin/users/Edit';
import AddUsers from '../components/admin/users/Add';
import DeleteUsers from '../components/admin/users/Delete';
import EditBodyStyles from '../components/admin/bodystyles/Edit';
import AddBodyStyles from '../components/admin/bodystyles/Add';
import DeleteBodyStyles from '../components/admin/bodystyles/Delete';
import Page404 from '../errorcomponents/Page404';
import Page401 from '../errorcomponents/Page401';
import AddCars from '../components/admin/cars/Add';
import Signup from '../components/signup';
import CarCard from '../components/ecommerce/CarCard';
import ViewCar from '../components/ecommerce/ViewCar';
import Ecommerce from '../components/ecommerce/index';
import ProtectedRoute from './ProtectedRoute';
import Cart from '../components/ecommerce/Cart';
import Payment from '../components/ecommerce/Payment';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = '/'><Home/></Route>
                <Route exact path = '/admin/users/edit'><EditUsers/></Route>
                <Route exact path = '/users/add'><AddUsers/></Route>
                <Route exact path = '/users/delete'><DeleteUsers/></Route>
                <Route exact path = '/bodystyles/edit'><EditBodyStyles/></Route>
                <Route exact path = '/bodystyles/add'><AddBodyStyles/></Route>
                <Route exact path = '/bodystyles/delete'><DeleteBodyStyles/></Route>
                <Route exact path = '/cars/add'><AddCars/></Route>
                <Route exact path = '/signup'><Signup/></Route>
                <Route exact path = '/ecommerce/card'><CarCard/></Route>
                <Route exact path = '/cars_for_sale'><Ecommerce/></Route>
                <Route exact path = '/cars_for_sale/viewcar/:key' component = {ViewCar}></Route>
                <Route exact path = '/cart' component={Cart}/>
                <Route exact path = '/404_not_found' component={Page404}/>
                <Route exact path = '/not_authorized' component={Page401}/>
                <ProtectedRoute allowed={['ADMIN']} exact path='/admin' component={Admin}/>
                <ProtectedRoute allowed={['USER']} exact path='/cars_for_sale/payment' component={Payment}/>
                <Route exact path='*'><Page404/></Route>
            </Switch>
        </BrowserRouter>
    )
}