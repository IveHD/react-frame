import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Router from '@src/route';

const View001 = Loadable({
	loader: () => import(/* webpackChunkName: "cmpt001" */ '@view/view001'),
	loading() {
		return <div>Loading...</div>
	}
});

export default class Content extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={View001} />
				<Route path="/view/home" component={Home002} />
			</Switch>
		);
	}
}

function Home001() {
	return (
		<div>hello Home001...</div>
	);
}

function Home002() {
	return (
		<div>hello Home002...</div>
	);
}