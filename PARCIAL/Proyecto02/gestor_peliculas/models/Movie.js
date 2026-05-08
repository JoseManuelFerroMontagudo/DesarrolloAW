// ─── Clase Movie ──────────────────────────────────────────────────────────────
// Representa una película del catálogo con todos sus atributos.

export class Movie {
  constructor(id, title, genre, director, year, score = 0, watched = false) {
    this.id       = id;       // Identificador único (número)
    this.title    = title;    // Título de la película
    this.genre    = genre;    // Género (ej: "Drama", "Ciencia ficción")
    this.director = director; // Nombre del director
    this.year     = year;     // Año de estreno (número)
    this.score    = score;    // Puntaje/calificación (0-10)
    this.watched  = watched;  // Estado: true = vista, false = no vista
  }
}
