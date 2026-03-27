const express = require( 'express');
const app = express ();
const PORT = 3000;
 // RUTA DEL TENTEMPIE
 app.get ('/' , (req, res) => {
    res.send('Hola Mundo con express');

 });
 
 
 //Iniciar servidor
 app.listen(PORT, () => {
    console.log ('Servidor en http://localhost:${PORT}');

 });

 