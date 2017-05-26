'use strict';

import * as navigatorAction from '../action/navigator';

const initState = {
	isFetching: false,
	highLightCodes: ['1']
};

export default function navigator(state = initState, action) {
	switch(action.type) {
		case navigatorAction.MENU_TO_HIGHLIGHT:
			let grades = action.code.split('.');
			let highLightCodes = [];
			grades.map((e, i) => {
				highLightCodes.push(grades.slice(0, i+1).reduce(((pre, curr) => {return pre + '.' + curr})))
			})
			return Object.assign({}, state, {
				isFetching: true
			}, {
				highLightCodes: highLightCodes
			});
			break;
		default:
			return state;
	}
}