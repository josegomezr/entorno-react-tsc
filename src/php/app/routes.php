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

        $sql = "SELECT * FROM post";
        $result = $this->db->query($sql);
        $filas = $result->fetchAll();
        $total = count($filas);
        $this->logger->info("Listando todas las noticias ({$total} filas)");

        return $response->withJson($filas);
    });

    $this->get('/leer/{id_post}[/]', function ($request, $response, $args) {
        $sql = "SELECT * FROM post WHERE id_post = ?";
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
        return $response->withJson($fila, $code);
    });
});