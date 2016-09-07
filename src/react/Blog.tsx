import * as React from 'react';
import * as $ from 'jquery';

import {Link} from 'react-router';
import {Titular} from './Titular';

export class Blog extends React.Component<{}, spec.IBlogState> {
  baseUrl : string
  state : spec.IBlogState = {
    posts : []
  }
  constructor(){
    super();
    this.baseUrl = window._BASE || '/';
  }
  componentDidMount(){
    $.getJSON(`${this.baseUrl}/api/listar/`).then( (posts : Array<api.IPost>) => {
      this.setState({
        posts: posts
      })
    })
  }
  render () {
    var noticias = this.state.posts.map((e) => {
      return (
        <Titular idPost={e.id_post} tituloPost={e.titulo_post} 
          contenidoPost={e.contenido_post} autor={e.usuario} 
          categoria={e.categoria} key={e.id_post} />
      );
    });
    return (
      <div>
        <h1>Noticias</h1>
        <div className="lista-noticias">
          {noticias}
        </div>
      </div>
    );
  }
}