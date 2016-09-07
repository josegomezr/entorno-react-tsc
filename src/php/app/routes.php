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
        return $response->withJson([array(
            'id' => 1,
            'titulo' => 'Noticia No. 1',
            'detalle' => 'daisddaisdsadas jo53245 daisddaisdsadas jo53245 daidsadas jo53245dhasdsadas jo53245 daidsadas jo53245dhasddaidsadas jo53245dhasdsadas jo53245 daidsadas jo53245dhasd'
        ), array(
            'id' => 2,
            'titulo' => 'Noticia No. 2',
            'detalle' => '245adaisdsadas jo53245 daidsadas jo53245dhadsadadaisdsadas jo53245 daidsadas jo53245dhasds jo53245adaisdsadas jo53245 daidsadas jo53245dhasds jo5'
        )]);
    });

    $this->get('/leer/{id_post}[/]', function ($request, $response, $args) {
        return $response->withJson(array(
            'id' => time(),
            'titulo' => 'Noticia No. ' . time(),
            'detalle' => 'daisddaisdsadas jo53245 daisddaisdsadas jo53245 daidsadas jo53245dhasdsadas jo53245 daidsadas jo53245dhasddaidsadas jo53245dhasdsadas jo53245 daidsadas jo53245dhasd'
        ));
    });
});