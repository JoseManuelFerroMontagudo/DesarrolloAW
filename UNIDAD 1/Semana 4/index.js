const express = require("express");
const axios = require("axios");
const app = express();

// Servir archivos estáticos desde la carpeta "public" [cite: 53]
app.use(express.static("public"));

// Ruta API para obtener usuarios [cite: 54, 55]
app.get("/api/usuarios", async (req, res) => {
    try {
        // Petición GET a JSONPlaceholder [cite: 57]
        const respuesta = await axios.get("https://jsonplaceholder.typicode.com/users");
        res.json(respuesta.data); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" }); 
    }
});

// Iniciar servidor en el puerto 3000 [cite: 62, 64]
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});