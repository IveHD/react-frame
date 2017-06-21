import React from 'react';
import { connect } from 'react-redux';
import {fetchSubject} from '@src/action/subject.js';
import Header from './header';
import Content from './content';
import {BrowserRouter as Router} from 'react-router-dom';
import Footer from './footer';

require('@asset/less/reset.less');
require('@asset/less/global.less');
class App extends React.Component {
	componentDidMount () {
		this.props.dispatch(fetchSubject());
	}
	render(){
		return (
			<Router basename="/#/">
				<div>
					<Header subject={this.props.subject}/>
					<Content/>
					<Footer/>
				</div>
			</Router>
		)
	}
}
const mapStateToProps = (state) => {
    return {
    	subject: state.subject.subject
	}
};

export default connect(mapStateToProps)(App)