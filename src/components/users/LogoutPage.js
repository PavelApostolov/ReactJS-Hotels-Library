import { Component } from 'react';
import Auth from './Auth'

class LogoutPage extends Component {
    componentWillMount (){
        Auth.deauthenticateuser()
        Auth.removeUser()
        this.props.history.push('/')
    }

    render(){
        return null
    }
}

export default LogoutPage;