import * as React from 'react';
import * as $ from 'jquery';

import {withRouter} from 'react-router';

@withRouter
class LoginForm extends React.Component<spec.ILoginFormProps, spec.ILoginFormState> {
  baseUrl : string
  state : spec.ILoginFormState = {
    usuario: '',
    clave: '',
    error: false
  }

  constructor(){
    super();
    this.baseUrl = window._BASE || '/';
    this.validar = this.validar.bind(this);
    this._cambioClave = this._cambioClave.bind(this);
    this._cambioUsuario = this._cambioUsuario.bind(this);
  }

  validar(evento : Event){
    evento.preventDefault();
  
    this.setState({
      error: false
    })

    console.log(this.state);       
    if( !(this.state.usuario && this.state.clave) ) {
      this.setState({
        error: true
      })
      return;
    }
    this.verificarLogin();
  }

  verificarLogin(){
    $.post(`${this.baseUrl}/api/autenticar/`, {
      usuario : this.state.usuario,
      clave : this.state.clave
    }).done( (sesion : api.ISesion) => {
      localStorage.setItem('token', sesion.id_sesion);
      this.props.router.replace('/admin');
    }).fail ( () => {
      this.setState({
        error: true
      })
    });
  }
  _cambioUsuario(evento: Event){
    this.setState({
      usuario: (evento.target as HTMLInputElement).value
    })
  }
  _cambioClave(evento : Event){
    this.setState({
      clave: (evento.target as HTMLInputElement).value
    })
  }
  render () {
    return (
      <div className="LoginForm">
        {this.state.error && (
          <div className="alert alert-danger">
            Error, verifique usuario y/o clave
          </div>
        )}
        <form onSubmit={this.validar}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuario" onChange={this._cambioUsuario} 
              className="form-control" name="usuario" placeholder="Us3rnam3" />
          </div>
          <div className="form-group">
            <label htmlFor="clave">Clave:</label>
            <input type="password" id="clave" onChange={this._cambioClave}
              className="form-control" name="clave" placeholder="******" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default"
              >Iniciar Sesi&oacute;n</button>
          </div>
        </form>
      </div>
    );
  }
}

export {LoginForm}