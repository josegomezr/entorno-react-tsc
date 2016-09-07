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
    });

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
    });
});