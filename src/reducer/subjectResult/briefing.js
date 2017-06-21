'use strict';

import * as subjectResultAction from '../../action/subjectResult.js';

const initState = {
    isFetching: false
};

export default function subject(state = initState, action) {
    switch(action.type) {
        case subjectResultAction.FETCH_SUBJECT_BRIEFING_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case subjectResultAction.FETCH_SUBJECT_BRIEFING_SUCCESS:
            return Object.assign({}, state, action.data);
        case subjectResultAction.FETCH_SUBJECT_BRIEFING_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}