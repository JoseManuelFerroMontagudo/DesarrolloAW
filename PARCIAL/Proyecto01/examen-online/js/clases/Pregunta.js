// ─── Clase Pregunta ───────────────────────────────────────────────────────────
// Modela cada pregunta del examen con su texto, opciones y la respuesta correcta.

export class Pregunta {
  constructor(texto, opciones, respuestaCorrecta) {
    this.texto            = texto;
    this.opciones         = opciones;       // Array de strings con las opciones
    this.respuestaCorrecta = respuestaCorrecta; // Índice (0-based) de la opción correcta
  }

  // Verifica si el índice dado corresponde a la respuesta correcta
  esCorrecta(indice) {
    return indice === this.respuestaCorrecta;
  }
}
