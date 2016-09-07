import * as React from 'react';
import * as $ from 'jquery';

import {Link} from 'react-router';

export class Titular extends React.Component<spec.ITitularProps, {}> {
  render () {
    return (
      <div className="noticia" key={this.props.idPost}>
        <h3>
          <Link to={`/post/${this.props.idPost}`}> 
          {this.props.tituloPost}
          </Link>
        </h3>
        <p>Publicado Por: <strong>{this.props.autor.nombre_usuario}
          {this.props.autor.apellido_usuario}</strong>
        </p>
        <p>{this.props.contenidoPost.substr(0, 100)}...</p>
        <Link to={`/post/${this.props.idPost}`}
          className="btn btn-primary"> 
          Leer M&aacute;s 
        </Link>
      </div>
    );
  }
}