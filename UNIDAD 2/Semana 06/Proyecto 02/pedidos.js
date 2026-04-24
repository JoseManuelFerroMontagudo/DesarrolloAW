export class Producto {
    #precio; // Propiedad privada

    constructor(nombre, precio) {
        this.nombre = nombre;
        this.setPrecio(precio);
    }

    setPrecio(precio) {
        if (precio < 0) {
            throw new Error("El precio no puede ser negativo");
        }
        this.#precio = precio;
    }

    getPrecio() {
        return this.#precio;
    }
}

export class Pedido {
    constructor() {
        this.productos = [];
    }
    agregarProducto(producto) {
        this.productos.push(producto);
    }
    calcularTotal() {
        return this.productos.reduce((total, p) => total + p.getPrecio(), 0);
    }
}

export class PedidoConDescuento extends Pedido {
    constructor(descuento) {
        super();
        this.descuento = descuento; // porcentaje (ej: 0.1 para 10%)
    }
    calcularTotal() {
        const total = super.calcularTotal();
        return total - (total * this.descuento);
    }
}

export class PedidoExpress extends Pedido {
    constructor(costoEnvio) {
        super();
        this.costoEnvio = costoEnvio;
    }
    calcularTotal() {
        return super.calcularTotal() + this.costoEnvio;
    }
}
