import { Empleado } from "./Empleado.js";
export class EmpleadoFijo extends Empleado {
    constructor(nombre, salario) {
        super(nombre, salario);
    }
    calcularSalario() {
        return this.salario;
    }
}
