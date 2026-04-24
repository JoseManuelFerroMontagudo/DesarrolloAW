import { Producto, Pedido, PedidoConDescuento, PedidoExpress } from "./pedidos.js";

let productos = [];
const listaHTML = document.getElementById("lista");
const totalHTML = document.getElementById("total");

// Agregar producto
document.getElementById("add").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const precio = Number(document.getElementById("precio").value);

    try {
        const producto = new Producto(nombre, precio);
        productos.push(producto);
        render();
        // Limpiar inputs
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
    } catch (e) {
        alert(e.message);
    }
});

// Calcular total
document.getElementById("calcular").addEventListener("click", () => {
    const tipo = document.getElementById("tipo").value;
    let pedido;

    if (tipo === "normal") {
        pedido = new Pedido();
    } else if (tipo === "descuento") {
        pedido = new PedidoConDescuento(0.1);
    } else if (tipo === "express") {
        pedido = new PedidoExpress(50);
    }

    // Agregar todos los productos al pedido seleccionado
    productos.forEach(p => pedido.agregarProducto(p));
    totalHTML.textContent = "Total: " + pedido.calcularTotal();
});

// Renderizar lista en pantalla
function render() {
    listaHTML.innerHTML = "";
    productos.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} - $${p.getPrecio()}`;
        listaHTML.appendChild(li);
    });
}