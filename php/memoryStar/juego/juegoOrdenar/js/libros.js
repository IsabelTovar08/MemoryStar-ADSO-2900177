const contenedorLibros = document.querySelector('#lista');
const libros = document.getElementById("lista");
const botonVerificar = document.getElementById("verificarBtn");
const resultado = document.getElementById("resultado");
const tiempo = 5000;

// Lista expandida de libros para todas las rondas
const todosLosLibros = [
    { src: 'img/librito1.png', dataId: '1' },
    { src: 'img/librito2.png', dataId: '2' },
    { src: 'img/librito3.png', dataId: '3' },
    { src: 'img/librito4.png', dataId: '4' },
    { src: 'img/librito5.png', dataId: '5' },
    { src: 'img/librito6.png', dataId: '6' },
    { src: 'img/librito7.png', dataId: '7' },
    { src: 'img/librito8.png', dataId: '8' }
];

// Variables globales para el control de rondas
let rondaActual = 1;
let librosEnRondaActual = 6; // Comenzamos con 6 libros
let puntajeTotal = 0;
let sortable;
let ordenCorrecto;
let intervaloBarra;
let idsLibros = [];

// Función para mezclar arreglo
function mezclarArreglo(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Función para obtener los libros para la ronda actual
function obtenerLibrosParaRonda() {
    return todosLosLibros.slice(0, librosEnRondaActual);
}

// Función para mostrar libros en orden
function mostrarLibrosEnOrden(orden) {
    libros.innerHTML = "";
    orden.forEach((id) => {
        let img = document.createElement("img");
        let idSinComillas = id.replace(/'/g, "");
        img.setAttribute("src", `img/librito${idSinComillas}.png`);
        img.setAttribute("data-id", idSinComillas);
        img.classList.add("libro", "inicio");
        libros.appendChild(img);
    });
}

// Funciones de Drag and Drop
function deshabilitarDrag() {
    sortable = Sortable.create(libros, {
        animation: 250,
        chosenClass: "seleccionado",
        dragClass: "drag",
        group: "lista-libros",
        sort: false,
    });
}

function habilitarDrag() {
    if (sortable) {
        sortable.destroy();
    }
    sortable = Sortable.create(libros, {
        animation: 250,
        chosenClass: "seleccionado",
        dragClass: "drag",
        group: "lista-libros",
        sort: true,
        store: {
            set: (sortable) => {
                let ordenActual = sortable.toArray();
                console.log(ordenActual);
            },
        },
        onStart: () => {
            document.querySelectorAll(".libro").forEach((libro) => {
                libro.classList.remove("inicio");
            });
        },
    });
}

// Sistema de temporizador
let contador = -5;
let botonPresionado = false;
let tiempoRestante = 10;

function iniciarTemp() {
    contador = -5;
    let intervalo = setInterval(function () {
        contador++;
        if (contador >= 0) {
            document.getElementById("verificarBtn").disabled = false;
            document.getElementById("temp").innerHTML = `TIEMPO: ${contador}s`;
            if (!intervaloBarra) {
                iniciarBarra();
            }
        } else {
            document.getElementById("verificarBtn").disabled = true;
        }
    }, 1000);
    return intervalo;
}

// Función para la barra de progreso
function iniciarBarra() {
    const barraRegresiva = document.getElementById("countdown-bar");
    const textoRegresivo = document.getElementById("countdown-text");
    
    tiempoRestante = 10;
    
    intervaloBarra = setInterval(() => {
        tiempoRestante--;
        textoRegresivo.textContent = tiempoRestante;
        barraRegresiva.style.width = tiempoRestante * 10 + "%";

        if (tiempoRestante <= 0) {
            clearInterval(intervaloBarra);
            textoRegresivo.textContent = "¡Tiempo!";
            barraRegresiva.style.width = "0%";
            if (!botonPresionado) {
                document.getElementById("tiempo1").innerHTML = `${contador}s`;
                new bootstrap.Modal(document.getElementById("tablapuntuacionsolo")).show();
            }
        }
    }, 1000);
}

// Función para iniciar una nueva ronda
function iniciarRonda() {
    // Actualizar libros para la ronda actual
    const librosRonda = obtenerLibrosParaRonda();
    
    // Limpiar el contenedor y arrays
    contenedorLibros.innerHTML = '';
    idsLibros = [];
    
    // Generar las imágenes y actualizar idsLibros
    librosRonda.forEach((libro, index) => {
        const imgLibro = document.createElement('img');
        imgLibro.src = libro.src;
        imgLibro.alt = '';
        imgLibro.classList.add('libro');
        imgLibro.setAttribute('data-id', libro.dataId);
        contenedorLibros.appendChild(imgLibro);
        idsLibros.push(`'${libro.dataId}'`);
    });

    // Generar nuevo orden correcto
    ordenCorrecto = mezclarArreglo([...idsLibros]);
    
    // Mostrar pista inicial
    mostrarLibrosEnOrden(ordenCorrecto);
    
    // Reiniciar temporizadores
    reiniciarTemporizadores();
    
    // Actualizar UI para mostrar la ronda actual
    document.getElementById('ronda-actual').textContent = `Ronda ${rondaActual} de 3`;
}

// Función para reiniciar temporizadores
function reiniciarTemporizadores() {
    // Limpiar intervalos existentes
    if (intervaloBarra) clearInterval(intervaloBarra);
    
    // Reiniciar variables de tiempo
    tiempoRestante = 10;
    contador = -5;
    botonPresionado = false;
    
    // Deshabilitar drag inicial
    deshabilitarDrag();
    
    // Iniciar nueva cuenta regresiva
    iniciarTemp();
    
    // Habilitar drag después de 5 segundos
    setTimeout(() => {
        document.querySelectorAll(".libro").forEach((libro) => {
            libro.classList.remove("inicial");
        });
        let ordenMezclado = mezclarArreglo([...idsLibros]);
        mostrarLibrosEnOrden(ordenMezclado);
        habilitarDrag();
    }, 5000);
}

// Event Listener para el botón verificar
botonVerificar.addEventListener("click", () => {
    let ordenActual = Sortable.get(libros).toArray();
    botonPresionado = true;
    let ordenActualConComillas = ordenActual.map((id) => `'${id}'`);
    let aciertosRonda = 0;

    ordenActualConComillas.forEach((id, index) => {
        if (id === ordenCorrecto[index]) {
            aciertosRonda = aciertosRonda + 100;
        }
    });

    // Actualizar puntaje total
    puntajeTotal += aciertosRonda;
    
    // Mostrar resultados de la ronda
    document.getElementById("tiempo1").innerHTML = `${contador}s`;
    document.getElementById("puntosSecu1").innerHTML = aciertosRonda;
    document.getElementById("puntosSecu2").innerHTML = puntajeTotal;
    
    // Bonus de rubís
    if (contador <= 5 && aciertosRonda === (ordenCorrecto.length * 100)) {
        let rubis = 5;
        document.getElementById("rubis").innerHTML = `+${rubis}`;
    }

    // Mostrar modal con resultados
    const modal = new bootstrap.Modal(document.getElementById("tablapuntuacionsolo"));
    modal.show();

    // Manejar el cierre del modal para la siguiente ronda
    document.getElementById('tablapuntuacionsolo').addEventListener('hidden.bs.modal', () => {
        if (rondaActual < 3) {
            rondaActual++;
            librosEnRondaActual++; // Añadir un libro más para la siguiente ronda
            iniciarRonda();
        } else {
            // Juego completado
            mostrarResultadosFinales();
        }
    }, { once: true });
});

// Función para mostrar resultados finales
function mostrarResultadosFinales() {
    const modalFinal = document.createElement('div');
    modalFinal.className = 'modal fade';
    modalFinal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">¡Juego Completado!</h5>
                </div>
                <div class="modal-body">
                    <p>Puntaje Final: ${puntajeTotal}</p>
                    <button class="btn btn-primary" onclick="reiniciarJuego()">Jugar de Nuevo</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalFinal);
    new bootstrap.Modal(modalFinal).show();
}

// Función para reiniciar el juego completo
function reiniciarJuego() {
    rondaActual = 1;
    librosEnRondaActual = 6;
    puntajeTotal = 0;
    iniciarRonda();
}

// Iniciar el juego cuando se carga la página
window.addEventListener("DOMContentLoaded", () => {
    // Crear elemento para mostrar la ronda actual
    const rondaDisplay = document.createElement('div');
    rondaDisplay.id = 'ronda-actual';
    rondaDisplay.className = 'text-center mb-3';
    document.querySelector('#lista').parentNode.insertBefore(rondaDisplay, document.querySelector('#lista'));
    
    // Iniciar primera ronda
    iniciarRonda();
});