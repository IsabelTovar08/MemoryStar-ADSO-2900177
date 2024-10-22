const btnVeri = document.getElementById('verificar');
const ordenCorrect = [1, 2, 3, 4];
let ordenActual;

const lista = document.getElementById("lista1");
Sortable.create(lista, {
    animation: 250,
    store: {
        set: (sortable) => {
            ordenActual = sortable.toArray();
            console.log(ordenActual);
        },
    },
});

let aciertos = 0;

// verificar
btnVeri.addEventListener("click", function () {
    aciertos = 0; 
    ordenActual = Sortable.get(lista).toArray(); 
    const cuadros = document.querySelectorAll('.cuadro'); 

    ordenActual.forEach((id, index) => {
        const cuadro = cuadros[index];
        cuadro.classList.remove('mal');
        if (parseInt(id) === ordenCorrect[index]) {
            aciertos += 1; 
        } else {
            cuadro.classList.add('mal');
        }
    });

    if (aciertos === ordenCorrect.length) {
        alert("¡Correcto! Has acertado en todas las posiciones.");
    } else {
        alert(`Has acertado en ${aciertos} de ${ordenCorrect.length} posiciones.`);
    }
});
