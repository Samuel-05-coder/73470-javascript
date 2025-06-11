// INICIO DEL SIMULADO (Prestamo personal)

//NOMBRE USUARIO
let nombreUsuario = prompt ("Pon tu nombre y apellido")

function mostrarNombreUsuario() {
    if (nombreUsuario){
        alert(`Hola ${nombreUsuario}, bienvenido al simulador de prestamos personales`);
    } else {
        alert ("No ingresaste tu nombre, por favor intentalo de nuevo");
    }
}

mostrarNombreUsuario();


//MONTO
let montoIngresado = prompt ("¿Cuánto deseas pedir prestado? (Máximo $100.000)");
montoIngresado = montoIngresado.replace(/\D/g, "");
let montoSolicitado = parseInt (montoIngresado);

const montoMaximo = 100000; // Maximo permitido
let montoValido = false;

function calcularPrestamo () {
    if (!isNaN(montoSolicitado) && montoSolicitado <= montoMaximo && montoSolicitado > 0) {
        alert ("El monto ingresado es valido");
        montoValido = true;
    } else {
        alert ("El monto es inválido o supera el límite de $100.000. Inténtalo de nuevo.");
    }
}

calcularPrestamo ()


//MESES
let plazoMeses = prompt ("Ingrese la cantidad de meses a pagar su prestamo (Maximo 68 meses)");
plazoMeses = plazoMeses.replace(/\D/g, "");
let mesesSolicitados = parseInt (plazoMeses);

const mesesMaximos = 68; // Meses maximos permitidos
mesesValidos = false;

function calcularMeses () {
    if (!isNaN(mesesSolicitados) && mesesSolicitados <= mesesMaximos && mesesSolicitados > 0) {
        alert ("La cantidad de meses ingresada es valida");
        mesesValidos = false;
    } else {
        alert ("La cantidad de meses es invalida, por favor ingrese otra cantidad dentro del maxiomo");
    }
}

calcularMeses ()


//CALCULACION DE AñoS DE PLAZO
if (montoValido && mesesValidos){
    const añosPlazo = mesesSolicitados /12,
        tasaAnual = 0.20; // 20% Anual - TASA DE INTERES ANUAL FIJA
        interesTotal = montoSolicitado * tasaAnual * añosPlazo,
        totalPagar = montoSolicitado + interesTotal,
        cuotaMensual = totalPagar / mesesSolicitados;

    alert (`Resumen del prestamo para ${nombreUsuario}:

    Monto solicitado: $${montoSolicitado}
    Plazo: ${mesesSolicitados} meses (${añosPlazo.toFixed(1)} años)
    Interés total: $${interesTotal.toFixed(2)}
    Total a pagar: $${totalPagar.toFixed(2)}
    Cuota mensual: $${cuotaMensual.toFixed(2)}
`);
} else {
    alert ("No se pudo general el resumen, por favor intente nuevamente y asegurese de que ponga bien los datos solicitados")
}


//ARRAY SOBRE LOS DATOS SOBRE EL PRESTAMO
let historialPrestamo = [];

historialPrestamo.push({
    nombre: nombreUsuario,
    monto: montoIngresado,
    meses: plazoMeses,
    tota: totalPagar
});

// FALTA MUCHO POR MEJORAR, PERO VAMOS MEJORANDO DE ACUERDO A LA PRACTICA
//FALTA PONER CANTIDAD DE INTERES DE ACUERDO AL PLAZO EN MESES Y MONTO A PRESTAR
//HACER QUE SE REPITA LA FUNCION CUANDO SE PONE UN DATO NO VALIDO