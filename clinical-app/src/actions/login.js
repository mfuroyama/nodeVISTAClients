import fetch from 'isomorphic-fetch';
import config from '../config';

export const REQUEST_SUBMIT_LOGIN = 'REQUEST_SUBMIT_LOGIN'
function requestSubmitLogin(credentials) {
    return {
        type: REQUEST_SUBMIT_LOGIN,
        credentials
    }
}

export const RECEIVE_SUBMIT_LOGIN = 'RECEIVE_SUBMIT_LOGIN'
function receiveSubmitLogin(credientials, jwt) {
    return {
        type: RECEIVE_SUBMIT_LOGIN,
        credientials,
        jwt,
        receivedAt: Date.now()
    }
}

function encodeParams(params) {
    return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
}

export function submitLogin(credentials) {
    return dispatch => {
        dispatch(requestSubmitLogin(credentials));
        return fetch(`${config.serverURL}/auth`,
            {
                method: 'POST',
                cache: 'no-cache',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: encodeParams({
                    userId: credentials.userId,
                    facilityId: credentials.facilityId
                })
            })
            .then(response => {
                return response.headers['x-access-token']
            })
            .then(jwt => dispatch(receiveSubmitLogin(credentials, jwt)))
    }
}

export const changeUser = user => {
    return {
        type: 'CHANGE_USER',
        user
    }
};

export const changeFacility = facility => {
    return {
        type: 'CHANGE_FACILITY',
        facility
    }
};