import Axios from 'axios';
import { returnErrors } from './errorActions';
import {
    ADD_BRANCH_FAIL,
    ADD_BRANCH_SUCCESS,
    GET_BRANCHES,
    LOAD_BASIC_SIM_FAIL,
    LOAD_BASIC_SIM_SUCCESS,
    LOAD_SINGLE_SIM_FAIL,
    LOAD_SINGLE_SIM_SUCCESS, //ADD_BRANCH, DELETE_BRANCH 
} from './types';

export const getBranches = () => {
    return {
        type: GET_BRANCHES
    };
};

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

export const addSim = ({ simulation, name, branch, subject, introduction, theory, objective, procedure }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //console.log(selectedFile);
    // request body
    const body = JSON.stringify({ simulation, name, branch, subject, introduction, theory, objective, procedure });
    // request
    Axios.post('/topic', body, config)
        .then(res => dispatch({
            type: ADD_BRANCH_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_BRANCH_FAIL'));
            dispatch({
                type: ADD_BRANCH_FAIL
            })
        })
}

export const updateSim = ({ simulation, name, branch, subject, introduction, theory, objective, procedure }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //console.log(selectedFile);
    // request body
    const body = JSON.stringify({ simulation, name, branch, subject, introduction, theory, objective, procedure });
    // request
    Axios.post('/topic/update', body, config)
        .then(res => dispatch({
            type: ADD_BRANCH_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_BRANCH_FAIL'));
            dispatch({
                type: ADD_BRANCH_FAIL
            })
        })
}

export const dropSim = ({ simulation }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //console.log(selectedFile);
    // request body
    const body = JSON.stringify({ simulation });
    // request
    Axios.post('/topic/drop', body, config)
        .then(res => dispatch({
            type: ADD_BRANCH_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_BRANCH_FAIL'));
            dispatch({
                type: ADD_BRANCH_FAIL
            })
        })
}


export const loadSim = () => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // request
    Axios.get('/topic/search', config)
        .then(res => {
            dispatch({
            type: LOAD_BASIC_SIM_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOAD_BASIC_SIM_FAIL'));
            dispatch({
                type: LOAD_BASIC_SIM_FAIL
            })
        })
}

export const getSingleSim = (_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // request
    Axios.get(`/topic/getOneById/${_id}`, config)
        .then(res => {
            dispatch({
            type: LOAD_SINGLE_SIM_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOAD_SINGLE_SIM_FAIL'));
            dispatch({
                type: LOAD_SINGLE_SIM_FAIL
            })
        })
}