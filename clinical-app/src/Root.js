import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route} from 'react-router'
import createHistory from 'history/createBrowserHistory'
import App from './components/App'
import Auth from './containers/auth';
import {FocusStyleManager} from "@blueprintjs/core";
import moment from 'moment-timezone';

// use central timezone for all moment processing
moment.tz.setDefault('America/Chicago');

FocusStyleManager.onlyShowFocusOnTabs();

// create browser history
const history = createHistory();

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/auth" component={Auth} />
            </div>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root