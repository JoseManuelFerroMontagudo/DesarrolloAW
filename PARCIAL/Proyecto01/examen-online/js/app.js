import { Estudiante }     from "./clases/Estudiante.js";
import { Examen }         from "./clases/Examen.js";
import { obtenerPreguntas } from "./servicios/api.js";

// ─── Referencias al DOM ───────────────────────────────────────────────────────
const divLogin    = document.getElementById("login");
const divExamen   = document.getElementById("examen");
const divResultado = document.getElementById("resultado");

const inputNombre  = document.getElementById("nombre");
const inputCurso   = document.getElementById("curso");
const btnIniciar   = document.getElementById("btnIniciar");

const h2Pregunta   = document.getElementById("pregunta");
const divOpciones  = document.getElementById("opciones");
const btnSiguiente = document.getElementById("btnSiguiente");

// Variable que almacenará la instancia de Examen durante toda la sesión
let examen = null;

// ─── Iniciar examen ───────────────────────────────────────────────────────────
btnIniciar.addEventListener("click", async () => {
  const nombre = inputNombre.value.trim();
  const curso  = inputCurso.value.trim();

  if (!nombre || !curso) {
    alert("Por favor ingresa tu nombre y curso.");
    return;
  }

  try {
    // Carga las preguntas de forma asíncrona desde el JSON
    const preguntas  = await obtenerPreguntas();
    const estudiante = new Estudiante(nombre, curso);
    examen = new Examen(estudiante, preguntas);

    // Ocultar login y mostrar examen
    divLogin.classList.add("hidden");
    divExamen.classList.remove("hidden");

    mostrarPregunta();
  } catch (error) {
    console.error("Error al iniciar el examen:", error);
    alert("No se pudieron cargar las preguntas. Revisa la consola.");
  }
});

// ─── Mostrar pregunta actual ──────────────────────────────────────────────────
function mostrarPregunta() {
  const p = examen.preguntaActual();

  // Número de pregunta + texto
  h2Pregunta.textContent =
    `Pregunta ${examen.index + 1} de ${examen.preguntas.length}: ${p.texto}`;

  // Limpiar opciones anteriores y generar botones nuevos
  divOpciones.innerHTML = "";

  p.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.classList.add("opcion-btn");
    btn.dataset.indice = i;

    // Evento: seleccionar respuesta
    btn.addEventListener("click", () => seleccionarOpcion(btn, i));
    divOpciones.appendChild(btn);
  });

  // Resetear estilos del botón Siguiente
  btnSiguiente.disabled = true;
  btnSiguiente.classList.remove("activo");
}

// ─── Seleccionar opción ───────────────────────────────────────────────────────
function seleccionarOpcion(btnSeleccionado, indice) {
  // Quitar selección previa
  document.querySelectorAll(".opcion-btn").forEach((b) =>
    b.classList.remove("seleccionado")
  );

  btnSeleccionado.classList.add("seleccionado");
  examen.responder(indice);

  // Habilitar el botón Siguiente
  btnSiguiente.disabled = false;
  btnSiguiente.classList.add("activo");
}

// ─── Avanzar a la siguiente pregunta ─────────────────────────────────────────
btnSiguiente.addEventListener("click", () => {
  examen.verificar();  // Verifica y suma punto si es correcta
  examen.siguiente();  // Avanza al índice siguiente

  if (examen.terminado()) {
    mostrarResultado();
  } else {
    mostrarPregunta();
  }
});

// ─── Mostrar resultado final ──────────────────────────────────────────────────
function mostrarResultado() {
  divExamen.classList.add("hidden");
  divResultado.classList.remove("hidden");

  const { nombre, curso, puntaje } = examen.estudiante;
  const total = examen.preguntas.length * 2; // 2 puntos por pregunta
  const porcentaje = Math.round((puntaje / total) * 100);

  let mensaje = "😐 Sigue practicando";
  if (porcentaje >= 90) mensaje = "🏆 Excelente resultado!";
  else if (porcentaje >= 70) mensaje = "👍 Buen trabajo!";
  else if (porcentaje >= 50) mensaje = "📚 Puedes mejorar";

  divResultado.innerHTML = `
    <div class="resultado-card">
      <h2>Resultado Final</h2>
      <p class="alumno-info">👤 <strong>${nombre}</strong> — ${curso}</p>
      <div class="puntaje-circulo">
        <span class="puntaje-num">${puntaje}</span>
        <span class="puntaje-total">/ ${total}</span>
      </div>
      <p class="porcentaje">${porcentaje}%</p>
      <p class="mensaje-resultado">${mensaje}</p>
      <button id="btnReiniciar" class="btn-reiniciar">Volver a intentar</button>
    </div>
  `;

  document.getElementById("btnReiniciar").addEventListener("click", () => {
    location.reload();
  });
}
