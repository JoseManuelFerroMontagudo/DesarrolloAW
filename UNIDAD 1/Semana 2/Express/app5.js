const express = require('express');
const app = express();
const PORT = 3000;

// Permite leer JSON y archivos estáticos
app.use(express.json());
app.use(express.static('public'));

// Nueva ruta POST específica para sumar
app.post('/sumar', (req, res) => {
  // Extraemos los números del cuerpo de la petición
  const numero1 = req.body.numero1;
  const numero2 = req.body.numero2;
  
  // Realizamos la suma (usamos Number() por si llegan como texto)
  const resultadoSuma = Number(numero1) + Number(numero2);
  
  console.log(`Se solicitó una suma: ${numero1} + ${numero2} = ${resultadoSuma}`);
  
  // Enviamos el resultado de vuelta al navegador
  res.json({
    mensaje: 'Suma calculada con éxito',
    resultado: resultadoSuma
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor de suma corriendo en http://localhost:${PORT}`);
});