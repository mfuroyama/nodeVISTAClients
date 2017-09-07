const login = (state = [], action) => {
    switch (action.type) {
        case 'SUBMIT_LOGIN':
            return Object.assign({}, state, {
                userId: action.userId,
                facilityId: action.facilityId
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

export default login;