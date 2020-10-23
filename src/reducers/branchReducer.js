import {
    ADD_BRANCH_FAIL,
    ADD_BRANCH_SUCCESS,
    GET_BRANCHES, //ADD_BRANCH, DELETE_BRANCH 
} from '../actions/types';

const initialState = {
    branch: [
        { id: 1, name: 'CSE' },
        { id: 2, name: 'IT' },
        { id: 3, name: 'ETC' }
    ],
    isSuccess: false,
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BRANCHES:
            return {
                ...state
            }
        case ADD_BRANCH_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    isSuccess: true
                }
        case ADD_BRANCH_FAIL:
            return {
                ...state,
                isSuccess: false
            }
        default:
            return state;
    }
}