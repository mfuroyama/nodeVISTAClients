import { connect } from 'react-redux';
import { submitLogin, changeUser, changeFacility } from '../actions';
import LoginComp from '../components/login';

const mapStateToProps = state => {
    return {
        errors: (errors) => {
            return state.errors
        },
        users: state.login.users,
        facilities: state.login.facilities,
        selectedUser: state.login.user,
        selectedFacility: state.login.facility,
    }
};

function doLogin() {
    return (dispatch, getState) => {
        let login = getState().login;
        dispatch(submitLogin({ userId: login.user.id, facilityId: login.facility.id }));
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

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComp);

export default Login