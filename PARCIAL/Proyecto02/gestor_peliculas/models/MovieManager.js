import fs from "fs/promises";

// ─── Clase MovieManager ───────────────────────────────────────────────────────
// Gestiona el almacenamiento y todas las operaciones CRUD sobre el archivo JSON.
// Todas sus operaciones son asíncronas (async/await + fs/promises).

export class MovieManager {
  constructor(path) {
    this.path = path; // Ruta al archivo movies.json
  }

  // ── Listar: obtener todas las películas desde el JSON ──────────────────────
  async getMovies() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o está vacío, retorna array vacío
      return [];
    }
  }

  // ── Persistir: sobreescribir el JSON con el array actualizado ──────────────
  async saveMovies(movies) {
    await fs.writeFile(
      this.path,
      JSON.stringify(movies, null, 2), // formato indentado para legibilidad
      "utf-8"
    );
  }

  // ── Agregar: añadir una nueva película al catálogo ─────────────────────────
  async addMovie(movie) {
    const movies = await this.getMovies();
    movies.push(movie);
    await this.saveMovies(movies);
  }

  // ── Eliminar: filtrar por id y guardar el resultado ────────────────────────
  async deleteMovie(id) {
    const movies  = await this.getMovies();
    const filtered = movies.filter((m) => m.id !== id);
    await this.saveMovies(filtered);
    return filtered;
  }

  // ── Buscar: encontrar una película por su id ───────────────────────────────
  async findById(id) {
    const movies = await this.getMovies();
    return movies.find((m) => m.id === id) || null;
  }

  // ── Actualizar: modificar campos de una película existente ─────────────────
  async updateMovie(id, fields) {
    const movies = await this.getMovies();
    const index  = movies.findIndex((m) => m.id === id);
    if (index === -1) return null;
    movies[index] = { ...movies[index], ...fields };
    await this.saveMovies(movies);
    return movies[index];
  }
}
