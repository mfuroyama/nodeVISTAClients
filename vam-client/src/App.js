import React from 'react';

import View from '~/react-views/View';
import RootView from '~/react-views/RootView';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import AuthController from "./views/auth/AuthController";

import './style.css';

/** root view **/
class App extends View {
  render() {
    return (
        <Router>
            <RootView>
                <Route path="/auth" component={AuthController} />
            </RootView>
        </Router>
    );
  }
}

export default App;
