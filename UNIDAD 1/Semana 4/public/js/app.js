const btn = document.getElementById("btnCargar");
const lista = document.getElementById("listaUsuarios");

btn.addEventListener("click", async () => {
    try {
        const res = await axios.get("/api/usuarios"); // Petición al backend propio 
        lista.innerHTML = ""; // Limpiar lista
        
        res.data.forEach(usuario => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            // Para el EJEMPLO PROPUESTO: se añade el email 
            li.innerHTML = `<strong>${usuario.name}</strong><br><small>${usuario.email}</small>`; 
            lista.appendChild(li); 
        });
    } catch (error) {
        console.error("Error:", error); 
    }
});