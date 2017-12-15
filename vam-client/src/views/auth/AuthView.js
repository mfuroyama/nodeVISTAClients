import React from 'react';

import View from '~/react-views/View';
import TextView from '~/react-views/TextView';
import ButtonView from '~/react-views/ButtonView';
import SelectView from '~/react-views/SelectView';

import LoadingView from '~/ui/LoadingView';

import './auth.css';
import Logo from './logo.png';

/**
 *
 * Authentication view, enter user and facility ID
 *
 **/
class AuthView extends View {

    render() {
       return (

           <div className="authView">
               <div className="logo">
                   <img align="middle" src={Logo} width={96} height={96} alt="VAM logo" />
                   <label>VAM Client</label>
               </div>

               <label>Log In</label>
               <div className="alignView">
                   <div className="authForm">
                       <div className="item">
                           <label>User ID:</label>
                           <TextView readOnly={true} value="62"/>
                       </div>
                       <div className="item">
                           <label>Facility ID:</label>
                           <SelectView>
                               <option>2957</option>
                           </SelectView>
                       </div>

                       <div className="bottom">
                            <View className="loading" hidden={!this.props.loading}>
                                <LoadingView color="rgb(79, 141, 234)"  />
                                <label>Authenticating ...</label>
                            </View>
                            <ButtonView disabled={this.props.loading}
                                action={this.props.action}
                                text="Login" type="primary" className="loginBtn" />
                       </div>
                   </div>
               </div>
           </div>
       )
    }


}


export default AuthView;