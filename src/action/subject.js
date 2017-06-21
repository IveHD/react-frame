'use strict';
import webApi from '@src/webApi';

export const FETCH_SUBJECT_REQUEST = 'FETCH_SUBJECT_REQUEST';
export const FETCH_SUBJECT_SUCCESS = 'FETCH_SUBJECT_SUCCESS';
export const FETCH_SUBJECT_ERROR = 'FETCH_SUBJECT_ERROR';
export function fetchSubject() {
    return dispatch => {
        dispatch({
            type: FETCH_SUBJECT_REQUEST
        });
        webApi.get('/subjects', {
            arg: 'arg1'
        }).then(data => dispatch({
            type: FETCH_SUBJECT_SUCCESS,
            data: data
        })).catch(error => dispatch({
            type: FETCH_SUBJECT_ERROR
        }));
    }
}