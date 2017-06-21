'use strict';

import * as totalResultAction from '../../action/totalResult.js';

const initState = {
    isFetching: false
};

export default function subject(state = initState, action) {
    switch(action.type) {
        case totalResultAction.FETCH_TOTAL_BRIEFING_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case totalResultAction.FETCH_TOTAL_BRIEFING_SUCCESS:
            return Object.assign({}, state, action.data);
        case totalResultAction.FETCH_TOTAL_BRIEFING_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}