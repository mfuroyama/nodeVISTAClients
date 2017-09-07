import { combineReducers } from 'redux'
import login from './login'

const clinicalApp = combineReducers({
    login,
});

export default clinicalApp