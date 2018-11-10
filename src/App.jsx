import React from 'react';
import Header from '@component/header';
import Menu from '@component/menu';
import Content from '@view/main';
import 'antd/lib/menu/style/css';
import { BrowserRouter } from "react-router-dom";
export default class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div>
				<div className="left-wrapper" style={{width: 200, height: '100%', border: '1px red solid', position: 'fixed', left: 0, top: 0}}>
					<Menu/>
				</div>
				<div className="right-wrapper">
					<Header />
					<Content />
				</div>
				</div>
			</BrowserRouter>
		);
	}
}