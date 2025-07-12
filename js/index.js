// Constructor del préstamo
function Prestamo(nombre, apellido, dni, monto, plazo, interes, total) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.monto = monto;
    this.plazo = plazo;
    this.interes = interes;
    this.total = total;
}

// Capturar elementos DOM
const form = document.getElementById("formulario");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const dniInput = document.getElementById("dni");
const montoInput = document.getElementById("monto");
const plazoInput = document.getElementById("plazo");

const nombreUsuario = document.getElementById("nombreUsuario");
const totalAPagar = document.getElementById("totalAPagar");
const interesTotal = document.getElementById("interesTotal");
const cuotaMensual = document.getElementById("cuotaMensual");
const mensaje = document.getElementById("mensaje");
const resultadoDiv = document.getElementById("resultado");
const limpiarBoton = document.getElementById("Limpiar");

// Historial
let historialPrestamos = JSON.parse(localStorage.getItem("historialPrestamos")) || [];

// Función principal
function simularPrestamo(e) {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const dni = dniInput.value.trim();
    const monto = parseFloat(montoInput.value);
    const plazo = parseInt(plazoInput.value);

    // Validación
    if (!nombre || !apellido || !dni || isNaN(monto) || isNaN(plazo)) {
        mensaje.textContent = "Por favor, complete todos los campos correctamente.";
        return;
    }

    const tasa = 0.15;
    const interes = monto * tasa;
    const total = monto + interes;
    const cuota = total / plazo;

    const nuevo = new Prestamo(nombre, apellido, dni, monto, plazo, interes, total);
    historialPrestamos.push(nuevo);
    localStorage.setItem("historialPrestamos", JSON.stringify(historialPrestamos));

    // Mostrar resultados
    nombreUsuario.textContent = `Nombre: ${nombre} ${apellido}`;
    totalAPagar.textContent = `Total a pagar: $${total.toFixed(2)}`;
    interesTotal.textContent = `Interés total: $${interes.toFixed(2)}`;
    cuotaMensual.textContent = `Cuota mensual: $${cuota.toFixed(2)}`;
    mensaje.textContent = "Simulación realizada correctamente.";

    resultadoDiv.style.display = "block";
}

// Limpiar pantalla y formulario
function limpiarResultados() {
    form.reset();
    nombreUsuario.textContent = "";
    totalAPagar.textContent = "";
    interesTotal.textContent = "";
    cuotaMensual.textContent = "";
    mensaje.textContent = "";
    resultadoDiv.style.display = "none";
}

// Eventos
form.addEventListener("submit", simularPrestamo);
limpiarBoton.addEventListener("click", limpiarResultados);

// Mostrar historial al cargar
window.addEventListener("load", () => {
    resultadoDiv.style.display = "none";
});
