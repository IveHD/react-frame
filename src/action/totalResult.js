'use strict';
import webApi from '@src/webApi';

export const FETCH_TOTAL_BRIEFING_REQUEST = 'FETCH_TOTAL_BRIEFING_REQUEST';
export const FETCH_TOTAL_BRIEFING_SUCCESS = 'FETCH_TOTAL_BRIEFING_SUCCESS';
export const FETCH_TOTAL_BRIEFING_ERROR = 'FETCH_TOTAL_BRIEFING_ERROR';
export function fetchTotalBriefing() {
    return dispatch => {
        dispatch({
            type: FETCH_TOTAL_BRIEFING_REQUEST
        });
        webApi.get('/total-briefing', {
            arg: 'arg1'
        }).then(data => dispatch({
            type: FETCH_TOTAL_BRIEFING_SUCCESS,
            data: data
        })).catch(error => dispatch({
            type: FETCH_TOTAL_BRIEFING_ERROR
        }));
    }
}

export const FETCH_RESULT_SUMMARY_REQUEST = 'FETCH_RESULT_SUMMARY_REQUEST';
export const FETCH_RESULT_SUMMARY_SUCCESS = 'FETCH_RESULT_SUMMARY_SUCCESS';
export const FETCH_RESULT_SUMMARY_ERROR = 'FETCH_RESULT_SUMMARY_ERROR';
export function fetchResultSummary() {
    return dispatch => {
        dispatch({
            type: FETCH_RESULT_SUMMARY_REQUEST
        });
        webApi.get('/result-summary', {
            arg: 'arg1'
        }).then(data => dispatch({
            type: FETCH_RESULT_SUMMARY_SUCCESS,
            data: data
        })).catch(error => dispatch({
            type: FETCH_RESULT_SUMMARY_ERROR
        }));
    }
}

export const FETCH_ANALYSE_CONCLUSION_REQUEST = 'FETCH_ANALYSE_CONCLUSION_REQUEST';
export const FETCH_ANALYSE_CONCLUSION_SUCCESS = 'FETCH_ANALYSE_CONCLUSION_SUCCESS';
export const FETCH_ANALYSE_CONCLUSION_ERROR = 'FETCH_ANALYSE_CONCLUSION_ERROR';
export function fetchAnalyseConclusion() {
    return dispatch => {
        dispatch({
            type: FETCH_ANALYSE_CONCLUSION_REQUEST
        });
        webApi.get('/analyse-conclusion', {
            arg: 'arg1'
        }).then(data => dispatch({
            type: FETCH_ANALYSE_CONCLUSION_SUCCESS,
            data: data
        })).catch(error => dispatch({
            type: FETCH_ANALYSE_CONCLUSION_ERROR
        }));
    }
}

export const FETCH_KNOWLEDGE_POINT_REQUEST = 'FETCH_KNOWLEDGE_POINT_REQUEST';
export const FETCH_KNOWLEDGE_POINT_SUCCESS = 'FETCH_KNOWLEDGE_POINT_SUCCESS';
export const FETCH_KNOWLEDGE_POINT_ERROR = 'FETCH_KNOWLEDGE_POINT_ERROR';
export function fetchKnowledgePoint(subjectId) {
    return dispatch => {
        dispatch({
            type: FETCH_KNOWLEDGE_POINT_REQUEST
        });
        webApi.get('/knowledge-point', {
            subjectId
        }).then(data => dispatch({
            type: FETCH_KNOWLEDGE_POINT_SUCCESS,
            subjectId,
            data: data
        })).catch(error => dispatch({
            type: FETCH_KNOWLEDGE_POINT_ERROR
        }));
    }
}