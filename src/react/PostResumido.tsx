import * as React from 'react';
import * as $ from 'jquery';
import {Link} from 'react-router';

export class PostResumido extends React.Component<IPostProps, IPostState> {
    constructor () {
        super();
    }
    render () {
        return (
            <div>
                <h3>{this.props.titulo}</h3>
                <p>{this.props.detalle.substr(0, 100)}...</p>
                <Link className="btn btn-primary" to={`/post/${this.props.id}`}> Leer Mas &raquo;</Link>
            </div>
        );
    }
}
