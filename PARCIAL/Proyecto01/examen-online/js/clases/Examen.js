// Examen.js recibe instancias ya creadas; no necesita importar las otras clases.
// (Estudiante y Pregunta son instanciados en app.js y api.js respectivamente)

// ─── Clase Examen ─────────────────────────────────────────────────────────────
// Contiene toda la lógica del examen:
//   - navegar entre preguntas
//   - registrar respuestas
//   - verificar si son correctas
//   - calcular y mostrar el resultado final

export class Examen {
  constructor(estudiante, preguntas) {
    this.estudiante          = estudiante; // Instancia de Estudiante
    this.preguntas           = preguntas;  // Array de instancias de Pregunta
    this.index               = 0;          // Índice de la pregunta actual
    this.respuestaSeleccionada = null;     // Índice de la opción elegida
  }

  // Devuelve la pregunta en el índice actual
  preguntaActual() {
    return this.preguntas[this.index];
  }

  // Registra la opción seleccionada por el estudiante
  responder(indice) {
    this.respuestaSeleccionada = indice;
  }

  // Verifica si la respuesta almacenada es correcta y suma puntaje
  verificar() {
    if (this.respuestaSeleccionada === null) return false;
    const correcta = this.preguntaActual().esCorrecta(this.respuestaSeleccionada);
    if (correcta) this.estudiante.sumarPunto();
    return correcta;
  }

  // Avanza al siguiente índice y resetea la selección
  siguiente() {
    this.index++;
    this.respuestaSeleccionada = null;
  }

  // Indica si ya no quedan más preguntas
  terminado() {
    return this.index >= this.preguntas.length;
  }
}
