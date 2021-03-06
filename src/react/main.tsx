import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import * as $ from 'jquery';
import {App} from './App';
import {Blog} from './Blog';
import {Post} from './Post';

import {LoginForm} from './LoginForm';
import {Admin} from './Admin';

import {forzarAutenticacion} from './Autenticacion'

import {ListarPost} from './ListarPost'


import {CrearForm} from './CrearForm';
import {EditarForm} from './EditarForm';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Blog} />
      <Route path="post/:postId" component={Post} />
      <Route path="login" component={LoginForm} />
    </Route>
    <Route path="/admin/" component={Admin} onEnter={forzarAutenticacion}>
      <IndexRoute component={ListarPost} />
      <Route path="editar/:postId" component={EditarForm} />
      <Route path="crear" component={CrearForm} />
    </Route>
  </Router>
  ), $('#contenido').get(0)
);