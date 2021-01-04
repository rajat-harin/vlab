import {
    ADD_BRANCH_FAIL,
    ADD_BRANCH_SUCCESS,
    GET_BRANCHES,
    LOADING_BASIC_SIM,
    LOADING_SINGLE_SIM,
    LOAD_BASIC_SIM_FAIL,
    LOAD_BASIC_SIM_SUCCESS,
    LOAD_SINGLE_SIM_FAIL,
    LOAD_SINGLE_SIM_SUCCESS, //ADD_BRANCH, DELETE_BRANCH 
} from '../actions/types';

const initialState = {
    branch: [
        { id: 1, name: 'CSE' },
        { id: 2, name: 'IT' },
        { id: 3, name: 'ETC' }
    ],
    isSuccess: false,
    isLoading: false,
    exps: [],
    singleExp: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        
        case GET_BRANCHES:
            return {
                ...state
            }
        case LOADING_SINGLE_SIM:
        case LOADING_BASIC_SIM:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_SINGLE_SIM_SUCCESS:
            return {
                ...state,
                singleExp: action.payload,
                isSuccess: true,
                isLoading: false
                }
        case LOAD_BASIC_SIM_SUCCESS:
            return {
                ...state,
                exps: action.payload,
                isSuccess: true,
                isLoading: false
            }
        case ADD_BRANCH_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    isSuccess: true,
                    isLoading: false
                }
        case LOAD_SINGLE_SIM_FAIL:
        case LOAD_BASIC_SIM_FAIL:
        case ADD_BRANCH_FAIL:
            return {
                ...state,
                isSuccess: false,
                isLoading: false
            }
        default:
            return state;
    }
}