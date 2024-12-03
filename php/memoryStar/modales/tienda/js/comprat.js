let userDiamonds = null;
let userId = null;
let items = [];
let unlockedItems = JSON.parse(localStorage.getItem('unlockedItems')) || [];
async function obtenerUsuarioYDiamantes() {
  try {
    const response = await fetch('procesos/diamantePersona/Verdiamantes.php');
    const data = await response.json();
    if (data.success) {
      userId = data.id_usuario;
      userDiamonds = data.diamantes;
      actualizarDiamantes();
      obtenerFotoPerfil(userId);
      loadItems();
      obtenerDatos(userId);
    } else {
      console.error('Error al obtener datos del usuario:', data.message || 'Datos no válidos.');
    }
  } catch (error) {
    console.error('Error en la solicitud de usuario y diamantes:', error);
  }
}
function obtenerFotoPerfil(idUsuario) {
  fetch('procesos/productoComprados/ponerFoto.php', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ idUsuario: idUsuario })  
  })
    .then(response => response.json())  
    .then(data => {
      try {
        if (data.success) {
          let urlFoto = data.urlfotoperfil.replace(/\\/, '/');  
          const container = document.getElementById('ponerFoto');
          if (container) {
            container.innerHTML = `
            <img src="${urlFoto}" alt="foto de perfil" >
            `;
          } else {
            console.error('No se encontró el contenedor con la clase .fotoPerfil');
          }
        } else {
          console.error('Error en la respuesta:', data.message);
        }
      } catch (error) {
        console.error('Error al parsear la respuesta JSON:', error);
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}
async function loadItems() {
  try {
    const response = await fetch('procesos/tienda/tienda.php');
    const data = await response.json();
    items = data;
    renderItems();
  } catch (error) {
    console.error("Error al cargar los ítems:", error);
  }
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
    registrarCompra(itemId, userId);

    if (!unlockedItems.includes(itemId)) {
      unlockedItems.push(itemId);
      localStorage.setItem('unlockedItems', JSON.stringify(unlockedItems));
    }
    await actualizarDiamantesServidor(userDiamonds, userId);
    loadItems();
  } else {
    console.log('No tienes suficientes diamantes para realizar esta compra.');
  }
}
async function registrarCompra(itemId, id_usuario) {
  const requestBody = { id_usuario, id_tienda: itemId };
  try {
    const response = await fetch('procesos/productoComprados/producto.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (data.success) {
      console.log('Compra registrada correctamente.');
    } else {
      console.error('Error al registrar la compra:', data);
    }
  } catch (error) {
    console.error('Error en la solicitud de compra:', error);
  }
}
function actualizarDiamantes() {
  const diamantesElemento = document.getElementById("diamond-count");
  if (diamantesElemento) {
    diamantesElemento.textContent = `Diamantes: ${userDiamonds}`;
  }
}
async function actualizarDiamantesServidor(userDiamonds, userId) {
  try {
    const response = await fetch('procesos/diamantePersona/ActulizarDiamantes.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_usuario: userId, diamantes: userDiamonds }),
    });
    const data = await response.json();
    if (data.success) {
      console.log('Diamantes actualizados en el servidor:', data.diamantes);
    } else {
      console.error('Error al actualizar los diamantes:', data.error);
    }
  } catch (error) {
    console.error('Error en la solicitud de actualización de diamantes:', error);
  }
}
async function obtenerDatos(idUsuario) {
  try {
    const response = await fetch('procesos/productoComprados/consulta.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      agregarEventos();
    } else {
      console.error('No se encontraron datos:', data.message);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}
function agregarEventos() {
  const perfilesUsuarios = document.querySelectorAll('.perfil_usuario');
  perfilesUsuarios.forEach(perfil => {
    perfil.addEventListener('click', () => {
      const imgElement = perfil.querySelector('img');
      const urlProducto = imgElement ? imgElement.getAttribute('src') : null;
      fetch('procesos/productoComprados/guardarProductoUsuario.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario: userId, urlProducto })
      })
        .then(response => response.text())
        .then(data => {
          console.log('Respuesta del servidor:', data);
          obtenerFotoPerfil(userId);
        })
        .catch(error => console.error('Error en la solicitud:', error));
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  obtenerUsuarioYDiamantes();
});