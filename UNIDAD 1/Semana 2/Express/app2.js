const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hola Mundo con Express');
});

// agregar rutas [cite: 324]
app.get('/saludo', (req, res) => { 
  res.send('Hola desde ruta saludo'); 
}); 

app.get('/usuario', (req, res) => { 
  res.json({ 
    nombre: 'Juan', 
    edad: 25 
  }); 
});

app.listen(PORT, () => {
  console.log('Servidor en http://localhost:${PORT}');
});
