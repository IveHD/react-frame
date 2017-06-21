import React from 'react';
import { Route, Switch} from 'react-router-dom';
import {Links, Routes} from '@src/route/routeConfig';
import NoMatch from '@container/nomatch/index';
export default class App extends React.Component {
    render(){
        return (
            <Switch>
                {
                    Routes.map((e) => (
                        <Route exact key={e.path} path={e.path} component={e.component}/>
                    ))
                }
                <Route component={NoMatch}/>
            </Switch>
        )
    }
}

