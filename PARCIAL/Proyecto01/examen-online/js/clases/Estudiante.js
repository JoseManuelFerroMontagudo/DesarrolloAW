// ─── Clase Estudiante ─────────────────────────────────────────────────────────
// Representa al alumno que rinde el examen.
// Almacena su nombre, curso y puntaje acumulado.

export class Estudiante {
  constructor(nombre, curso) {
    this.nombre = nombre;
    this.curso  = curso;
    this.puntaje = 0;
  }

  // Incrementa el puntaje en 2 puntos por cada respuesta correcta
  sumarPunto() {
    this.puntaje += 2;
  }
}
