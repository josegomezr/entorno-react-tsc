CREATE TABLE usuario (
	id_usuario int not null auto_increment,
	nombre_usuario varchar(100) not null,
	apellido_usuario varchar(100) not null,
	clave_usuario varchar(128) not null,
	primary key (id_usuario)
);
CREATE TABLE categoria (
	id_categoria int not null auto_increment,
	nombre_categoria varchar(100) not null,
	primary key (id_categoria)
);

CREATE TABLE post (
	id_post int not null auto_increment,
	titulo_post varchar(140) not null,
	contenido_post text,
	id_categoria int not null,
	id_usuario int not null,
	primary key (id_post),
	foreign key(id_categoria) references categoria(id_categoria),
	foreign key(id_usuario) references usuario(id_usuario)
);

CREATE TABLE sesion (
    id_sesion int not null auto_increment,
    marca_tiempo_sesion timestamp default current_timestamp,
    id_usuario int not null,
    primary key(id_sesion),
    foreign key (id_usuario) references usuario(id_sesion)
);
