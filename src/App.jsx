import React from 'react';
// import Cmpt01 from '@component/cmpt01';
// import Cmpt02 from '@component/cmpt002';
const Cmpt01 = () => import('@component/cmpt01');
const Cmpt02 = () => import('@component/cmpt002');
export default class App extends React.Component {
	render() {
		return (
			<div>
				<p><Cmpt01/></p>
			</div>
		);
	}
}