import axios from 'axios';

function requestSubmitLogin(credentials) {
    return {
        type: 'REQUEST_SUBMIT_LOGIN',
        credentials
    }
}

function receiveSubmitLogin(jwt) {
    return {
        type: 'RECEIVE_SUBMIT_LOGIN',
        jwt
    }
}

function encodeParams(params) {
    return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
}

function validateInput(credentials) {
    const errors = [];
    if (!credentials.userId) {
        errors.push('Missing user');
    } else if (credentials.userId.length < 1) {
        errors.push('User field needs to be at least 1 character long');
    }

    if (!credentials.facilityId) {
        errors.push('Missing facility');
    }

    return errors;
}

export function submitLogin(credentials) {
    return dispatch => {
        const validationErrs = validateInput(credentials);
        if (validationErrs.length > 0) {
            return dispatch(processErrors(validationErrs));
        }

        dispatch(requestSubmitLogin(credentials));
        return axios.post('auth', encodeParams({
            userId: credentials.userId,
            facilityId: credentials.facilityId
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then((res) => {
            dispatch(receiveSubmitLogin(res.headers['x-access-token']))
        }).catch((err) => {
            let errMsg;
            if (err.response) {
                errMsg = err.response.data;
            } else {
                errMsg = err.message;
            }
            dispatch(processErrors([errMsg]));
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

export function processErrors(errors) {
    return {
        type: 'PROCESS_ERROR',
        errors
    }
}