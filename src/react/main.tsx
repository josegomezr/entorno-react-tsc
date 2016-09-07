import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import {App} from './App';
import {Blog} from './Blog';
import {Post} from './Post';
import {NotFound} from './NotFound';
import * as $ from 'jquery';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Blog} />
            <Route path="post/:id" component={Post} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
    ), $('#contenido').get(0)
);