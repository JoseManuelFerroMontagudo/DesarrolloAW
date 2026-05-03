const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API route: fetch products from external API
app.get('/api/productos', async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/pr<oducts');
    const productos = response.data.products.map((p) => ({
      id: p.id,
      nombre: p.title,
      precio: p.price,
    }));
    res.json({ productos });
  } catch (error) {
    console.error('Error al consultar la API externa:', error.message);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
