interface IAutor {
	nombre ?: string;
	apellido ?: string;
	nickname ?: string;
}

interface IPost {
    id ?: number;
    titulo ?: string;
    detalle ?: string;
    autor ?: IAutor
}

interface IBlogState {
    posts?: Array<IPost>;
}

interface IBlogProps {
	baseUrl : string
}

interface IPostState {
	post : IPost
}

interface IPostRouteParams{
	id ?: string
}

interface IPostProps extends IPost {
	routeParams ?: IPostRouteParams
}

interface Window {
	_BASE : string
}