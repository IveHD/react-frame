import React, { Component } from 'react';
import config from './authorityFilter.js';
import Items from './Items/';
import Item from './Item/';
import {NavLink} from 'react-router-dom';
import './style.less';
class App extends Component {
	state = {
		clickKey: 0,
		extend: false
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}
	componentDidMount() {
		let url = window.location.hash.replace('#', '');
		let defaultKey = this.findMenuKey(config, url);
		this.setState({
			clickKey: defaultKey
		});
	}
	findMenuKey = (menuConfig, url) => {
		menuConfig.find(e => {
			if(e.maps && e.maps.find(e => e.path == url)){
				this.key = e.key;
				return true;
			}else if(e.children && e.children.length > 0){
				this.findMenuKey(e.children, url)
			}
		});
		return this.key+'';
	}
	onClick = e => {
		let target = e.target;
		if(target.getAttribute('class') 
			&& target.getAttribute('class').split(' ').indexOf('sub-label') != -1){
			this.setState({
				clickKey: target.getAttribute('data-m-key')
			});
		}else if(target.parentElement.getAttribute('class') 
			&& target.parentElement.getAttribute('class').split(' ').indexOf('m-item') != -1 ){
			this.setState({
				clickKey: target.parentElement.getAttribute('data-m-key')
			});
		}
	}
	
	RenderMenu = config => {
		if(config && config.length > 0){
			return (
				<div>
					{
						config.map(e => {
							if((e.children instanceof Array) && e.children.length > 0){
								return (
									<Items key={e.key} mKey={e.key} label={e.label} 
										clickKey={this.state.clickKey}>
										{this.RenderMenu(e.children)}
									</Items>
								)
							}else if(e.maps && e.maps.length > 0){
								if(e.key == '12'){
									return <Item key={e.key} mKey={e.key} clickKey={this.state.clickKey}>
										<a href={'http://' + location.host.replace('admin.', 'admin-app.')}>旧版App管理后台</a>
									</Item>
								}
								return <Item key={e.key} mKey={e.key} clickKey={this.state.clickKey}><NavLink exact to={{pathname: e.maps[0].path}}>{ e.label }</NavLink></Item>
							}else{
								return null;
							}
						})
					}
				</div>
			)
		}else{
			return null;
		}
	}
	render() {
		return (
			<div className="h-menu"  onClick={ this.onClick } style={{...this.props.style}}>
				<img width="100%" style={{marginTop: 10}} src={require('@src/asset/image/logo.png')} />
				<div>
					<div style={{marginBottom: 100}}>
						{this.RenderMenu(config)}	
					</div>
					
				</div>
				
			</div>
		);
	}
}
export default App;
