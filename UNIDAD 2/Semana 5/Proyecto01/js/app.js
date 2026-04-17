const btn = document.getElementById("btn");
const resultado = document.getElementById("resultado");

function obtenerUsuario() {
    resultado.textContent = "Cargando...";
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            document.getElementById("cuerpoTabla").innerHTML = generarTabla(data);
            resultado.textContent = "Datos cargados";
        })
        .catch(error => {
            resultado.textContent = "Error al obtener datos";
            console.error(error);
        });
}

btn.addEventListener("click", obtenerUsuario);
function generarTabla(usuarios) {
    let html = '';
    
    usuarios.forEach(u => {
        html += `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.address.city}</td>
            </tr>
        `;
    });
    
    return html;
}