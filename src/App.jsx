import React from 'react';
import Load from '@src/route';
// import Cmpt01 from '@component/cmpt01';
// import Cmpt02 from '@component/cmpt002';
const Cmpt01 = require('@component/cmpt01');
// const Cmpt02 = Load('@component/cmpt002');

var p = new Promise((resolve, reject) => {
	resolve(require('@component/cmpt01'));
}).then(e => {console.log(e)});

// const A = Load();
debugger
console.log(Cmpt01);
export default class App extends React.Component {
	render() {
		return (
			<div>
				<Cmpt01.default />
			</div>
		);
	}
}