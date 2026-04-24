import { Producto, Pedido, PedidoConDescuento, PedidoExpress } from "./pedidos.js";

function mostrarTotales(pedidos) {
    pedidos.forEach((p, i) => {
        console.log(`Pedido ${i + 1}: ${p.calcularTotal()}`);
    });
}

try {
    const p1 = new Producto("Laptop", 3000);
    const p2 = new Producto("Mouse", 100);
    const p3 = new Producto("Teclado", 200);

    const pedido1 = new Pedido();
    pedido1.agregarProducto(p1);
    pedido1.agregarProducto(p2);

    const pedido2 = new PedidoConDescuento(0.1);
    pedido2.agregarProducto(p1);
    pedido2.agregarProducto(p3);

    const pedido3 = new PedidoExpress(50);
    pedido3.agregarProducto(p2);
    pedido3.agregarProducto(p3);

    const lista = [pedido1, pedido2, pedido3];
    mostrarTotales(lista);
} catch (error) {
    console.error("Error:", error.message);
}