import axios from 'axios';

export const REQUEST_SUBMIT_LOGIN = 'REQUEST_SUBMIT_LOGIN';

function requestSubmitLogin(credentials) {
    return {
        type: REQUEST_SUBMIT_LOGIN,
        credentials
    }
}

export const RECEIVE_SUBMIT_LOGIN = 'RECEIVE_SUBMIT_LOGIN';

function receiveSubmitLogin(jwt) {
    return {
        type: RECEIVE_SUBMIT_LOGIN,
        jwt
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
        return axios.post('auth', encodeParams({
            userId: credentials.userId,
            facilityId: credentials.facilityId
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then((res) => {
            dispatch(receiveSubmitLogin(res.headers['x-access-token']))
        });
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