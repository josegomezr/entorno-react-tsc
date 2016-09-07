import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import * as $ from 'jquery';
import {App} from './App';

import {Blog} from './Blog';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Blog} />
    </Route>
  </Router>
  ), $('#contenido').get(0)
);