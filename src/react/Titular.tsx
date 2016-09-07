import * as React from 'react';
import * as $ from 'jquery';

import {Link} from 'react-router';

export class Titular extends React.Component<spec.ITitularProps, {}> {
  render () {
    return (
      <div className="noticia" key={this.props.idPost}>
        <h3>{this.props.tituloPost}</h3>
        <p>{this.props.contenidoPost.substr(0, 100)}...</p>
      </div>
    );
  }
}