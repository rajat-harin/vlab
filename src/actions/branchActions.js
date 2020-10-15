import {
    GET_BRANCHES, //ADD_BRANCH, DELETE_BRANCH 
} from './types';

export const getBranches = () => {
    return {
        type: GET_BRANCHES
    };
};