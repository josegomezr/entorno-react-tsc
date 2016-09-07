import * as React from 'react';
import * as $ from 'jquery';

import {Link} from 'react-router';


export class Post extends React.Component<IPostProps, IPostState> {
    baseUrl : string
    constructor () {
        super();
        // this.removeItem = this.removeItem.bind(this);
        this.baseUrl = window._BASE || '/';
        console.log('hiar')

    }

    state : IPostState = {
    	post: {}
    }

    componentDidMount(){
    	$.getJSON(`${this.baseUrl}/api/leer/${this.props.routeParams.id}`)
    		.then( (post : IPost) => {
	            this.setState({
	            	post: post
	            })
	        })
    }

    render () {
        return (
            <div>
                <h1>{this.state.post.titulo}</h1>
                <p>{this.state.post.detalle}</p>
                <Link className="btn btn-primary" to="/">&laquo; Volver al Inicio</Link>
            </div>
        );
    }
}
