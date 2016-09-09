interface Window {
  _BASE ?: string
}

declare namespace api{

  interface ICategoria {
    id_categoria ?: number
    nombre_categoria ?: string
  }

  interface IUsuario {
    id_usuario ?: number
    nombre_usuario ?: string
    apellido_usuario ?: string
  }

  interface IPost {
    id_post ?: number
    titulo_post ?: string
    contenido_post ?: string
    categoria ?: ICategoria
    usuario ?: IUsuario
  }

  interface ISesion {
    id_sesion : string
    usuario : IUsuario
  }
}

declare namespace spec {

  
  interface ITitularProps {
    idPost ?: number
    tituloPost ?: string
    contenidoPost ?: string
    autor ?: api.IUsuario
    categoria ?: api.ICategoria
  }

  interface IPostRouteParams {
    postId ?: string
  }

  interface IPostProps {
    routeParams ?: IPostRouteParams
  }

  interface IPostState {
    post ?: api.IPost    
  }

  interface ILoginFormProps{
    router ?: ReactRouter.InjectedRouter
  }

  interface IAdminProps{
    router ?: ReactRouter.InjectedRouter
  }

  interface ILoginFormState{
    error ?: boolean
    clave ?: string
    usuario ?: string
  }

  interface IBlogState {
    posts ?: Array<api.IPost>
  }
  
  interface IListarPostState {
    posts ?: Array<api.IPost>
  }
}

