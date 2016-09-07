import * as React from 'react';
import * as $ from 'jquery';
import {PostResumido} from './PostResumido';

export class Blog extends React.Component<IBlogProps, IBlogState> {
    state : IBlogState = {
        posts: []
    }

    baseUrl : string

    constructor () {
        super();
        this.baseUrl = window._BASE || '/';
    }

    componentDidMount(){
        $.getJSON(`${this.baseUrl}/api/listar/`).then((posts : Array<IPost>) => {
            this.setState({
                posts: posts
            })
        })
    }

    render () {
        var posts = this.state.posts.map((e) => {
            return (<li key={e.id} className="list-group-item">
            	<PostResumido
                id={e.id}
                titulo={e.titulo} 
                detalle={e.detalle} 
            /> 
            </li>);
        })
        return (
            <div>
                <h1>Blog</h1>
                <ul className="list-group">
                {posts}
                </ul>
            </div>
        );
    }
}
