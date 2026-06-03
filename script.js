// EL CONTADOR DE ANIVERSARIO 

// 1. Guardamos la fecha de vuestro aniversario
// Sintaxis: new Date(Año, Mes, Día, Hora, Minuto, Segundo)
//  En JS, los meses empiezan en 0: Enero=0, Febrero=1... Junio=5.

const fechaAniversario = new Date(2025, 5, 14, 0, 0, 0);

// 2. Creamos la función que hará el cálculo matemático

function actualizarContador() {
    const ahora = new Date(); // Esto pilla la fecha y hora exacta de este milisegundo

    // Restamos las fechas. El resultado son los milisegundos 
    // que han pasado entre el inicio y hoy.

   const diferenciaMils = ahora - fechaAniversario;

   // 3. Convertimos los milisegundos a unidades de tiempo legibles (Matemáticas puras)
    // Dividimos entre (1000ms * 60s * 60m * 24h) para sacar los días redondos
    //  (Math.floor elimina los decimales)

    const dias = Math.floor(diferenciaMils / (1000 * 60 * 60 * 24));

    // El símbolo '%' (Módulo) nos da el "resto" de la división anterior. 
    // Lo usamos para ver cuántas horas, minutos y segundos sueltos quedan tras sacar los días.
    
    const horas = Math.floor((diferenciaMils % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutos = Math.floor((diferenciaMils % (1000 * 60 * 60)) / (1000 * 60));

    const segundos = Math.floor((diferenciaMils % (1000 * 60)) / 1000);

    // 4. Conectamos con el HTML (Manipulación del DOM)
    // Buscamos en tu index.html el div que tiene el id="contador"

    const contenedorContador = document.getElementById('contador');

    // Inyectamos el nuevo código HTML dentro de ese div usando "Template Literals" (las comillas invertidas ``)
    // Esto nos permite meter variables de JS directamente usando ${variable}

    contenedorContador.innerHTML = `<div class="tiempo-unidad"><strong>${dias}</strong> días</div>
        <div class="tiempo-unidad"><strong>${horas}</strong> horas</div>
        <div class="tiempo-unidad"><strong>${minutos}</strong> min</div>
        <div class="tiempo-unidad"><strong>${segundos}</strong> seg</div>`;
}

// 5. Activación del contador

actualizarContador(); // Ejecutamos la función una vez nada más cargar la página para que no salga en blanco

setInterval(actualizarContador, 1000); // Actualiza el contador cada segundo (1000ms = 1s)


// ==========================================
// REPRODUCCTOR DE MÚSICA
// ==========================================

const listaCanciones = [  // TODO HAY QUE ACTUALIZARLO
    {
        titulo: "Ángeles Griegos, Luz Gaggi",
        archivo: "musica/angelesgriegos.mp3",
        portada: "imagenes/angelesgriegos.jpg"
    },

    {
        titulo: "Bokete, Bad Bunny",
        archivo: "musica/bokete.mp3",
        portada: "imagenes/dtmf.jpg"
    },

    {
        titulo: "Guille Asesino, C Tangana",
        archivo: "musica/guilleasesino.mp3",
        portada: "imagenes/guilleasesino.jpg"
    },

    {
        titulo: "Comerranas, Seguridad Social",
        archivo: "musica/comerranas.mp3",
        portada: "imagenes/comerranas.jpg"
    },
    
    {
        titulo: "Baile inolvidable, Bad Bunny",
        archivo: "musica/baileinolvidable.mp3",
        portada: "imagenes/dtmf.jpg"
    },

    {
        titulo: "Blue Jeans, Sen Senra",
        archivo: "musica/bluejeans.mp3",
        portada: "imagenes/bluejeans.jpg"
    },

    {
        titulo: "Cara de Gitana, Daniel Magal",
        archivo: "musica/caradegitana.mp3",
        portada: "imagenes/caradegitana.jpg"
    }
];
// Variable para saber en qué posición de la lista estamos. (0 es la primera canción)

let indiceActual = 0;

// 2. Apuntamos a los elementos del HTML que queremos cambiar o escuchar

const audio = document.getElementById('reproductor-audio');
const portada = document.getElementById('portada-cancion');
const nombreCancion = document.getElementById('nombre-cancion');

// Los 4 botones de control

const btnPlay = document.getElementById('btn-play');
const btnPause = document.getElementById('btn-pause');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnAnterior = document.getElementById('btn-anterior');

function cargarCancion(indice) {
    const cancion = listaCanciones[indice];

    audio.src = cancion.archivo; // Cambia la fuente del audio
    portada.src = cancion.portada; // Cambia la imagen de portada
    nombreCancion.textContent = cancion.titulo; // Cambia el título de la canción
}

function reproducir() {
    audio.play();
}

function pausar() {
    audio.pause();
}

function siguiente() {
    indiceActual++;

    if (indiceActual >= listaCanciones.length) {
        indiceActual = 0; // Volvemos al inicio si llegamos al final
    }


cargarCancion(indiceActual); // Cargamos la primera canción al inicio
reproducir();
}

function anterior() {
    indiceActual--;
    if (indiceActual < 0) {
        indiceActual = listaCanciones.length - 1; // Vamos a la última canción si estamos en la primera
    }

    cargarCancion(indiceActual);
    reproducir();
}

btnPlay.addEventListener('click', reproducir);
btnPause.addEventListener('click', pausar);
btnSiguiente.addEventListener('click', siguiente);
btnAnterior.addEventListener('click', anterior);

cargarCancion(indiceActual); // Cargamos la primera canción al inicio

// ==========================================
// CONTROL DE VOLUMEN
// ==========================================

// 1. Capturamos el deslizador del HTML

const sliderVolumen = document.getElementById('slider-volumen');

// 2. Forzamos a que el audio empiece al 50% para coincidir con el "value=0.5" del HTML

audio.volume = 0.5;

// 3. Escuchamos cuando ella mueva la barra

sliderVolumen.addEventListener('input', function() {

    // Asignamos el valor del slider directamente al volumen del audio

    audio.volume = sliderVolumen.value;
});