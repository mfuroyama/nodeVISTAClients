import { combineReducers } from 'redux'
import auth from './auth'

const clinicalApp = combineReducers({
    auth,
});

export default clinicalApp