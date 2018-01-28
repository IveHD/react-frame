import React from 'react';
import { Icon } from 'antd';
import './style.less';
import webApi from '@src/webApi';
export default class Header extends React.Component {
	state = {
		expendShow: false
	}
	onLogout(){
        location.href = '/logout'
	}
	render() {
		return (
			<div id="header-wrapper">
				<div className="my-account" onMouseOver={ () => {this.setState({expendShow: true})} } onMouseOut={ () => {this.setState({expendShow: false})} }>
					<div className="my-account-text" ><Icon type="user" /><span style={{fontSize: 18}}>我的账号</span></div>
					<div className="exit" style={{display: this.state.expendShow ? 'block' : 'none'}} ><a onClick={this.onLogout.bind(this)}>安全退出</a></div>
				</div>
			</div>
		);
	}
}