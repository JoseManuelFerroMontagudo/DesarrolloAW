const express = require("express");
const path = require("path");
const { sumar, restar, multiplicar, dividir } = require("./calculos");

const app = express();
const PORT = 3000;

// Permitir JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// API: suma
app.post("/sumar", (req, res) => {
    const { a, b } = req.body;
    const resultado = sumar(a, b);
    res.json({ resultado });
});

// API: resta
app.post("/restar", (req, res) => {
    const { a, b } = req.body;
    const resultado = restar(a, b);
    res.json({ resultado });
});

// API: multiplicación
app.post("/multiplicar", (req, res) => {
    const { a, b } = req.body;
    const resultado = multiplicar(a, b);
    res.json({ resultado });
});

// API: división
app.post("/dividir", (req, res) => {
    const { a, b } = req.body;
    try {
        const resultado = dividir(a, b);
        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log("Servidor en http://localhost:3000");
});