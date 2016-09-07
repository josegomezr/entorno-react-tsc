interface Window {
  _BASE : string
}

declare namespace api{
  interface IPost {
    id_post : number
    titulo_post : string
    contenido_post : string
    id_categoria : number
    id_usuario : number
  }
}

declare namespace spec {

  interface IBlogState {
    posts : Array<api.IPost>
  }
  
  interface ITitularProps {
    idPost : number
    tituloPost : string
    contenidoPost : string
  }
}

