import * as React from 'react';
import * as $ from 'jquery';

export class VerContacto 
  extends React.Component<componentes.IVerContactoProps, 
    componentes.IVerContactoState> {
  baseApi : string
  state : componentes.IVerContactoState = {
    contacto : {}
  }
  constructor(){
    super();
    this.baseApi = "http://192.168.1.10:83/api/abonado/search_person";
  }

  componentDidMount(){
    $.getJSON(this.baseApi, {cedula: this.props.routeParams.cedula}).done(
      (respuesta : Array<api.IDetalleContacto>) => {
      this.setState({
        contacto: respuesta[0].contacto
      })
    })
  }

  render () {
    return (
      <div>
        <strong>Nombre: </strong> <span>{this.state.contacto.nombre}</span>
        <strong>Apellido: </strong> <span>{this.state.contacto.apellido}</span>
      </div>
    );
  }
}
