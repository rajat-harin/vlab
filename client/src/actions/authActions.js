import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    FORGOT_SUCCESS,
    FORGOT_FAIL,
    FORGOTRESET_SUCCESS,
    FORGOTRESET_FAIL
} from '../actions/types';

import { returnErrors } from './errorActions';

//Check Token and load user
export const loadUser = () => (dispatch, getState) => {
    //USER LOADING
    dispatch({ type: USER_LOADING });

    axios.get('/auth', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })

}

//Register  User

export const register = ({ username, email, password, isAdmin }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // request body
    const body = JSON.stringify({ username, email, password, isAdmin });
    // request
    axios.post('/users/add', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}
//Login User
export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // request body
    const body = JSON.stringify({ email, password });

    // request
    axios.post('/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


//Logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const tokenConfig = getState => {
    //Get state form local Storage
    const token = getState().auth.token;
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
//FORGOT PASSWORD EMAIL SERVICE
export const forgot = ({ email }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // request body
    const body = JSON.stringify({ email });

    // request
    axios.post('/users/forgot', body, config)
        .then(res => dispatch({
            type: FORGOT_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'FORGOT_FAIL'));
            dispatch({
                type: FORGOT_FAIL
            })
        })
}

//FORGOT PASSWORD RESET SERVICE
export const forgotReset = ({ resetPasswordToken, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // request body
    const body = JSON.stringify({ resetPasswordToken, password });

    // request
    axios.post('/users/forgot/reset', body, config)
        .then(res => dispatch({
            type: FORGOTRESET_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'FORGOTRESET_FAIL'));
            dispatch({
                type: FORGOTRESET_FAIL
            })
        })
}