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
        case 'PROCESS_ERROR':
            return Object.assign({}, state, {
                errors: action.errors,
            });
        default:
            return state
    }
};

export default auth;