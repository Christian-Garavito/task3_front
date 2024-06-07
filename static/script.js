document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serie = document.getElementById('createSerie').value;
    const marca = document.getElementById('createMarca').value;
    const nombre_cliente = document.getElementById('createNombreCliente').value;
    const apellido_cliente = document.getElementById('createApellidoCliente').value;
    const numero_cedula = document.getElementById('createNumeroCedula').value;

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
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            document.getElementById('createForm').reset();
            loadTelevisores();
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('loadTelevisores').addEventListener('click', loadTelevisores);

function loadTelevisores() {
    fetch('/televisores')
    .then(response => response.json())
    .then(data => {
        const televisoresTable = document.getElementById('televisoresTable').getElementsByTagName('tbody')[0];
        televisoresTable.innerHTML = '';
        data.forEach(televisor => {
            const row = televisoresTable.insertRow();
            row.insertCell(0).textContent = televisor[0];
            row.insertCell(1).textContent = televisor[1];
            row.insertCell(2).textContent = televisor[2];
            row.insertCell(3).textContent = televisor[3];
            row.insertCell(4).textContent = televisor[4];
        });
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('findForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serie = document.getElementById('findSerie').value;

    fetch(`/televisores/${serie}`)
    .then(response => response.json())
    .then(data => {
        const findResult = document.getElementById('findResult');
        if (data.error) {
            findResult.textContent = data.error;
        } else {
            findResult.textContent = `Serie: ${data.serie}, Marca: ${data.marca}, Cliente: ${data.nombre_cliente} ${data.apellido_cliente}, Cedula: ${data.numero_cedula}`;
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serie = document.getElementById('updateSerie').value;
    const marca = document.getElementById('updateMarca').value;
    const nombre_cliente = document.getElementById('updateNombreCliente').value;
    const apellido_cliente = document.getElementById('updateApellidoCliente').value;
    const numero_cedula = document.getElementById('updateNumeroCedula').value;

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
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            document.getElementById('updateForm').reset();
            loadTelevisores();
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serie = document.getElementById('deleteSerie').value;

    fetch(`/televisores/${serie}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            document.getElementById('deleteForm').reset();
            loadTelevisores();
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});