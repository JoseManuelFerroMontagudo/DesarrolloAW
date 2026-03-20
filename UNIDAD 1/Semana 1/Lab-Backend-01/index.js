const express = require('express');
const app = express();
const puerto = 3000; 

app.get('/', (req, res) => {
  res.send('Hola Mundo (el backend funciona xd)');
});

app.listen(puerto, () => {
  console.log(`Servidor backend encendido. Escuchando en http://localhost:${puerto}`);
});


// Definimos la función
function sumar(numero1, numero2) {
  return numero1 + numero2;
}

const resultadoSuma = sumar(5, 7);

console.log("El resultado de la suma es:", resultadoSuma);

// Definimos la función
function esPar(numero) {
  if (numero % 2 === 0) {
    return true;
  } else {
    return false;
  }
}


console.log("¿El número 4 es par?", esPar(4)); 
console.log("¿El número 7 es par?", esPar(7)); 