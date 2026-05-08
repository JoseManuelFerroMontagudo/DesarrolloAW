import { Router } from "express";
import { Movie }        from "../models/Movie.js";
import { MovieManager } from "../models/MovieManager.js";
import path from "path";
import { fileURLToPath } from "url";

// Resolver __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const router  = Router();
const manager = new MovieManager(path.join(__dirname, "../data/movies.json"));

// ── GET /movies — Obtener todas las películas ──────────────────────────────
router.get("/", async (req, res) => {
  try {
    const movies = await manager.getMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
});

// ── POST /movies — Agregar una película nueva ──────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { title, genre, director, year, score, watched } = req.body;

    // Generar ID único basado en timestamp
    const id = Date.now();

    const movie = new Movie(
      id,
      title,
      genre,
      director,
      Number(year),
      Number(score) || 0,
      watched === true || watched === "true"
    );

    await manager.addMovie(movie);
    res.status(201).json({ message: "Película agregada", movie });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar película" });
  }
});

// ── DELETE /movies/:id — Eliminar una película por ID ─────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const remaining = await manager.deleteMovie(id);
    res.json({ message: "Película eliminada", remaining });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar película" });
  }
});

// ── PATCH /movies/:id — Actualizar campos de una película ─────────────────
router.patch("/:id", async (req, res) => {
  try {
    const id      = Number(req.params.id);
    const updated = await manager.updateMovie(id, req.body);
    if (!updated) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película actualizada", movie: updated });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar película" });
  }
});

export default router;
