import { Contador } from "./Contador.js";

const contador = new Contador();
const valorHTML = document.getElementById("valor");

function render() {
    valorHTML.textContent = contador.obtenerValor();
}

document.getElementById("sumar").addEventListener("click", () => {
    contador.incrementar();
    render();
});

document.getElementById("restar").addEventListener("click", () => {
    contador.disminuir();
    render();
});

document.getElementById("reset").addEventListener("click", () => {
    contador.resetear();
    render();
});

// Render inicial
render();