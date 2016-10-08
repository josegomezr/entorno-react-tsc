import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import {App} from './App';
import {ListaContactos} from './ListaContactos';
import {VerContacto} from './VerContacto';
import {FormularioContacto} from './FormularioContacto';
import * as $ from 'jquery';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="ver/:cedula" component={VerContacto} />
          <Route path="formulario" component={FormularioContacto} />
          <IndexRoute component={ListaContactos} />
        </Route>
    </Router>
    ), $('#contenido').get(0)
);