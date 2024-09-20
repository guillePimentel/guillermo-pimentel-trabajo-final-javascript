// Función para validar los datos de contacto
document.getElementById('presupuestoForm').addEventListener('submit', function(event) {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    const nombreRegex = /^[A-Za-z\s]+$/;
    const apellidosRegex = /^[A-Za-z\s]+$/;
    const telefonoRegex = /^\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre.match(nombreRegex)) {
        alert('El nombre solo debe contener letras.');
        event.preventDefault();
    }

    if (!apellidos.match(apellidosRegex)) {
        alert('Los apellidos solo deben contener letras.');
        event.preventDefault();
    }

    if (!telefono.match(telefonoRegex)) {
        alert('El teléfono debe contener exactamente 9 dígitos.');
        event.preventDefault();
    }

    if (!email.match(emailRegex)) {
        alert('El correo electrónico no es válido.');
        event.preventDefault();
    }
    if (producto === '0') {
        alert('Por favor, selecciona una experiencia válida.');
        event.preventDefault();
    }
});

// Función para calcular el presupuesto en tiempo real
const producto = document.getElementById('producto');
const plazo = document.getElementById('plazo');
const extras = document.querySelectorAll('.extra');
const presupuestoTotal = document.getElementById('presupuestoTotal');

function calcularPresupuesto() {
    let total = parseFloat(producto.value);
    const meses = parseInt(plazo.value);

    if (isNaN(total) || total === 0) {
        presupuestoTotal.textContent = '0.00'; // Mostrar 0 si no hay una selección válida
        return;
    }

    // Aplicar un descuento del 10% si el plazo es mayor a 6 meses
    if (meses > 6) {
        total *= 0.9;
    }

    // Sumar los extras seleccionados
    extras.forEach(extra => {
        if (extra.checked) {
            total += parseFloat(extra.value);
        }
    });

    presupuestoTotal.textContent = total.toFixed(2);
}

// Event listeners para actualizar el presupuesto en tiempo real
producto.addEventListener('change', calcularPresupuesto);
plazo.addEventListener('input', calcularPresupuesto);
extras.forEach(extra => {
    extra.addEventListener('change', calcularPresupuesto);
});

// Inicializar el presupuesto
calcularPresupuesto();