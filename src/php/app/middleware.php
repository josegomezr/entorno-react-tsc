<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

function forzar_autenticado ($nombre_inicio) {
  return function ($request, $response, $next) use($nombre_inicio) {
    $session = new \SlimSession\Helper;
    $key = $session->get('logId');
    if ($key) {
        $response = $next($request, $response);
        return $response;
    }else{
      $ruta = Aplicacion::getInstance()->pathFor($nombre_inicio);
      return $response->withStatus(302)->withHeader('Location', $ruta);
    }
  };
};
