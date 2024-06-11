// Evento para manejar el envío del formulario de creación de televisor
document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores de los campos del formulario
    const serie = document.getElementById('createSerie').value;
    const marca = document.getElementById('createMarca').value;
    const nombre_cliente = document.getElementById('createNombreCliente').value;
    const apellido_cliente = document.getElementById('createApellidoCliente').value;
    const numero_cedula = document.getElementById('createNumeroCedula').value;

    // Enviar la solicitud POST para crear un nuevo televisor
    fetch('/televisores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            serie: serie,
            marca: marca,
            nombre_cliente: nombre_cliente,
            apellido_cliente: apellido_cliente,
            numero_cedula: numero_cedula
        })
    })
    .then(response => response.json()) // Parsear la respuesta JSON
    .then(data => {
        if (data.message) {
            alert(data.message); // Mostrar mensaje de éxito
            document.getElementById('createForm').reset(); // Reiniciar el formulario
            loadTelevisores(); // Recargar la lista de televisores
        } else if (data.error) {
            alert(data.error); // Mostrar mensaje de error
        }
    })
    .catch(error => console.error('Error:', error)); // Manejar errores
});

// Evento para cargar la lista de televisores al hacer clic en el botón correspondiente
document.getElementById('loadTelevisores').addEventListener('click', loadTelevisores);

// Función para cargar y mostrar la lista de televisores
function loadTelevisores() {
    fetch('/televisores')
    .then(response => response.json()) // Parsear la respuesta JSON
    .then(data => {
        const televisoresTable = document.getElementById('televisoresTable').getElementsByTagName('tbody')[0];
        televisoresTable.innerHTML = ''; // Limpiar la tabla
        data.forEach(televisor => {
            const row = televisoresTable.insertRow(); // Crear nueva fila
            row.insertCell(0).textContent = televisor[0]; // Insertar celdas con los datos del televisor
            row.insertCell(1).textContent = televisor[1];
            row.insertCell(2).textContent = televisor[2];
            row.insertCell(3).textContent = televisor[3];
            row.insertCell(4).textContent = televisor[4];
        });
    })
    .catch(error => console.error('Error:', error)); // Manejar errores
}

// Evento para manejar el envío del formulario de búsqueda de televisor
document.getElementById('findForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const serie = document.getElementById('findSerie').value; // Obtener el valor del campo de serie

    // Enviar la solicitud GET para buscar un televisor por serie
    fetch(`/televisores/${serie}`)
    .then(response => response.json()) // Parsear la respuesta JSON
    .then(data => {
        const findResult = document.getElementById('findResult');
        if (data.error) {
            findResult.textContent = data.error; // Mostrar mensaje de error
        } else {
            findResult.textContent = `Serie: ${data.serie}, Marca: ${data.marca}, Cliente: ${data.nombre_cliente} ${data.apellido_cliente}, Cedula: ${data.numero_cedula}`; // Mostrar datos del televisor
        }
    })
    .catch(error => console.error('Error:', error)); // Manejar errores
});

// Evento para manejar el envío del formulario de actualización de televisor
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores de los campos del formulario
    const serie = document.getElementById('updateSerie').value;
    const marca = document.getElementById('updateMarca').value;
    const nombre_cliente = document.getElementById('updateNombreCliente').value;
    const apellido_cliente = document.getElementById('updateApellidoCliente').value;
    const numero_cedula = document.getElementById('updateNumeroCedula').value;

    // Enviar la solicitud PUT para actualizar el televisor
    fetch(`/televisores/${serie}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            marca: marca,
            nombre_cliente: nombre_cliente,
            apellido_cliente: apellido_cliente,
            numero_cedula: numero_cedula
        })
    })
    .then(response => response.json()) // Parsear la respuesta JSON
    .then(data => {
        if (data.message) {
            alert(data.message); // Mostrar mensaje de éxito
            document.getElementById('updateForm').reset(); // Reiniciar el formulario
            loadTelevisores(); // Recargar la lista de televisores
        } else if (data.error) {
            alert(data.error); // Mostrar mensaje de error
        }
    })
    .catch(error => console.error('Error:', error)); // Manejar errores
});

// Evento para manejar el envío del formulario de eliminación de televisor
document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const serie = document.getElementById('deleteSerie').value; // Obtener el valor del campo de serie

    // Enviar la solicitud DELETE para eliminar el televisor
    fetch(`/televisores/${serie}`, {
        method: 'DELETE'
    })
    .then(response => response.json()) // Parsear la respuesta JSON
    .then(data => {
        if (data.message) {
            alert(data.message); // Mostrar mensaje de éxito
            document.getElementById('deleteForm').reset(); // Reiniciar el formulario
            loadTelevisores(); // Recargar la lista de televisores
        } else if (data.error) {
            alert(data.error); // Mostrar mensaje de error
        }
    })
    .catch(error => console.error('Error:', error)); // Manejar errores
});
