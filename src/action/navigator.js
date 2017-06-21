'use strict';

export const MENU_TO_HIGHLIGHT = 'MENU_TO_HIGHLIGHT';
export function menuToHighLight(code) {
	return dispatch => {
		dispatch({
			type: MENU_TO_HIGHLIGHT,
			code: code
		});
	}
}


import { fetchSubjectBriefing, fetchSubjectResultAnalyse, fetchQuestionAnalyse, fetchKnowledgePointAnalyse, fetchImproveSuggestion } from '@src/action/subjectResult';
export const SWITCH_SUBJECTID = 'SWITCH_SUBJECTID';
export function switchSubjectId(subjectId, resultAnalyseScope, questionAnalyseScope) {
    return dispatch => {
    	dispatch({
            type: SWITCH_SUBJECTID,
            subjectId
		});
        dispatch(fetchSubjectBriefing(subjectId));
		dispatch(fetchSubjectResultAnalyse(resultAnalyseScope, subjectId));
        dispatch(fetchQuestionAnalyse(questionAnalyseScope, subjectId));
        dispatch(fetchKnowledgePointAnalyse(subjectId));
        dispatch(fetchImproveSuggestion(subjectId));
    }
}