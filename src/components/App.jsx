import React from 'react';
import FirstComponent from '@components/props/FirstComponent'
import SecondComponent from '@components/props/SecondComponent'
import Button from 'antd/lib/button'
import 'antd/lib/button/style';
export default class App extends React.Component {
	componentWillMount() {
		this.setState({number: 0});
	}
	handleClick(){
		this.setState((preState, props) => {
			return {number: preState.number+1}
		})
		console.log(this.state)
	}
	handleNumberChange(number){
		this.setState({number: number})
	}
	render(){
		return (
			<div>
				<Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
				<button onClick={this.handleClick.bind(this)}>App</button>
				<FirstComponent number={this.state.number} onNumberChange={this.handleNumberChange.bind(this)}/>
				<hr/><hr/>
				<SecondComponent number={this.state.number}/>
			</div>
		)
		
	}
}