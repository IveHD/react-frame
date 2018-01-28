import React from 'react';
import { Button } from 'element-react';
import 'element-theme-default';
import webApi from '@src/webApi';
export default class List extends React.Component{
	state = {
		msg: 'hello world...'
	}
	render(){
		return (
			<div>
				<h1>Page-3-1</h1>
			</div>
		);
	}
}