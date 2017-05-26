import React from 'react';
import {render} from 'react-dom';

export default class SubjectResult extends React.Component{
	componentDidMount() {
		
	}
	render(){
		return (
			<div>
				SubjectResult: { this.props.match.params.subject }
			</div>
		)
	}	
}