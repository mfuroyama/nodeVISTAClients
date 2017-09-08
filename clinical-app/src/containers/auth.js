import { connect } from 'react-redux';
import { submitLogin, changeUser, changeFacility } from '../actions';
import AuthComp from '../components/auth';

const mapStateToProps = state => {
    return {
        errors: state.auth.errors,
        users: state.auth.users,
        facilities: state.auth.facilities,
        selectedUser: state.auth.user,
        selectedFacility: state.auth.facility,
    }
};

function doLogin() {
    return (dispatch, getState) => {
        let auth = getState().auth;
        return dispatch(submitLogin({ userId: auth.user.id, facilityId: auth.facility.id }));
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (e) => {
            e.preventDefault();
            dispatch(doLogin())
        },
        onChangeUser: (e) => {
            dispatch(changeUser({ id: e.target.value }))
        },
        onChangeFacility: (e) => {
            dispatch(changeFacility({ id: e.target.value }))
        }
    }
};

const Auth = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthComp);

export default Auth