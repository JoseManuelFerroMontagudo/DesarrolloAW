import { Pregunta } from "../clases/Pregunta.js";

// ─── Servicio API ─────────────────────────────────────────────────────────────
// Simula una llamada a una API REST usando fetch() sobre el archivo JSON local.
// Usa async/await para manejar la asincronía de manera legible.

export async function obtenerPreguntas() {
  const response = await fetch("data/preguntas.json");

  if (!response.ok) {
    throw new Error(`Error al cargar preguntas: ${response.status}`);
  }

  const datos = await response.json();

  // Convierte cada objeto plano del JSON en una instancia de la clase Pregunta
  return datos.map(
    (d) => new Pregunta(d.pregunta, d.opciones, d.respuestaCorrecta)
  );
}
