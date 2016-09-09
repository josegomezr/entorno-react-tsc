export function forzarAutenticacion(
    rutaSiguiente : ReactRouter.MatchArgs,
    redireccion : ReactRouter.RedirectFunction,
    callback : Function
  ){

    if(!localStorage.getItem('token')) {
      redireccion({
        pathname: '/login'
      })
      callback();
    }
    var base_url = window._BASE;
    var token = localStorage.getItem('token');

    $.getJSON(`${base_url}/api/validar-token/${token}`).done(() => {
        callback();
    }).fail(() => {
        redireccion({
          pathname: '/login'
        })
        callback();
    })

}