import navigator from './navigator';
import resultSummary from './totalResult/resultSummary';
import subject from './subject';
import analyseConclusion from './totalResult/analyseConclusion';
import knowledgePoint from './totalResult/knowledgePoint';
import totalBriefing from './totalResult/totalBriefing';
import subjectBriefing from './subjectResult/briefing';
import subjectResultAnalyse from './subjectResult/resultAnalyse';
import subjectQuestionAnalyse from './subjectResult/questionAnalyse';
import knowledgePointAnalyse from './subjectResult/knowledgePointAnalyse';
import improveSuggestion from './subjectResult/improveSuggestion';
import testData from './pageReview/testData';
import subjectsResult from './pageReview/subjectsResult';


import {combineReducers} from 'redux';

export default combineReducers({
	navigator,
    totalBriefing,
    resultSummary,
    subject,
    analyseConclusion,
    knowledgePoint,
    subjectBriefing,
    subjectResultAnalyse,
    subjectQuestionAnalyse,
    knowledgePointAnalyse,
    improveSuggestion,
    testData,
    subjectsResult
})