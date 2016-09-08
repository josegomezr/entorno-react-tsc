export function forzarAutenticacion(
    rutaSiguiente : ReactRouter.MatchArgs,
    redireccion : ReactRouter.RedirectFunction
  ){

    if(!localStorage.getItem('token')) {
      console.log("NO LOGIN, Redireccion")
      redireccion({
        pathname: '/login'
      })
    }
}