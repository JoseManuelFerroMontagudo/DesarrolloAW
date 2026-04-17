const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Permitir JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// API: suma
app.post("/sumar", (req, res) => {
    const { a, b } = req.body;
    const resultado = Number(a) + Number(b);
    res.json({ resultado });
});

app.listen(PORT, () => {
    console.log("Servidor en http://localhost:3000");
});