const niveles = [
    { filas: 3, columnas: 3, imagen: "2.jpeg" },
    { filas: 4, columnas: 4, imagen: "abi1.jpeg" },
    { filas: 5, columnas: 5, imagen: "abi2.jpeg" },
    { filas: 6, columnas: 6, imagen: "abi3.jpeg" },
    { filas: 6, columnas: 6, imagen: "abi4.jpeg" },
    { filas: 7, columnas: 7, imagen: "abi5.jpeg" },
    { filas: 7, columnas: 7, imagen: "abi6.jpeg" },
    { filas: 8, columnas: 8, imagen: "3.jpeg" },
    { filas: 8, columnas: 8, imagen: "abi7.jpeg" },
    { filas: 9, columnas: 9, imagen: "4.jpeg" },
    { filas: 9, columnas: 9, imagen: "abi8.jpeg" },
    { filas: 10, columnas: 10, imagen: "6.jpeg" }
];

let nivelActual = 0;
let piezas = [];

function crearRompecabezas() {
    const nivel = niveles[nivelActual];
    const { filas, columnas, imagen } = nivel;
    const totalPiezas = filas * columnas;

    const rompecabezas = document.getElementById("rompecabezas");
    rompecabezas.innerHTML = "";
    rompecabezas.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;
    rompecabezas.style.gridTemplateRows = `repeat(${filas}, 40px)`;

    let indices = [...Array(totalPiezas).keys()];
    indices = indices.sort(() => Math.random() - 0.5); // Desordenar

    piezas = [];
    indices.forEach((indice) => {
        let pieza = document.createElement("div");
        pieza.classList.add("pieza");
        pieza.style.width = "40px";
        pieza.style.height = "40px";
        pieza.style.backgroundImage = `url(${imagen})`;
        pieza.style.backgroundSize = `${columnas * 40}px ${filas * 40}px`;
        pieza.style.backgroundPosition = `-${(indice % columnas) * 40}px -${Math.floor(indice / columnas) * 40}px`;
        pieza.dataset.index = indice;
        pieza.draggable = true;
        pieza.addEventListener("dragstart", arrastrar);
        pieza.addEventListener("dragover", permitirSoltar);
        pieza.addEventListener("drop", soltar);
        piezas.push(pieza);
        rompecabezas.appendChild(pieza);
    });

    document.getElementById("nivel-texto").textContent = `Nivel ${nivelActual + 1}`;
    document.getElementById("mensaje").classList.add("oculto");
    document.getElementById("siguiente-nivel").classList.add("oculto");
}

// Drag and Drop (Arrastrar y soltar)
let piezaArrastrada = null;

function arrastrar(event) {
    piezaArrastrada = event.target;
}

function permitirSoltar(event) {
    event.preventDefault();
}

function soltar(event) {
    event.preventDefault();
    let piezaSoltada = event.target;

    // Intercambiar posiciones
    let tempIndex = piezaArrastrada.dataset.index;
    piezaArrastrada.dataset.index = piezaSoltada.dataset.index;
    piezaSoltada.dataset.index = tempIndex;

    // Intercambiar estilos de fondo
    let tempBg = piezaArrastrada.style.backgroundPosition;
    piezaArrastrada.style.backgroundPosition = piezaSoltada.style.backgroundPosition;
    piezaSoltada.style.backgroundPosition = tempBg;

    verificarOrden();
}

function verificarOrden() {
    if (piezas.every((pieza, i) => parseInt(pieza.dataset.index) === i)) {
        document.getElementById("mensaje").classList.remove("oculto");
        if (nivelActual < niveles.length - 1) {
            document.getElementById("siguiente-nivel").classList.remove("oculto");
        } else {
            document.getElementById("mensaje").textContent = "🎉 ¡Felicitaciones! Has completado todos los niveles. 💖";
        }
    }
}

function siguienteNivel() {
    nivelActual++;
    crearRompecabezas();
}

crearRompecabezas();