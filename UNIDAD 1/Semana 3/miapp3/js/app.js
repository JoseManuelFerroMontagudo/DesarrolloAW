document.addEventListener('DOMContentLoaded', () => {
    const options = { valueNames: ['name', 'born', 'city'] };

    if (typeof List === 'undefined') {
        console.error('List.js no está cargado. Verifica que `lib/list.js` se incluya antes de este script.');
        return;
    }

    const userList = new List('users', options);

    const addBtn = document.getElementById('addUser');
    if (!addBtn) return;

    addBtn.addEventListener('click', () => {
        const swal = window.Swal || window.swal || window.Sweetalert2 || window.sweetAlert;
        if (!swal || !swal.fire) {
            console.error('SweetAlert2 no está disponible. Verifica que `lib/sweetalert2.min.js` se incluya antes de este script.');
            return;
        }

        swal.fire({
            title: 'Agregar Usuario',
            input: 'text',
            inputPlaceholder: 'Nombre',
            showCancelButton: true,
            confirmButtonText: 'Agregar',
        }).then((result) => {
            if (result.isConfirmed) {
                const name = String(result.value || '').trim();
                if (!name) {
                    swal.fire('Nombre inválido', 'Ingrese un nombre válido', 'warning');
                    return;
                }
                const age = Math.floor(Math.random() * 50) + 20;
                const count = typeof userList.size === 'function' ? userList.size() : (userList.items ? userList.items.length : 0);
                const city = 'Ciudad ' + (count + 1);
                userList.add({ name, born: age, city });
                swal.fire('Usuario Agregado', `Nombre: ${name}, Edad: ${age}, Ciudad: ${city}`, 'success');
            }
        });
    });
});
