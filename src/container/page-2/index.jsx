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
				<h1>Page-2</h1>
				<h1>{this.state.msg}</h1>
				<Button type="primary" onClick={() => {
					webApi.get('/fetch/msg', {})
					.then(result => {
						if(result.statusCode == 'success'){
							this.setState({msg: result.msg});
						}
					}).catch(error => {console.error(error)});
				}}>获得数据</Button>
			</div>
		);
	}
}