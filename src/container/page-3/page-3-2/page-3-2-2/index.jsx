import React from 'react';
import { Button } from 'element-react';
import 'element-theme-default';
import webApi from '@src/webApi';
import { clearEmptyValue } from '@src/util';
export default class List extends React.Component{
	state = {
		msg: 'hello world...'
	}
	render(){
		return (
			<div>
				<h1>Page-3-2-2</h1>
			</div>
		);
	}
}