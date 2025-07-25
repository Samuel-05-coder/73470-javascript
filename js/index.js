function Prestamo(nombre, apellido, dni, monto, plazo, interes, total) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.dni = dni;
  this.monto = monto;
  this.plazo = plazo;
  this.interes = interes;
  this.total = total;
}

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
const historialDiv = document.getElementById("historial");
const borrarHistorialBtn = document.getElementById("borrarHistorial");

let historialPrestamos = JSON.parse(localStorage.getItem("historialPrestamos")) || [];

function simularPrestamo(e) {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const dni = dniInput.value.trim();
  const monto = parseFloat(montoInput.value);
  const plazo = parseInt(plazoInput.value);

  if (!nombre || !apellido || !dni || isNaN(monto) || isNaN(plazo)) {
    Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, complete todos los campos correctamente.'
    });
    return;
  }

  const tasa = 0.15;
  const interes = monto * tasa;
  const total = monto + interes;
  const cuota = total / plazo;

  const nuevo = new Prestamo(nombre, apellido, dni, monto, plazo, interes, total);
  historialPrestamos.push(nuevo);
  localStorage.setItem("historialPrestamos", JSON.stringify(historialPrestamos));

  nombreUsuario.textContent = `Nombre: ${nombre} ${apellido}`;
  totalAPagar.textContent = `Total a pagar: $${total.toFixed(2)}`;
  interesTotal.textContent = `Interés total: $${interes.toFixed(2)}`;
  cuotaMensual.textContent = `Cuota mensual: $${cuota.toFixed(2)}`;
  mensaje.textContent = "";

  resultadoDiv.style.display = "block";

  Swal.fire({
    icon: 'success',
    title: 'Simulación exitosa',
    text: 'Revisa los resultados debajo.'
  });

  mostrarHistorial();
}

function limpiarResultados() {
  form.reset();
  nombreUsuario.textContent = "";
  totalAPagar.textContent = "";
  interesTotal.textContent = "";
  cuotaMensual.textContent = "";
  mensaje.textContent = "";
  resultadoDiv.style.display = "none";
}

function mostrarHistorial() {
  historialDiv.innerHTML = "";
  if (historialPrestamos.length === 0) {
    historialDiv.innerHTML = "<p>No hay historial disponible.</p>";
    return;
  }

  historialPrestamos.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("historial-item");
    div.innerHTML = `
      <p><strong>#${index + 1}</strong></p>
      <p>${p.nombre} ${p.apellido} - DNI: ${p.dni}</p>
      <p>Préstamo: $${p.monto} - Plazo: ${p.plazo} meses</p>
      <p>Total a pagar: $${p.total}</p>
      <button class="eliminarBtn" data-index="${index}">Eliminar</button>
      <hr>
    `;
    historialDiv.appendChild(div);
  });

  document.querySelectorAll(".eliminarBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.getAttribute("data-index");
      eliminarPrestamo(index);
    });
  });
}

function eliminarPrestamo(index) {
  historialPrestamos.splice(index, 1);
  localStorage.setItem("historialPrestamos", JSON.stringify(historialPrestamos));
  mostrarHistorial();
}

borrarHistorialBtn.addEventListener("click", () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Se borrará todo el historial!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, borrar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("historialPrestamos");
      historialPrestamos = [];
      mostrarHistorial();
      Swal.fire('¡Borrado!', 'El historial ha sido eliminado.', 'success');
    }
  });
});

form.addEventListener("submit", simularPrestamo);
limpiarBoton.addEventListener("click", limpiarResultados);

window.addEventListener("load", () => {
  resultadoDiv.style.display = "none";
  mostrarHistorial();
});