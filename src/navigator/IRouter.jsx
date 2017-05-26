import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink, Redirect} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as navigatorAction from '../action/navigator';

import style from '@assets/less/navigator/irouter.less';
import {Links, Routes} from './routeConfig'
import NoMatch from '@container/NoMatch';
import cn from 'classnames';

let firstGradeItems = [];
let secondGradeItems = [];
let thirdGradeItems = [];
let pathSplitArray = [];
const firstGradeCodeRegEx = /^[1-9]+[0-9]*$/;
const secondGradeCodeRegEx = /^([1-9]+[0-9]*)+(\.[1-9]*)$/;
const thirdGradeCodeRegEx = /^([1-9]+[0-9]*)+(\.[1-9]*)+(\.[1-9]*)$/;
class IRouter extends React.Component{
	constructor(props) {
		super();
	}
	componentWillMount() {
		Links.map((e) => {
			let o = {};
			o['hover-' + e.code] = false;
			this.setState(o)
			if(firstGradeCodeRegEx.test(e.code)){
				firstGradeItems.push(Object.assign({}, e, {children: []}));
			}else if(secondGradeCodeRegEx.test(e.code)){
				secondGradeItems.push(e);
			}else if(thirdGradeCodeRegEx.test(e.code)){
				thirdGradeItems.push(e);
			}
		});

		secondGradeItems.map((e) => {
			let firstGradeItem = firstGradeItems.find(el => {
				return el.code === e.code.split('.')[0];
			});
			if(firstGradeItem){
				firstGradeItem.children.push(Object.assign({}, e, {children: []}))
			}else{
				throw ('没有找到code='+e.code+'的上级菜单！');
			}
		});

		thirdGradeItems.map((e) => {
			let gradeArray = e.code.split('.');
			let firstGradeItem = firstGradeItems.find(el => {
				return el.code === e.code.split('.')[0];
			});
			if(firstGradeItem){
				let secondGradeItem = firstGradeItem.children.find(el => {
					return el.code === gradeArray[0] + '.' + gradeArray[1];
				})
				if(secondGradeItem){
					secondGradeItem.children.push(e);
				}else{
					throw ('没有找到code='+e.code+'的上级菜单！');
				}
			}else{
				throw ('没有找到code='+e.code+'的上级菜单！');
			}
		});
	}

	handleMouseOver(code) {
		let o = {};
		o['hover-' + code] = true;
		this.setState(o)
	}

	handleMouseLeave(code) {
		let o = {};
		o['hover-' + code] = false;
		this.setState(o);
	}
	handleClick(code) {
		this.props.NavEvent.menuToHighLight(code);
		console.log(this.props)
	}
	calculateClassNames = code => {
		if(firstGradeCodeRegEx.test(code)){
			return cn(['first-grade-ul', 'clearfix'])
		}else if (secondGradeCodeRegEx.test(code)) {
			let firstCode = code.split('.')[0];
			return cn('second-grade-ul', {'second-grade-show': this.state['hover-' + firstCode], 'second-grade-hide': !this.state['hover-' + firstCode]});
		}else if(thirdGradeCodeRegEx.test(code)) {
			return 'third-grade-ul';
		}
	}

	isActive = (code) => {
		let index = this.props.highLightCodes.indexOf(code + '');
		return index >= 0;
	}

	itemsRender (items) {
		return (
			<ul className={this.calculateClassNames(items[0].code)}>
				{
					items.map(e => (
						<li key={e.code} style={{border: '1px red solid'}} onMouseOver={this.handleMouseOver.bind(this, e.code)} 
															onMouseLeave={this.handleMouseLeave.bind(this, e.code)}>
							<NavLink exact to={{pathname: e.path}} 
									isActive={this.isActive.bind(this, e.code)}
									activeClassName={firstGradeCodeRegEx.test(e.code) ? 'avtice-first-grade' : 'active-second-grade'} 
									replace={true}
									onClick={this.handleClick.bind(this, e.code)}>
								{e.name}
							</NavLink>
							{e.children && e.children.length > 0 ? (
								this.itemsRender(e.children)
							): ''}
						</li>
					))
				}
			</ul>
		)
	}

	render(){
		return (
			<Router basename="/#/">
				<div className="router-wrapper">
					{
						this.itemsRender(firstGradeItems)
					}
					<div className="seal"></div>
					<hr/>
					<Switch>
						{	
							Routes.map((e) => (
								<Route exact key={e.path} path={e.path} component={e.component}/>
							))
						}
						<Route component={NoMatch}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

const mapStateToProps = (state) => {
	console.log('state', state)
	return {
		highLightCodes: state.navigator.highLightCodes
	};
}

const mapDispatchToProps = (dispatch) => ({
	NavEvent: bindActionCreators(navigatorAction, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(IRouter)