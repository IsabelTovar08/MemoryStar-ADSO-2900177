



const lista = document.getElementById("lista1");
Sortable.create(lista,{
    animation :250,
    store: {
        set: (sortable) => {
          let ordenActual = sortable.toArray();
          console.log(ordenActual);
        },
    },
})