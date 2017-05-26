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