import * as React from 'react';
import * as $ from 'jquery';

import {Link} from 'react-router';
import {Titular} from './Titular';

export class ListarPost extends React.Component<{}, spec.IListarPostState> {

  baseUrl : string
  state : spec.IListarPostState = {
    posts : []
  }
  constructor(){
    super();
    this.baseUrl = window._BASE || '/';
    this.eliminarNoticia = this.eliminarNoticia.bind(this);
  }
  componentDidMount(){
    this._buscarPosts()
  }
  _buscarPosts(){
    $.getJSON(`${this.baseUrl}/api/listar/`).then( (posts : Array<api.IPost>) => {
      this.setState({
        posts: posts
      })
    })
  }
  eliminarNoticia(e : Event){
    var cancelar = confirm('¿Seguro que desea eliminar?');
    if(!cancelar) {
      return;
    }

    var id = (e.target as HTMLElement).id
    $.getJSON(`${this.baseUrl}/api/admin/eliminar/${id}`)
      .done( () => {
        this._buscarPosts()
      })
  }

  render () {
    var noticias = this.state.posts.map((e) => {
      return (
        <tr key={e.id_post}>
          <td>{e.id_post}</td>
          <td>{e.titulo_post}</td>
          <td>{e.usuario.nombre_usuario}</td>
          <td>{e.categoria.nombre_categoria}</td>
          <td>
            <Link target="_blank" to={`/post/${e.id_post}`} 
              className="btn btn-info">Ver</Link>
            
            <Link to={`/admin/editar/${e.id_post}`} 
              className="btn btn-warning">Editar</Link>
            
            <button className="btn btn-danger" id={e.id_post} onClick={this.eliminarNoticia}>Eliminar</button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h1>Administrar Noticias</h1>
        <div className="lista-noticias">
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>ID</td>
                <td>Titulo</td>
                <td>Nombre</td>
                <td>Categoria</td>
                <td>Acciones</td>
              </tr>
            </thead>
            <tbody>
              {noticias}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}