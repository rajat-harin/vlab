import { combineReducers } from 'redux';
import branchReducer from './branchReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    branch: branchReducer,
    error: errorReducer,
    auth: authReducer
});