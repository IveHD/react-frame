import React from 'react';
import './style.less';
class Index extends React.Component {
	state = {
		active: false
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.clickKey == this.props.mKey){
			this.setState({active: true})
		}else{
			this.setState({active: false})
		}
	}
	render() {
		return (
			<div data-m-key={this.props.mKey} className={"m-item m-level-" + this.props.mKey.split('.').length + (this.state.active ? ' m-active' : '')}>
				{ this.props.children }
			</div>
		);
	}
}

export default Index;