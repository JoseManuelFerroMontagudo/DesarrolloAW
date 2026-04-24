export class Contador {
    constructor() {
        this.valor = 0;
    }
    incrementar() {
        this.valor++;
    }
    disminuir() {
        this.valor--;
    }
    resetear() {
        this.valor = 0;
    }
    obtenerValor() {
        return this.valor;
    }
}