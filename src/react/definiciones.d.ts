interface Window {
  _BASE ?: string
}

declare namespace api{

  interface ICategoria {
    id_categoria ?: string
    nombre_categoria ?: string
  }

  interface IUsuario {
    id_usuario ?: string
    nombre_usuario ?: string
    apellido_usuario ?: string
  }

  interface IPost {
    id_post ?: string
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
    idPost ?: string
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
  interface ICrearFormProps {
    router ?: ReactRouter.InjectedRouter
  }

  interface IModeloPost extends compat.Map {
    titulo ?: string
    contenido ?: string
    usuario ?: string
    categoria ?: string
  }

  interface ICrearFormState {
    error ?: boolean,
    categorias ?: Array<api.ICategoria>
    usuarios ?: Array<api.IUsuario>
    modelo ?: IModeloPost
  }

  interface IEditarFormParams {
    postId ?: string
  }

  interface IEditarFormProps {
    router ?: ReactRouter.InjectedRouter
    routeParams ?: IEditarFormParams
  }

  interface IEditarFormState {
    error ?: boolean
    modelo ?: IModeloPost
    categorias ?: Array<api.ICategoria>
    usuarios ?: Array<api.IUsuario>
  }
}


declare namespace compat {
  interface Map {
    [k:string] : any
  }
}