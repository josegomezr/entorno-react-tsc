import * as React from 'react';
import * as $ from 'jquery';

import {withRouter} from 'react-router';

@withRouter
export class EditarForm extends React.Component<spec.IEditarFormProps, spec.IEditarFormState> {
  baseUrl : string
  state : spec.IEditarFormState = {
    modelo : {
      usuario: '',
      titulo: '',
      contenido : '',
      categoria : '',
    },
    categorias: [],
    usuarios : [],
    error: false
  }

  constructor(){
    super();
    this.baseUrl = window._BASE || '/';
    this.validar = this.validar.bind(this);
    this._cambioCampo = this._cambioCampo.bind(this);
  }

  buscarUsuarios() {
    $.getJSON(`${this.baseUrl}/api/usuarios/listar/`)
      .then( (usuarios : Array<api.IUsuario>) => {
        this.setState({
          usuarios: usuarios
        })
    })
  }
  buscarCategorias(){
    $.getJSON(`${this.baseUrl}/api/categorias/listar/`)
      .then( (categorias : Array<api.ICategoria>) => {
        this.setState({
          categorias: categorias
        })
    })
  }
  buscarPost(){
    $.getJSON(`${this.baseUrl}/api/leer/${this.props.routeParams.postId}/`)
      .then( (post : api.IPost) => {
        var nuevoModelo = {
          titulo: post.titulo_post,
          contenido : post.contenido_post,
          usuario: post.usuario.id_usuario,
          categoria:  post.categoria.id_categoria
        }
        this.setState({modelo : nuevoModelo})
    })
  }
  componentDidMount(){
    this.buscarCategorias()
    this.buscarUsuarios()
    this.buscarPost()
  }


  validar(evento : Event){
    evento.preventDefault();
  
    this.setState({
      error: false
    })

    var valid = true;

    for ( var key in this.state.modelo){
      valid = valid && !!this.state.modelo[key];
    }

    if(!valid) {
      this.setState({
        error : true
      });
      return;
    }

    this.editarNoticia();
  }

  editarNoticia(){
    var url = `${this.baseUrl}/api/admin/editar/${this.props.routeParams.postId}`;
    $.post(url, this.state.modelo)
      .done(() => {
        this.props.router.replace({
          pathname:'/admin/'
        })
      }).fail( () => {
        this.setState({
          error: true
        })
        console.log('error api');
      })
  }

  _cambioCampo(evento: Event){
    var target = evento.target as HTMLInputElement;
    var nuevoEstado = this.state.modelo as compat.Map;
    var nombre = target.name;

    nuevoEstado[nombre] = target.value;
    this.setState({
      modelo : nuevoEstado
    })
  }

  render () {
    var opcionesCategoria = this.state.categorias.map(function( e : api.ICategoria){
      return <option key={e.id_categoria} value={e.id_categoria}>{e.nombre_categoria}</option>
    })
    var opcionesUsuario = this.state.usuarios.map(function( e : api.IUsuario){
      return <option key={e.id_usuario} value={e.id_usuario}>{e.nombre_usuario}</option>
    })

    return (
      <div className="EditarForm">
        {this.state.error && (
          <div className="alert alert-danger">
            Error, verifique usuario y/o clave
          </div>
        )}
        <form onSubmit={this.validar}>
          <div className="form-group">
            <label htmlFor="titulo">TItulo:</label>
            <input type="text" id="titulo" value={this.state.modelo.titulo} 
              onChange={this._cambioCampo} className="form-control" 
              name="titulo" placeholder="Un titulo" />
          </div>
          <div className="form-group">
            <label htmlFor="contenido">Contenido:</label>
            <textarea id="contenido" value={this.state.modelo.contenido}
              onChange={this._cambioCampo} className="form-control" 
              name="contenido" placeholder="Lorem ipsum dolor sit amet" />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoria:</label>
            <select id="categoria" onChange={this._cambioCampo}
              className="form-control" name="categoria"
              value={this.state.modelo.categoria}>
              <option value="">Seleccione Categoria</option>
              {opcionesCategoria}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <select id="usuario" onChange={this._cambioCampo}
              className="form-control" name="usuario"
              value={this.state.modelo.usuario}>
                <option value="">Seleccione Usuario</option>
                {opcionesUsuario}
              </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default"
              >Crear Noticia</button>
          </div>
        </form>
      </div>
    );
  }
}
