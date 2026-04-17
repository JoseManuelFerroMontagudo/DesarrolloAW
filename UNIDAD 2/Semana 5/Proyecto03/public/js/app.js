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