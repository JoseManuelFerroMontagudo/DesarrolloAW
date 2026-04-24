export class Empleado {
    constructor(nombre, salario) {
        this.nombre = nombre;
        this.salario = salario;
    }
    calcularSalario() {
        return this.salario;
    }
}