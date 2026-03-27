const express = require('express'); 
const app = express(); 
const PORT = 3000; 

// Permite que el servidor lea datos enviados en formato JSON [cite: 352]
app.use(express.json()); 

// Permite mostrar el archivo index.html [cite: 353]
app.use(express.static('public')); 

// Ruta POST para recibir datos [cite: 355]
app.post('/datos', (req, res) => { 
  const datos = req.body; 
console.log(`Hola soy ${datos.nombre} tengo ${datos.edad}`);  
  res.json({ 
    mensaje: 'Datos recibidos correctamente', 
    datos: datos 
  }); 
}); 

// Iniciar servidor [cite: 361]
app.listen(PORT, () => { 
  console.log(`Servidor corriendo en http://localhost:${PORT}`); 
}); 