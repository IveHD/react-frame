import React, {findDOMNode} from 'react';

export default class SecondComponent extends React.Component{
	componentDidMount() {
		console.log('ref-input-componentDidMount', findDOMNode(this.refs.input));
	}
	handleClick() {
		console.log('refInput', this.refs.input);
	}
	render(){
		let number = this.props.number;
		return (
			<div>this is the SecondComponent.
				<hr/>
				{number}
				<input type="text" ref="input"/>
				<button onClick={this.handleClick.bind(this)}>get ref</button>
			</div>
		)
	}
}