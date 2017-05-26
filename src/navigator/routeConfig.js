import TotalResult from '@container/TotalResult';
import SubjectResult from '@container/SubjectResult';
import PageReview from '@container/PageReview';

export const Links = [{
	path: '/',
	name: '我的成绩',
	code: '1'
}, {
	path: '/totalResult',
	name: '总成绩',
	code: '1.1'
}, {
	path: '/subject/Chinese',
	name: '语文',
	code: '1.2'
}, {
	path: '/subject/Math',
	name: '数学',
	code: '1.3'
}, {
	path: '/subject/English',
	name: '英语',
	code: '1.4'
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
}];

export const Routes = [{
	path: '/',
	component: TotalResult
}, {
	path: '/totalResult',
	component: TotalResult
}, {
	path: '/subject/:subject',
	component: SubjectResult
}, {
	path: '/myPage',
	component: PageReview
}, {
	path: '/review',
	component: PageReview
}]