async function sumar() {
    const a = document.getElementById("num1").value;
    const b = document.getElementById("num2").value;
    
    const res = await fetch("/sumar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ a, b })
    });
    
    const data = await res.json();
    document.getElementById("resultado").textContent = "Resultado: " + data.resultado;
}

async function restar() {
    const a = document.getElementById("num1").value;
    const b = document.getElementById("num2").value;
    
    const res = await fetch("/restar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ a, b })
    });
    
    const data = await res.json();
    document.getElementById("resultado").textContent = "Resultado: " + data.resultado;
}

async function multiplicar() {
    const a = document.getElementById("num1").value;
    const b = document.getElementById("num2").value;
    
    const res = await fetch("/multiplicar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ a, b })
    });
    
    const data = await res.json();
    document.getElementById("resultado").textContent = "Resultado: " + data.resultado;
}

async function dividir() {
    const a = document.getElementById("num1").value;
    const b = document.getElementById("num2").value;
    
    const res = await fetch("/dividir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ a, b })
    });
    
    if (!res.ok) {
        const data = await res.json();
        document.getElementById("resultado").textContent = "Error: " + data.error;
        return;
    }
    
    const data = await res.json();
    document.getElementById("resultado").textContent = "Resultado: " + data.resultado;
}