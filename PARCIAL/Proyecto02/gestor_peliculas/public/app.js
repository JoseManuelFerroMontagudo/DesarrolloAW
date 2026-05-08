// ─── Referencias al DOM ───────────────────────────────────────────────────────
const form           = document.getElementById("movieForm");
const container      = document.getElementById("moviesContainer");
const movieCountSpan = document.getElementById("movieCount");

// ─── CARGAR: obtener y renderizar todas las películas ─────────────────────────
async function loadMovies() {
  try {
    const response = await fetch("/movies");
    const movies   = await response.json();

    renderMovies(movies);
  } catch (error) {
    console.error("Error al cargar películas:", error);
    container.innerHTML = `<p class="empty-state">Error al conectar con el servidor.</p>`;
  }
}

// ─── RENDERIZAR: construir las cards en el DOM ────────────────────────────────
function renderMovies(movies) {
  movieCountSpan.textContent = `${movies.length} película${movies.length !== 1 ? "s" : ""}`;

  if (movies.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🎬</div>
        <p>No hay películas en el catálogo.<br>¡Agrega la primera!</p>
      </div>`;
    return;
  }

  container.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const watchedBadge = movie.watched
      ? `<span class="badge badge-watched">✓ Vista</span>`
      : `<span class="badge badge-unwatched">No vista</span>`;

    card.innerHTML = `
      <div class="movie-card-header">
        <h3 class="movie-title">${movie.title}</h3>
        ${watchedBadge}
      </div>
      <div class="movie-meta">
        <p><strong>Género:</strong> ${movie.genre}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Año:</strong> ${movie.year}</p>
      </div>
      <div class="movie-score">
        ${movie.score || "—"} <span>/ 10</span>
      </div>
      <button class="delete-btn" data-id="${movie.id}">🗑️ Eliminar</button>
    `;

    container.appendChild(card);
  });

  // Asignar eventos de eliminación a los botones recién creados
  addDeleteEvents();
}

// ─── ELIMINAR: enviar DELETE a la API y recargar ──────────────────────────────
function addDeleteEvents() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      try {
        const res = await fetch(`/movies/${id}`, { method: "DELETE" });
        if (res.ok) {
          showToast("Película eliminada ✓");
          await loadMovies();
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    });
  });
}

// ─── AGREGAR: enviar POST a la API con los datos del formulario ───────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movie = {
    title:    document.getElementById("title").value.trim(),
    genre:    document.getElementById("genre").value.trim(),
    director: document.getElementById("director").value.trim(),
    year:     document.getElementById("year").value,
    score:    document.getElementById("score").value,
    watched:  document.getElementById("watched").checked,
  };

  try {
    const res = await fetch("/movies", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(movie),
    });

    if (res.ok) {
      form.reset();
      showToast("Película agregada ✓");
      await loadMovies();
    }
  } catch (error) {
    console.error("Error al agregar:", error);
  }
});

// ─── TOAST: notificación temporal ────────────────────────────────────────────
function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ─── INICIO: cargar películas al abrir la página ──────────────────────────────
loadMovies();
