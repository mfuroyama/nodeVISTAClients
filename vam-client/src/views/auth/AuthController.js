import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom'

import AuthView from './AuthView';

/**
 *  performs authentication and sets JWT tokens
 */

class AuthController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            success: false
        }
    }

    render() {

        if(!this.state.success) {
            return <AuthView loading={this.state.loading}
                              action={this.doLogin.bind(this)} />
        }

        return <Redirect to="/app" push />
    }

    /**
     *  perform login
     */
    doLogin() {


        this.setState({
            loading:true
        });

        //post to auth
        axios.post('/auth/', 'userId=200-62&facilityId=4-2957')
            .then(function(response){
                Cookies.set({
                    'x-refresh-token': response.headers['x-refresh-token'],
                    'x-access-token' : response.headers['x-access-token']
                });
                this.setState({
                    loading:false,
                    success: true
                });

            }.bind(this))
            .catch(function(err){
                console.log(err);
                this.setState({
                    loading:false,
                    success:false
                });
            }.bind(this));
    }

}

export default AuthController;