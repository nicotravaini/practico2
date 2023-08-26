let nombreUsuario = document.getElementById("nombreUsuario");
let victoriasComputadora = 0;
let victoriasUsuario = 0;
let botonComenzar = document.getElementById("botonComenzar");

// ESTA FUNCION CARGA EL NOMBRE DEL USUARIO EN UNA VARIABLE, REEMPLAZA EL VALOR DEL TABLERO CON EL NOMBRE DEL USUARIO Y LO SALUDA,
// ADEMAS ESCONDE EL TEXTO DE BIENVENIDA Y EL INPUT PARA PONER EL NOMBRE Y EL BOTON PARA INICIAR
function cargarNombreUsuario() { 
    nombreUsuario = document.getElementById("nombreUsuario").value;
    let alertaIncorrecto = document.getElementById("nombreIncorrecto");
    if (nombreUsuario == "" || !(isNaN(nombreUsuario))) {
        ocultarBotones();
        alertaIncorrecto.style.display = "flex";
        alertaIncorrecto.innerHTML = "Tienes que ingresar un nombre para jugar";
        // alert("Tienes que ingresar un nombre para jugar");
    } else {
        alertaIncorrecto.style.display = "none";
        document.getElementById("boardGame").innerHTML = `Hola ${nombreUsuario}, bienvenido a este juego!`;
        document.getElementById("player-one").innerHTML = nombreUsuario;
        document.getElementById("inputUsuario").style.display = 'none';
        document.getElementById("textoBienvenida").style.display = 'none';
        mostrarBotones();
    }
}

//ACA SE LLAMA A LAS FUNCIONES AL HACER CLICK EN LOS DISTINTOS BOTONES
document.addEventListener("DOMContentLoaded", function () {
    let botonSonido = document.getElementById("botonSonido");
    let botonReiniciar = document.getElementById("botonReiniciar");
    let botonOtraRonda = document.getElementById("botonOtraRonda");
    botonSonido.addEventListener("click", activarSonido);
    botonReiniciar.addEventListener("click", reiniciar);
    botonOtraRonda.addEventListener("click", otraRonda);
    botonComenzar.addEventListener("click", cargarNombreUsuario);
})

// ESTA FUNCION ACTIVA EL SONIDO DEL VIDEO
function activarSonido() {
    let video = document.getElementById("video");
    video.muted = !video.muted;
    let transicion = document.getElementById("botonSonido");
    transicion.classList.toggle("botonSonido-transition");
}
// ESTA FUNCION OCULTA LOS BOTONES DEL JUEGO CUANDO HAY UN GANADOR Y CUANDO SE REINICIA EL JUEGO
function ocultarBotones() {
    document.getElementById("botonPiedra").style.display = 'none';
    document.getElementById("botonPapel").style.display = 'none';
    document.getElementById("botonTijera").style.display = 'none';
}

//ESTA FUNCION ES LA QUE  AL APRETAR EL BOTON COMENZAR MUESTRA TODO EL JUEGO
function mostrarBotones() {
    document.getElementById("botonPiedra").style.display = 'inline';
    document.getElementById("botonPapel").style.display = 'inline';
    document.getElementById("botonTijera").style.display = 'inline';
    document.getElementById("gridBoard").style.display = 'inline';
    document.getElementById("botonesYPantalla").style.display = 'inline';
}

function reiniciar() {
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("inputUsuario").style.display = "flex";
    document.getElementById("textoBienvenida").style.display = 'flex';
    document.getElementById("boardGame").innerHTML = "";
    document.getElementById("player-one").innerHTML = "Usuario";
    document.getElementById("puntosUsuario").innerHTML = "0";
    document.getElementById("puntosComputadora").innerHTML = "0";
    document.getElementById("gridBoard").style.display = 'none';
    document.getElementById("botonesYPantalla").style.display = 'none';
    ocultarBotones()
    victoriasComputadora = 0;
    victoriasUsuario = 0;
}

function otraRonda() {
    document.getElementById("puntosUsuario").innerHTML = "0";
    document.getElementById("puntosComputadora").innerHTML = "0";
    mostrarBotones();
    victoriasComputadora = 0;
    victoriasUsuario = 0;
}

// ACA EMPIEZAN LAS FUNCIONES DEL JUEGO

document.addEventListener("DOMContentLoaded", function () {
    let botonPiedra = document.getElementById("piedra");
    let botonPapel = document.getElementById("papel");
    let botonTijera = document.getElementById("tijera");
    botonPiedra.addEventListener("click", () => jugadaUsuario("piedra"));
    botonPapel.addEventListener("click", () => jugadaUsuario("papel"));
    botonTijera.addEventListener("click", () => jugadaUsuario("tijera"));
})

function jugadaComputadora() {
    let opciones = ["piedra", "papel", "tijera"];
    return opciones[Math.floor(Math.random() * 3)].toLowerCase();
}

function jugadaUsuario(jugada) {
    let eleccionUsuario
    if (jugada === "piedra") {
        eleccionUsuario = "piedra";
    } else if (jugada === "papel") {
        eleccionUsuario = "papel";
    } else if (jugada === "tijera") {
        eleccionUsuario = "tijera";
    }
    determinarGanador(eleccionUsuario);
}

function determinarGanador(eleccionUsuario) {
    let eleccionComputadora = jugadaComputadora();
    if (eleccionComputadora == eleccionUsuario) {
        document.getElementById("boardGame").innerHTML = `${nombreUsuario} elige ${eleccionUsuario} <br>Computadora elige ${eleccionComputadora} <br>es un Empate`
    } else if ((eleccionComputadora == "piedra" && eleccionUsuario == "tijera") || (eleccionComputadora == "papel" && eleccionUsuario == "piedra") || (eleccionComputadora == "tijera" && eleccionUsuario == "papel")) {
        victoriasComputadora += 1;
        document.getElementById("puntosComputadora").innerHTML = victoriasComputadora;
        document.getElementById("boardGame").innerHTML = `${nombreUsuario} elige ${eleccionUsuario} <br>Computadora elige ${eleccionComputadora} <br>Gana la computadora`;
    } else {
        victoriasUsuario += 1;
        document.getElementById("puntosUsuario").innerHTML = victoriasUsuario;
        document.getElementById("boardGame").innerHTML = `${nombreUsuario} elige ${eleccionUsuario} <br>Computadora elige ${eleccionComputadora} <br>Gana el usuario`;
    }
    mejorDeCinco(victoriasComputadora, victoriasUsuario)
}

function mejorDeCinco(victoriasComputadora, victoriasUsuario) {
    if (victoriasComputadora == 3) {
        document.getElementById("boardGame").innerHTML = "GANA LA COMPUTADORA";
        ocultarBotones();
    } else if (victoriasUsuario == 3) {
        document.getElementById("boardGame").innerHTML = `GANA ${nombreUsuario}`;
        ocultarBotones();
    }
}