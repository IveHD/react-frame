'use strict';

import {FETCH_SUBJECTS_RESULT_REQUEST, FETCH_SUBJECTS_RESULT_SUCCESS, FETCH_SUBJECTS_RESULT_ERROR} from '../../action/pageReview.js';

const initState = {
    isFetching: false
};

export default function subjectsResult(state = initState, action) {
    switch(action.type) {
        case FETCH_SUBJECTS_RESULT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_SUBJECTS_RESULT_SUCCESS:
            return Object.assign({}, {
                resultList: action.data.result
            });
        case FETCH_SUBJECTS_RESULT_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}