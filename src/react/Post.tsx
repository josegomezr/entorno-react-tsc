import * as React from 'react';
import * as $ from 'jquery';

import {Link} from 'react-router';

export class Post extends React.Component<spec.IPostProps, spec.IPostState> {
  baseUrl : string
  state : spec.IPostState = {
    post : {}
  }
  constructor(){
    super();
    this.baseUrl = window._BASE || '/';
  }
  componentDidMount(){
    $.getJSON(`${this.baseUrl}/api/leer/${this.props.routeParams.postId}`)
      .then( (post : api.IPost) => {
        this.setState({
          post: post
        })
    })
  }
  render () {
    return (
      <div className="post">
        <h1>{this.state.post.titulo_post}</h1>
        <p>{this.state.post.contenido_post}</p>
      </div>
    );
  }
}