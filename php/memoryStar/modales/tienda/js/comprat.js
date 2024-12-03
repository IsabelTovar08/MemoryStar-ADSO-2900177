let userDiamonds = null;
let userId = null;
let items = [];
let unlockedItems = JSON.parse(localStorage.getItem('unlockedItems')) || [];
async function obtenerUsuarioYDiamantes() {
    const response = await fetch('procesos/diamantePersona/Verdiamantes.php');
    const data = await response.json();
    if (data.success) {
        userId = data.id_usuario;
        userDiamonds = data.diamantes;
        actualizarDiamantes();
        obtenerFotoPerfil(userId);
        loadItems();
        obtenerDatos(userId);
    }
}
function obtenerFotoPerfil(idUsuario) {
    fetch('procesos/productoComprados/ponerFoto.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario: idUsuario })
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                let urlFoto = data.urlfotoperfil.replace(/\\/, '/');
                const container = document.getElementById('ponerFoto');
                if (container) {
                    container.innerHTML = `<img src="${urlFoto}" alt="foto de perfil">`;
                }
            }
        });
}
async function loadItems() {
    const response = await fetch('procesos/tienda/tienda.php');
    const data = await response.json();
    items = data;
    renderItems();
}
function renderItems() {
    const storeContainer = document.querySelector(".store-items");
    storeContainer.innerHTML = "";
    items.forEach(item => {
        if (item.disponible) {
            const itemElement = `
                <div class="col-4 contenedor-perfiles-usuario">
                    <img src="${item.url_producto}" alt="${item.id_tienda}" class="imgTienda btn">
                    <div>
                        <div class="number-item">
                            <span class="number">
                                <div>${item.precio_producto}</div>
                                <div class="diamond"></div>
                            </span>
                        </div>
                        <button class="btn btn-primary bottones-compras" data-id="${item.id_tienda}" data-precio="${item.precio_producto}">Comprar</button>
                    </div>
                </div>
            `;
            storeContainer.innerHTML += itemElement;
        }
    });
    assignPurchaseEvents();
}
function assignPurchaseEvents() {
    const buttons = document.querySelectorAll(".bottones-compras");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-id");
            const itemPrice = parseInt(button.getAttribute("data-precio"));
            handlePurchase(itemId, itemPrice, button);
        });
    });
}
async function handlePurchase(itemId, itemPrice, button) {
    if (userDiamonds >= itemPrice) {
        button.disabled = true;
        userDiamonds -= itemPrice;
        actualizarDiamantes();
        await registrarCompra(itemId, userId);
        if (!unlockedItems.includes(itemId)) {
            unlockedItems.push(itemId);
            localStorage.setItem('unlockedItems', JSON.stringify(unlockedItems));
        }
        await actualizarDiamantesServidor(userDiamonds, userId);
        await loadItems();
        obtenerDatos(userId); 
    }
}
async function registrarCompra(itemId, id_usuario) {
    const requestBody = { id_usuario, id_tienda: itemId };
    await fetch('procesos/productoComprados/producto.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    });
}
function actualizarDiamantes() {
    const diamantesElemento = document.getElementById("diamond-count");
    if (diamantesElemento) {
        diamantesElemento.textContent = `Diamantes: ${userDiamonds}`;
    }
}
async function actualizarDiamantesServidor(userDiamonds, userId) {
    await fetch('procesos/diamantePersona/ActulizarDiamantes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario: userId, diamantes: userDiamonds }),
    });
}
async function obtenerDatos(idUsuario) {
    const response = await fetch('procesos/productoComprados/consulta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario: idUsuario }),
    });
    const data = await response.json();
    if (data.success) {
        const container = document.querySelector('.productourls-table-contenedor');
        container.innerHTML = '';
        data.data.forEach(producto => {
            container.innerHTML += `
                <div class="perfil_usuario" data-id="${producto.id_producto}">
                    <img src="${producto.url_producto}" alt="Producto">
                </div>
            `;
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    obtenerUsuarioYDiamantes();
});
