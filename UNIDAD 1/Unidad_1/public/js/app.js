// app.js — Lógica del frontend

const btnCargar = document.getElementById('btn-cargar');
const listaProductos = document.getElementById('lista-productos');
const mensajeEstado = document.getElementById('mensaje-estado');

btnCargar.addEventListener('click', async () => {
  // Mostrar estado de carga
  mensajeEstado.classList.remove('d-none');
  mensajeEstado.textContent = 'Cargando productos...';
  listaProductos.innerHTML = '';
  btnCargar.disabled = true;

  try {
    // Petición al backend
    const response = await axios.get('/api/productos');
    const productos = response.data.productos;

    mensajeEstado.classList.add('d-none');

    if (productos.length === 0) {
      listaProductos.innerHTML =
        '<p class="text-center text-muted">No se encontraron productos.</p>';
      return;
    }

    // Renderizar productos dinámicamente
    productos.forEach((producto) => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4 col-lg-3';

      col.innerHTML = `
        <div class="card h-100 shadow-sm product-card">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title product-name">${producto.nombre}</h5>
            <div class="mt-auto pt-3">
              <span class="badge bg-success fs-6">$${producto.precio.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;

      listaProductos.appendChild(col);
    });
  } catch (error) {
    mensajeEstado.classList.remove('d-none');
    mensajeEstado.className = 'alert alert-danger';
    mensajeEstado.textContent =
      'Ocurrió un error al cargar los productos. Intenta de nuevo.';
    console.error(error);
  } finally {
    btnCargar.disabled = false;
  }
});
