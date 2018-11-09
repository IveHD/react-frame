import React from 'react';
import Header from '@component/header';
import Menu from '@component/menu';
import 'antd/lib/menu/style/css';
export default class App extends React.Component {
	render() {
		return (
			<div>
				<div className="left-wrapper" style={{width: 200, height: '100%', border: '1px red solid', position: 'fixed', left: 0, top: 0}}>
					<Menu/>
				</div>
				<div className="right-wrapper">
					<Header />
					<div>
						<div style={{height: 500}}>asdasd</div>
					</div>
				</div>
			</div>
		);
	}
}