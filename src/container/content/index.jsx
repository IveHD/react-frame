import React from 'react';
import { Route, Switch} from 'react-router-dom';

import MenuConfig from '@component/Menu/authorityFilter';
import Bundle from '@src/router/bundle';

const lazyComponent = (component) => {
	return (props) => (
		<Bundle load={component}>
			{/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
			{Component => <Component />}
		</Bundle>
	)
};
export default class App extends React.Component {
	Routes = []
	componentWillMount() {
		this.ContentRender(MenuConfig)
	}
	ContentRender = (config) => {
		config.forEach((e, i) => {
			if(e.maps && e.maps.length > 0){
				e.maps.forEach((el, index) => {
					this.Routes.push(<Route key={i + '-' + index} exact path={el.path} component={lazyComponent(el.component)}/>)
				})
			}
			if(e.children && e.children.length > 0){
				this.ContentRender(e.children);
			}
		})
	}

	Welcome = () => <div>
		<h1 style={{color: '#6b5a5a', fontWeight: 100}}>欢迎使用穿杨模考Admin管理后台！</h1>
	</div>

	NotFound = () => <div>
		<h1>页面丢失或无权限查看！请使用菜单进入其他页面！</h1>
		<h3>Page is missing or without permission to view! Please use the menu to enter other pages!</h3>
	</div>

	render(){
		return (
			<div style={{margin: 50}}>
				<Switch>
					<Route path="/" exact component={this.Welcome} />
					{this.Routes}
					<Route path="*" component={this.NotFound} />
				</Switch>
			</div>
		)
	}
}

