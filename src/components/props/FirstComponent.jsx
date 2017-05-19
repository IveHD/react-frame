import React from 'react';

export default class FirstComponent extends React.Component{
	constructor(props) {
		super(props);
		this.state = {number: props.number};
	}
	componentDidMount() {
	}
	handleClick() {
		this.props.onNumberChange(this.props.number + 10);
	}
	render(){
		let number = this.props.number;
		return (
			<div>this is the FirstComponent.
				<hr/>
				<button onClick={this.handleClick.bind(this)}>FirstComponent(+10)</button>
				{number}
			</div>
		)
	}
}