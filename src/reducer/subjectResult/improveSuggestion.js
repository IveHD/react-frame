import { FETCH_IMPROVE_SUGGESTION_REQUEST, FETCH_IMPROVE_SUGGESTION_SUCCESS, FETCH_IMPROVE_SUGGESTION_ERROR } from '@src/action/subjectResult.js';

const initState = {
    isFetching: false
};

export default function subject(state = initState, action) {
    switch(action.type) {
        case FETCH_IMPROVE_SUGGESTION_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_IMPROVE_SUGGESTION_SUCCESS:
            return Object.assign({}, {
                suggestion: action.data.suggestion,
                improvableScore: action.data.improvableScore,
                subjectJudge: action.data.subjectJudge
            });
        case FETCH_IMPROVE_SUGGESTION_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}