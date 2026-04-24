import { EmpleadoFijo } from "./empleados/EmpleadoFijo.js";
import { EmpleadoPorProyecto } from "./empleados/EmpleadoPorProyecto.js";
import { NominaService } from "./services/NominaService.js";



function mostrarSalarios(empleados) {
    empleados.forEach(emp => {
        console.log(`Empleado: ${emp.nombre}, Salario: ${emp.calcularSalario()}`);
    })
}


const emp1 = new EmpleadoFijo("Ana", 3000);
const emp2 = new EmpleadoPorProyecto("Luis", 2000, 800);

const lista = [emp1, emp2];
mostrarSalarios(lista);

//usamos Nomina Service
const nomina = new NominaService();
nomina.mostrarSalarios(lista);

console.log("Total del Salario", nomina.calcularTotal(lista));