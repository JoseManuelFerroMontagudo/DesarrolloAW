const express = require("express");
const axios = require("axios");
const app = express();

// Servir archivos estáticos desde la carpeta "public" 
app.use(express.static("public"));

// Ruta API para obtener usuarios 
app.get("/api/usuarios", async (req, res) => {
    try {
        // Petición GET a JSONPlaceholder 
        const respuesta = await axios.get("https://jsonplaceholder.typicode.com/users");
        res.json(respuesta.data); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" }); 
    }
});

// Iniciar servidor en el puerto 3000 
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});