interface Window {
	_BASE : string
}

declare module compat{
  interface Map<T>{
    [k: string] : T
  }
}

declare module modelo{
  interface Contacto{
    nombre ?: string
    cedula ?: string
    telefono ?: string
  }
}
declare module componentes{
  interface IFormularioContactoState{
    datos : modelo.Contacto
  }

  interface IListaContactosState{
    contactos : Array<api.IContacto>
  }
  interface IVerContactoState{
    contacto : api.IContacto
  }
  interface IVerContactoRouteParams {
    cedula: string
  }
  interface IVerContactoProps{
    routeParams : IVerContactoRouteParams
  }
}

declare module api {
  interface IContacto {
    id_persona ?: string
    cedula ?: string
    nombre ?: string
    apellido ?: string
    telefono ?: string
  }

  interface IDetalleContacto{
    contacto : IContacto
  }
}
