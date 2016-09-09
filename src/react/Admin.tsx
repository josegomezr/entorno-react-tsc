import * as React from 'react';
import * as $ from 'jquery';

import {Link, withRouter} from 'react-router';

@withRouter
class Admin extends React.Component<spec.IAdminProps, {}> {
  constructor(){
    super();
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }
  cerrarSesion(){
    localStorage.setItem('token', null);
    this.props.router.replace({
      pathname: '/login'
    });
  }
  render () {
    return (
      <div>
        <nav className="navbar navbar-static-top navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Administrador</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={this.cerrarSesion}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
          <hr />
          <p>Pie de Pagina</p>
        </div>
      </div>
    );
  }
}

export {Admin}