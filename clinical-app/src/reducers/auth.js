const auth = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_SUBMIT_LOGIN':
            return Object.assign({}, state, {
                jwt: action.jwt
            });
        case 'VALIDATE':
            return Object.assign({}, state, {
                errors: action.errors
            });
        case 'CHANGE_USER':
            return Object.assign({}, state, {
                user: action.user
            });
        case 'CHANGE_FACILITY':
            return Object.assign({}, state, {
                facility: action.facility
            });
        default:
            return state
    }
};

export default auth;