'use strict';

import * as subjectAction from '../action/subject';

const initState = {
    isFetching: false,
    data: []
};

export default function subject(state = initState, action) {
    switch(action.type) {
        case subjectAction.FETCH_SUBJECT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case subjectAction.FETCH_SUBJECT_SUCCESS:
            return Object.assign({}, state, {data: action.data.data});
        case subjectAction.FETCH_SUBJECT_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}