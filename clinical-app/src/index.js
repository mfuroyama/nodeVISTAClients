import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk'; // allows actions to return functions
import { createLogger } from 'redux-logger'; // logger middleware
import { createStore, applyMiddleware } from 'redux';
import clinicalApp from './reducers';
import config from './config';
import Root from './Root';

const loggerMiddleware = createLogger();

axios.defaults.baseURL = config.serviceURL;

let store = createStore(
    clinicalApp,
    {
        auth: {
            users: [ config.defaultUser ],
            facilities: [ config.defaultFacility ],
            user: config.defaultUser,
            facility: config.defaultFacility,
        }
    },
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // middleware that logs actions
    )
);

render(
    <Root store={store} />,
    document.getElementById('root')
);