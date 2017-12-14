import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import RegisterPage from '../users/RegisterPage'
import LoginPage from '../users/LoginPage'
import LogoutPage from '../users/LogoutPage'
import AccountPage from '../users/AccountPage'
import CreateHotelPage from '../hotels/CreateHotelPage'
import ListHotelsPage from '../hotels/ListHotelsPage'
import HotelDetailsPage from '../hotels/HotelDetailsPage'

class Routes extends Component {
    render() {
        return ( <Switch >
            <Route path = '/' exact component = { ListHotelsPage }/> 
            <Route path = '/users/register' component = { RegisterPage }/> 
            <Route path = '/users/login' component = { LoginPage }/> 
            <Route path = '/users/account' component = { AccountPage }/> 
            <PrivateRoute path = '/users/logout' component = { LogoutPage }/>
            <PrivateRoute path = '/hotels/create' component = { CreateHotelPage }/>
            <PrivateRoute path = '/hotels/details/:id' component = { HotelDetailsPage }/>
            </Switch>
        )
    }
}

export default Routes;