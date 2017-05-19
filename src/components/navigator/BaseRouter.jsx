import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Home from '../content/Home';
import About from '../content/About';

export default class BaseRouter extends React.Component{
    render(){
        return (
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={Home}>Home</Route>
                    <Route path="about/" component={About}>About</Route>
                </Router>
            </div>
        );
    }
}
