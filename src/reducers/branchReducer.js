import {
    GET_BRANCHES, //ADD_BRANCH, DELETE_BRANCH 
} from '../actions/types';

const initialState = {
    branch: [
        { id: 1, name: 'CSE' },
        { id: 2, name: 'IT' },
        { id: 3, name: 'ETC' }
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BRANCHES:
            return {
                ...state
            }
        default:
            return state;
    }
}