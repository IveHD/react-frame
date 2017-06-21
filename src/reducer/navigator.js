'use strict';

import * as navigatorAction from '../action/navigator';

const initState = {
	highLightCodes: ['1', '1.1']
};

export default function navigator(state = initState, action) {
	switch(action.type) {
		case navigatorAction.MENU_TO_HIGHLIGHT:
			let grades = action.code.split('.');
			let highLightCodes = [];
			grades.map((e, i) => {
				highLightCodes.push(grades.slice(0, i+1).reduce(((pre, curr) => {return pre + '.' + curr})))
			});
			return Object.assign({}, {
				highLightCodes: highLightCodes
			});
        case navigatorAction.SWITCH_SUBJECTID:
            return Object.assign({}, state, {
                isFetching: true
            }, {
                subjectId: parseInt(action.subjectId)
            });
		default:
			return state;
	}
}