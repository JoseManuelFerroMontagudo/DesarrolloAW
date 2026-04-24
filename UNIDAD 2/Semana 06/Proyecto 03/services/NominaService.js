export class NominaService {
    mostrarSalarios(empleados) {
        empleados.forEach(emp => {
            console.log(`${emp.nombre}: ${emp.calcularSalario()}`);
        });
    }
    calcularTotal(empleados) {
        return empleados.reduce((total, emp) => total + emp.calcularSalario(), 0);
    }
}