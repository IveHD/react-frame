import React from 'react';
import IRouter from '../navigator/IRouter';
import resetStyle from '@assets/less/reset.less';
import global from '@assets/less/global.less';
export default class App extends React.Component {
	render(){
		return (
			<IRouter></IRouter>
		)
	}
}