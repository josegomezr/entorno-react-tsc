import * as React from 'react';
import * as $ from 'jquery';
import {Link} from 'react-router';

export class ListaContactos 
  extends React.Component<{}, componentes.IListaContactosState> {

  baseApi : string
  lista : Array<api.IContacto>
  state : componentes.IListaContactosState = {
    contactos : []
  }
  constructor(){
    super();
    this.baseApi = "http://192.168.1.10:83/api/abonado/search_person";
  }

  componentDidMount(){
    $.getJSON(this.baseApi).done( (respuesta : Array<api.IContacto>) => {
      this.setState({
        contactos: respuesta
      })
    })
  }

  render () {
    var contactos = this.state.contactos.map(
      (contacto : api.IContacto, index : number) => {
        return (<li key={index}>
          <strong>{contacto.nombre} {contacto.apellido}</strong>
          <Link to={`ver/${contacto.cedula}`}>Ver &raquo;</Link>
          </li>)
      })
    return (
      <div>
        <h1>los 50 de armando</h1>
        <ul>{contactos}</ul>
      </div>
    );
  }
}
