import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from 'react-router-dom';
import axios from 'axios';
import con from './config';

import App from './App'
import Show from './Show'
import Roots from './Roots'


class IndexRouter extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let self = this;
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/create" render = {() => <App/>}/>
                        <Route exact path="/show" render = {() => <Show/>}/>
                        <Route exact path="/roots" render = {() => <Roots/>}/>
                        <Route path='/' render={() => <Redirect to='/show' />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default IndexRouter;