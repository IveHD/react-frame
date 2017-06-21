'use strict';
import webApi from '@src/webApi';

export const FETCH_SUBJECT_BRIEFING_REQUEST = 'FETCH_SUBJECT_BRIEFING_REQUEST';
export const FETCH_SUBJECT_BRIEFING_SUCCESS = 'FETCH_SUBJECT_BRIEFING_SUCCESS';
export const FETCH_SUBJECT_BRIEFING_ERROR = 'FETCH_SUBJECT_BRIEFING_ERROR';
export function fetchSubjectBriefing(subjectId) {
    return dispatch => {
        dispatch({
            type: FETCH_SUBJECT_BRIEFING_REQUEST
        });
        webApi.get('/subject-briefing', {
            subjectId
        }).then(data => dispatch({
            type: FETCH_SUBJECT_BRIEFING_SUCCESS,
            data: data
        })).catch(error => dispatch({
            type: FETCH_SUBJECT_BRIEFING_ERROR
        }));
    }
}

export const FETCH_SUBJECT_RESULT_ANALYSE_REQUEST = 'FETCH_SUBJECT_RESULT_ANALYSE_REQUEST';
export const FETCH_SUBJECT_RESULT_ANALYSE_SUCCESS = 'FETCH_SUBJECT_RESULT_ANALYSE_SUCCESS';
export const FETCH_SUBJECT_RESULT_ANALYSE_ERROR = 'FETCH_SUBJECT_RESULT_ANALYSE_ERROR';
export function fetchSubjectResultAnalyse(scope, subjectId) {
    return dispatch => {
        dispatch({
            type: FETCH_SUBJECT_RESULT_ANALYSE_REQUEST
        });

        webApi.get('/subject-result-analyse',
            Object.assign({}, {scope}, {subjectId})
        ).then(data => dispatch({
            type: FETCH_SUBJECT_RESULT_ANALYSE_SUCCESS,
            data: data,
            scope
        })).catch(error => dispatch({
            type: FETCH_SUBJECT_RESULT_ANALYSE_ERROR
        }));
    }
}

export const FETCH_QUESTION_ANALYSE_REQUEST = 'FETCH_QUESTION_ANALYSE_REQUEST';
export const FETCH_QUESTION_ANALYSE_SUCCESS = 'FETCH_QUESTION_ANALYSE_SUCCESS';
export const FETCH_QUESTION_ANALYSE_ERROR = 'FETCH_QUESTION_ANALYSE_ERROR';
export function fetchQuestionAnalyse(scope, subjectId) {
    return dispatch => {
        dispatch({
            type: FETCH_QUESTION_ANALYSE_REQUEST
        });

        webApi.get('/question-analyse',
            Object.assign({}, {scope}, {subjectId})
        ).then(data => dispatch({
            type: FETCH_QUESTION_ANALYSE_SUCCESS,
            data: data,
            scope
        })).catch(error => dispatch({
            type: FETCH_QUESTION_ANALYSE_ERROR
        }));
    }
}

export const FETCH_KNOWLEDGE_POINT_ANALYSE_REQUEST = 'FETCH_KNOWLEDGE_POINT_ANALYSE_REQUEST';
export const FETCH_KNOWLEDGE_POINT_ANALYSE_SUCCESS = 'FETCH_KNOWLEDGE_POINT_ANALYSE_SUCCESS';
export const FETCH_KNOWLEDGE_POINT_ANALYSE_ERROR = 'FETCH_KNOWLEDGE_POINT_ANALYSE_ERROR';
export function fetchKnowledgePointAnalyse(subjectId) {
    return dispatch => {
        dispatch({
            type: FETCH_KNOWLEDGE_POINT_ANALYSE_REQUEST
        });

        webApi.get('/knowledge-point-analyse', {subjectId}
        ).then(data => dispatch({
            type: FETCH_KNOWLEDGE_POINT_ANALYSE_SUCCESS,
            data: data
        })).catch(error => dispatch({
            type: FETCH_KNOWLEDGE_POINT_ANALYSE_ERROR
        }));
    }
}

export const FETCH_IMPROVE_SUGGESTION_REQUEST = 'FETCH_IMPROVE_SUGGESTION_REQUEST';
export const FETCH_IMPROVE_SUGGESTION_SUCCESS = 'FETCH_IMPROVE_SUGGESTION_SUCCESS';
export const FETCH_IMPROVE_SUGGESTION_ERROR = 'FETCH_IMPROVE_SUGGESTION_ERROR';
export function fetchImproveSuggestion(subjectId) {
    return dispatch => {
        dispatch({
            type: FETCH_IMPROVE_SUGGESTION_REQUEST
        });
        webApi.get('/improve-suggestion', {subjectId}
        ).then(data => dispatch({
            type: FETCH_IMPROVE_SUGGESTION_SUCCESS,
            data: data
        })).catch(error => dispatch({
            type: FETCH_IMPROVE_SUGGESTION_ERROR
        }));
    }
}