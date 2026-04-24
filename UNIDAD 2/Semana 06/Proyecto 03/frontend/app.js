import { EmpleadoFijo } from "../empleados/EmpleadoFijo.js";
import { EmpleadoPorProyecto } from "../empleados/EmpleadoPorProyecto.js";
import { NominaService } from "../services/NominaService.js";

const empleados = [];
const nominaService = new NominaService();

const listaHTML = document.getElementById("lista");
const totalHTML = document.getElementById("total");

// Mostrar/Ocultar campo extra según el tipo
document.getElementById("tipo").addEventListener("change", (e) => {
    const extraInput = document.getElementById("extra");
    if (e.target.value === "proyecto") {
        extraInput.style.display = "block";
    } else {
        extraInput.style.display = "none";
    }
});

document.getElementById("add").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const salario = Number(document.getElementById("salario").value);
    const tipo = document.getElementById("tipo").value;

    let nuevoEmpleado;

    if (tipo === "fijo") {
        nuevoEmpleado = new EmpleadoFijo(nombre, salario);
    } else {
        const extra = Number(document.getElementById("extra").value);
        nuevoEmpleado = new EmpleadoPorProyecto(nombre, salario, extra);
    }

    empleados.push(nuevoEmpleado);
    actualizarUI();

    // Limpiar campos
    document.getElementById("nombre").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("extra").value = "";
});

function actualizarUI() {
    listaHTML.innerHTML = "";
    empleados.forEach(emp => {
        const li = document.createElement("li");
        li.textContent = `${emp.nombre} - Salario Final: $${emp.calcularSalario()}`;
        listaHTML.appendChild(li);
    });

    const total = nominaService.calcularTotal(empleados);
    totalHTML.textContent = `Total Nómina: $${total}`;
}