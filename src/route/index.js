// import Loadable from 'react-loadable';
// import React from 'react';

// module.exports = (component) => {
// 	var L = Loadable({
// 		loader: () => import(/* webpackChunkName: "cmpt001" */ component),
// 		loading() {
// 			return <div>Loading...</div>
// 		}
// 	});
// 	return L
// }
// 
export default (cmpt) => {
	let p = import(cmpt);
	p().then()
}