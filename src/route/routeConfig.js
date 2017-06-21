import TotalResult from '@container/totalResult';
import SubjectResult from '@container/subjectResult';
import PageReview from '@container/pageReview';

export const Links = [{
	path: '/',
	name: '我的成绩',
	code: '1'
}, {
	path: '/totalResult',
	name: '总成绩',
	code: '1.1'
}, {
	path: '/myPage',
	name: '我的试卷',
	component: PageReview,
	code: '2'
}, {
	path: '/review',
	name: '试卷回顾',
	component: PageReview,
	code: '2.1'
}, {
	path: '/myHope',
	name: '我的志愿',
	component: null,
	code: '3'
}, {
    path: '/myHope',
    name: '参加考试',
    component: null,
    code: '4'
}];

export const Routes = [{
	path: '/',
	component: TotalResult
}, {
	path: '/totalResult',
	component: TotalResult
}, {
	path: '/subject/:subjectId',
	component: SubjectResult
}, {
	path: '/myPage',
	component: PageReview
}, {
	path: '/review',
	component: PageReview
}]