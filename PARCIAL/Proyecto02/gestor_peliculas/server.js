import express from "express";
import path    from "path";
import { fileURLToPath } from "url";
import moviesRouter from "./routes/movies.routes.js";

// ─── Configuración de __dirname para ES Modules ────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ─── Instancia de la aplicación Express ───────────────────────────────────
const app  = express();
const PORT = 3000;

// ─── Middlewares ───────────────────────────────────────────────────────────
app.use(express.json());                            // Parsear JSON en el body
app.use(express.static(path.join(__dirname, "public"))); // Servir archivos estáticos

// ─── Rutas de la API ───────────────────────────────────────────────────────
app.use("/movies", moviesRouter);

// ─── Iniciar servidor ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
