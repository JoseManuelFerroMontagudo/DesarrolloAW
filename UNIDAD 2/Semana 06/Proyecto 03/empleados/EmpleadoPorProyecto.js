import { Empleado } from "./Empleado.js";

export class EmpleadoPorProyecto extends Empleado {
    constructor(nombre, salario, pagoExtra) {
        super(nombre, salario);
        this.pagoExtra = pagoExtra;
    }
    calcularSalario() {
        return this.salario + this.pagoExtra;
    }
}
