// Funciones de cálculo
function sumar(a, b) {
    return Number(a) + Number(b);
}

function restar(a, b) {
    return Number(a) - Number(b);
}

function multiplicar(a, b) {
    return Number(a) * Number(b);
}

function dividir(a, b) {
    if (Number(b) === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return Number(a) / Number(b);
}

module.exports = { sumar, restar, multiplicar, dividir };