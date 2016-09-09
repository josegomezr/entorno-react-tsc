<?php
// Routes

$app->group('', function(){
    $this->get('/', function ($request, $response, $args) {
        $base_url = $request->getUri()->getBasePath();
        
        if (strpos($base_url, 'index.php') !== FALSE) {
            $base_url = dirname($base_url); 
        }

        $args['_BASE'] = $base_url;

        $this->renderer->render($response, 'index.phtml', $args);
    });
});

$app->group('/api', function(){

    $this->get('/categorias/listar[/]', function($request, $response, $args){
      $sql = "SELECT * FROM categoria";
      $result = $this->db->query($sql);
          $filas = $result->fetchAll();
          return $response->withJson($filas);
    });

    $this->get('/usuarios/listar[/]', function($request, $response, $args){
      $sql = "SELECT id_usuario, nombre_usuario, apellido_usuario FROM usuario";
      $result = $this->db->query($sql);
          $filas = $result->fetchAll();
          return $response->withJson($filas);
    });

    $this->get('/listar[/]', function ($request, $response, $args) {
        $sql = "SELECT * FROM post
        LEFT JOIN categoria USING (id_categoria)
        LEFT JOIN usuario USING (id_usuario);";
        $result = $this->db->query($sql);
        $filas = $result->fetchAll();
        $respuesta = array();
        foreach ($filas as $fila) {
            $nuevo = array(
                'id_post' => $fila['id_post'],
                'titulo_post' => $fila['titulo_post'],
                'contenido_post' => $fila['contenido_post'],
                'categoria' => array(
                    'id_categoria' => $fila['id_categoria'],
                    'nombre_categoria' => $fila['nombre_categoria'],
                ),
                'usuario' => array(
                    'id_usuario' => $fila['id_usuario'],
                    'nombre_usuario' => $fila['nombre_usuario'],
                    'apellido_usuario' => $fila['apellido_usuario'],
                )
            );  
            $respuesta[] = $nuevo;
        }
        $total = count($filas);
        $this->logger->info("Listando todas las noticias ({$total} filas)");
        return $response->withJson($respuesta);
    }); // fin de '/listar'

    $this->get('/leer/{id_post}[/]', function ($request, $response, $args) {
        $sql = "SELECT * FROM post
        LEFT JOIN categoria USING (id_categoria)
        LEFT JOIN usuario USING (id_usuario)
        WHERE id_post = ?";
        $result =$this->db->prepare($sql);
        $result->execute([ $args['id_post'] ]);
        $fila = $result->fetch();

        $code = 200;
        if (!$fila) {
            $this->logger->info("Noticia#{$args['id_post']} NO encontrada");
            $code = 400;
        }else{
            $this->logger->info("Noticia#{$args['id_post']} encontrada");
        }

        $respuesta = array(
            'id_post' => $fila['id_post'],
            'titulo_post' => $fila['titulo_post'],
            'contenido_post' => $fila['contenido_post'],
            'categoria' => array(
                'id_categoria' => $fila['id_categoria'],
                'nombre_categoria' => $fila['nombre_categoria'],
            ),
            'usuario' => array(
                'id_usuario' => $fila['id_usuario'],
                'nombre_usuario' => $fila['nombre_usuario'],
                'apellido_usuario' => $fila['apellido_usuario'],
            )
        );  
        return $response->withJson($respuesta, $code);
    }); // fin '/leer/{id_post}/'

    $this->get('/validar-token/{token}[/]', function($request, $response, $args){
      $sql = "SELECT * FROM sesion WHERE id_sesion = ?
        AND TIMESTAMPDIFF(HOUR, marca_tiempo_sesion, NOW()) < 1";
      $resultado = $this->db->prepare($sql);
      $resultado->execute( [$args['token']] );
      if ($resultado->rowCount() == 0) {
        $respuesta = array('error' => 'expired-token');
        return $response->withJson($respuesta, 400);
      }

      return $response->withJson(true, 204);
    });

    $this->post('/autenticar[/]', function($request, $response, $args){

        $post = $request->getParsedBody();

        if (! ($post['usuario'] && $post['clave']) ) {
            $this->logger->info('Autenticacion Fallida - no hay datos');
            $respuesta = [
                'error' => 'credenciales-vacia'
            ];
            return $response->withJson($respuesta, 400);
        }

        $sql = "SELECT * FROM usuario
        WHERE nombre_usuario = ? and clave_usuario = SHA1(?)";

        $resultado = $this->db->prepare($sql);
        $sqlArgs = [ $post['usuario'], $post['clave'] ];
        $resultado->execute($sqlArgs);

        $fila = $resultado->fetch();

        if(!$fila){
            $mensaje = sprintf('Autenticacion de (%s) - no hay datos', 
                implode(':', $sqlArgs));
            $this->logger->info($mensaje);
            $respuesta = [
                'error' => 'malas-credenciales'
            ];
            return $response->withJson($respuesta, 400);
        }

        $sql = "INSERT INTO sesion (id_usuario) VALUES (?)";
        $resultado = $this->db->prepare($sql);
        $resultado->execute([ $fila['id_usuario'] ]);

        $id_sesion = $this->db->lastInsertId();

        $respuesta = [
            'id_sesion' => $id_sesion,
            'usuario' => [
                'id_usuario' => $fila['id_usuario'],
                'nombre_usuario' => $fila['nombre_usuario'],
                'apellido_usuario' => $fila['apellido_usuario']
            ]
        ];
        return $response->withJson($respuesta);
    }); // fin '/autenticar/'

    $this->get('/admin/eliminar/{id_post}[/]', 
      function($request, $response, $args){

      $sql = "DELETE FROM post WHERE id_post = ?";
      $resultado = $this->db->prepare($sql);
      $resultado->execute([ $args['id_post'] ]);

      if ($resultado->rowCount() == 0) {
        $respuesta = [
          'error' => 'no-encontrado'
        ];
        return $response->withJson($response, 400);
      }

      return $response->withJson(true, 204);
    });

    $this->post('/admin/crear[/]', function($request, $response, $args){
      $campos = array('usuario', 'titulo', 'contenido', 'categoria');
      $post = $request->getParsedBody();

      $valid = true;
      foreach ($campos as $campo) {
        $valid = $valid && !!$post[$campo];
      }

      if(!$valid){
        $respuesta = array(
          'error' => 'validation'
        );
        return $response->withJson($respuesta, 400);
      }
      $sql = "
      INSERT INTO post (id_usuario, id_categoria, titulo_post, contenido_post) 
      VALUES (:usuario, :categoria, :titulo, :contenido);";
      $resultado = $this->db->prepare($sql);
      $sqlArgs = array_intersect_key($post, array_flip($campos));
      $resultado->execute($sqlArgs);
      if ($resultado->rowCount() == 0) {
        $respuesta = array(
          'error' => 'sql'
        );
        return $response->withJson($respuesta, 400);
      }

      return $response->withJson(true, 204);
    });

    $this->post('/admin/editar/{id_post}[/]', function($request, $response, $args){
      $campos = array('usuario', 'titulo', 'contenido', 'categoria');
      $post = $request->getParsedBody();

      $valid = true;
      foreach ($campos as $campo) {
        $valid = $valid && !!$post[$campo];
      }

      if(!$valid){
        $respuesta = array(
          'error' => 'validation'
        );
        return $response->withJson($respuesta, 400);
      }

      $sql = "UPDATE post SET
          id_usuario = :usuario,
          titulo_post = :titulo,
          contenido_post = :contenido
          id_categoria = :categoria
        WHERE id_post = :id_post";
      $resultado = $this->db->prepare($sql);

      $sqlArgs = array_intersect_key($post, array_flip($campos));
      $sqlArgs['id_post'] = $args['id_post'];

      $resultado->execute($sqlArgs);

      return $response->withJson(true, 204);
    });
}); //fin group '/api'