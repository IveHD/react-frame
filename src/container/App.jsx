import React from 'react';
import Menu from '@component/Menu';
import Content from './content';
import {BrowserRouter as Router} from 'react-router-dom';
import { BackTop } from 'antd';
import Header from '@container/header/index';
require('@asset/less/reset.less');
require('@asset/less/global.less');
export default class App extends React.Component {
	state = {
		basename: process.env.NODE_ENV == "development" ? '/#/' : '/index.html#/'
	};
	render(){
		return (
			<Router basename='/#/'>
				<div style={{display: 'flex', height: '100%'}}>
					<div style={{height: '100%'}}>
						<Menu/>	
					</div>
					
					<div style={{flexGrow: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100%'}}>
						<Header/>
						<div style={{overflow: 'auto', flexGrow: 1}}>
							<Content/>	
						</div>
					</div>
					<BackTop visibilityHeight="100"/>
				</div>
			</Router>
		)
	}
}