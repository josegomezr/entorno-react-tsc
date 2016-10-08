import * as React from 'react';
import * as $ from 'jquery';
import {Link} from 'react-router';

export class FormularioContacto 
  extends React.Component<{}, componentes.IFormularioContactoState> {

  baseApi : string
  lista : Array<api.IContacto>
  state : componentes.IFormularioContactoState = {
    datos: {
      nombre : 'jose',
      cedula: '123',
      telefono : '444'
    }
  }
  constructor(){
    super();
    this.baseApi = "http://192.168.1.10:83/api/abonado/data_example";
    this.validate = this.validate.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }
  validate(){
    console.log(this.state.datos)
  }

  _handleChange(event : Event){
    console.log(event)
    var target = event.target as HTMLInputElement;
    var nuevoEstado = this.state.datos as compat.Map<string>;
    nuevoEstado[target.name] = target.value;

    this.setState({
      datos: nuevoEstado
    })
  }

  render () {
    return (
      <form onSubmit={this.validate}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input id="nombre" className="form-control" 
            name="nombre" onChange={this._handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input id="apellido" className="form-control" 
            name="apellido" onChange={this._handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Telefono:</label>
          <input id="telefono" className="form-control" 
            name="telefono" onChange={this._handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>
      </form>
    );
  }
}
