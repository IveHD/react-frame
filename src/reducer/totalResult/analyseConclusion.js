'use strict';

import * as totalResultAction from '../../action/totalResult';

const initState = {
    isFetching: false
};

export default function analyseConclusion(state = initState, action) {
    switch(action.type) {
        case totalResultAction.FETCH_ANALYSE_CONCLUSION_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case totalResultAction.FETCH_ANALYSE_CONCLUSION_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
            }, action.data);
        case totalResultAction.FETCH_ANALYSE_CONCLUSION_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}