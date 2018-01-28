import React from 'react';
import $ from 'jquery';
import './style.less';
class Index extends React.Component {
	constructor(props){
		super(props);
	}
	state = {
		extend: false
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.clickKey == nextProps.mKey){
			this.setState({extend: !this.state.extend});
		}else if(nextProps.clickKey.indexOf(nextProps.mKey+'.') == 0){
			this.setState({extend: true});
		}else{
			this.setState({extend: false});
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.extend 
			|| nextProps.clickKey == nextProps.mKey 
			|| (nextProps.clickKey.indexOf(nextProps.mKey+'.') == 0)){
			return true;
		}

		return false;
	}
	componentDidUpdate(prevProps, prevState) {
		$('.extend').slideDown('fast');
		$('.collapse').slideUp('fast');
	}
	componentDidMount() {
		this.subHeight = document.getElementById("extendable-"+this.props.mKey).firstChild.getBoundingClientRect().height;
		
	}
	render() {
		return (
			<div className={"h-menu-items m-level-" + this.props.mKey.split('.').length}>
				<div className={"sub-label" + (this.state.extend == true ? ' m-active' : '')} onClick={this.onClick} data-m-key={this.props.mKey}>{this.props.label}</div>
				<div id={"extendable-"+this.props.mKey} 
					className={"sub-chidren " + (this.state.extend == true ? 'extend' : 'collapse')}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Index;