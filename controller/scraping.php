<?php
// Definimos la función cURL
    function curl($url) {
      $ch = curl_init($url); // Inicia sesión cURL
      // Configura cURL para devolver el resultado como cadena
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      // Configura cURL para que no verifique el peer del certificado dado que nuestra URL utiliza el protocolo HTTPS
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
      $info = curl_exec($ch); // Establece una sesión cURL y asigna la información a la variable $info
      curl_close($ch); // Cierra sesión cURL
      return $info; // Devuelve la información de la función
    }

    // Ejecuta la función curl escrapeando el sitio web https://devcode.la and regresa el valor a la variable $sitioweb
    $sitioweb = curl('https://wsp.registraduria.gov.co/censo/_censoResultado.php?nCedula='.$_GET['nCedula']);
    echo $sitioweb;