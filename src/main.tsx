import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import {App} from './App';
import * as $ from 'jquery';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App} />
    </Router>
    ), $('#contenido').get(0)
);