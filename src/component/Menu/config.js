import Page_1 from 'bundle-loader?lazy!@container/page-1/index.jsx';
import Page_2 from 'bundle-loader?lazy!@container/page-2/index.jsx';

import Page_3_1 from 'bundle-loader?lazy!@container/page-3/page-3-1/index.jsx';
import Page_3_2_1 from 'bundle-loader?lazy!@container/page-3/page-3-2/page-3-2-1/index.jsx';
import Page_3_2_2 from 'bundle-loader?lazy!@container/page-3/page-3-2/page-3-2-2/index.jsx';

export default [{
	key: '1',
	label: 'page-1',
	maps: [{ path: '/page/one', component: Page_1, authority: 'paper_1_view'}]
},{
	key: '2',
	label: 'page-2',
	maps: [{ path: '/page/two', component: Page_2, authority: 'paper_2_view'}]
},{
	key: '3',
	label: 'page-3',
	children: [{
		key: '3.1',
		label: 'page-3-1',
		maps: [{ path: '/page/three/one', component: Page_3_1, authority: 'paper_3_view'}]
	},{
		key: '3.2',
		label: 'page-3-2',
		children: [{
			key: '3.2.1',
			label: 'page-3-2-1',
			maps: [{ path: '/page/three/two/one', component: Page_3_2_1, authority: 'paper_3_view'}]
		},{
			key: '3.2.2',
			label: 'page-3-2-2',
			maps: [{ path: '/page/three/two/two', component: Page_3_2_2, authority: 'paper_3_view'}]
		}]
	}]
}]