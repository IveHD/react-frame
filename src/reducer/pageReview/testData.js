'use strict';

import {FETCH_TEST_DATA_REQUEST, FETCH_TEST_DATA_SUCCESS, FETCH_TEST_DATA_ERROR} from '../../action/pageReview.js';

const initState = {
    isFetching: false
};

export default function subject(state = initState, action) {
    switch(action.type) {
        case FETCH_TEST_DATA_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_TEST_DATA_SUCCESS:
            return Object.assign({}, action.data);
        case FETCH_TEST_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}