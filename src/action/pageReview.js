'use strict';
import webApi from "@src/webApi";

export const FETCH_TEST_DATA_REQUEST = 'FETCH_TEST_DATA_REQUEST';
export const FETCH_TEST_DATA_SUCCESS = 'FETCH_TEST_DATA_SUCCESS';
export const FETCH_TEST_DATA_ERROR = 'FETCH_TEST_DATA_ERROR';
export function fetchTestData() {
    return dispatch => {
        dispatch({
            type: FETCH_TEST_DATA_REQUEST
        });
        webApi.get('/test-data', {}).then(data => {
            dispatch({
                type: FETCH_TEST_DATA_SUCCESS,
                data
            })
            dispatch(fetchSubjectsResultByTestId(data.test[0].value));
        }).catch(error => {console.log(error)});
    }
}

export const FETCH_SUBJECTS_RESULT_REQUEST = 'FETCH_SUBJECTS_RESULT_REQUEST';
export const FETCH_SUBJECTS_RESULT_SUCCESS = 'FETCH_SUBJECTS_RESULT_SUCCESS';
export const FETCH_SUBJECTS_RESULT_ERROR = 'FETCH_SUBJECTS_RESULT_ERROR';
export function fetchSubjectsResultByTestId(testId) {
    return dispatch => {
        dispatch({
            type: FETCH_SUBJECTS_RESULT_REQUEST
        });
        webApi.get('/getSubjectsResultByTestId', {
            testId
        }).then(data => dispatch({
            type: FETCH_SUBJECTS_RESULT_SUCCESS,
            data
        })).catch(error => dispatch({
            type: FETCH_SUBJECTS_RESULT_ERROR
        }));
    };
}