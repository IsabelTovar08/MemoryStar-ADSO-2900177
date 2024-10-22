let userDiamonds = 500;
let selectedItem = "";
let items = [];
let unlockedItems = JSON.parse(localStorage.getItem('unlockedItems')) || [];

// Cargar el JSON de los ítems y renderizar la tienda
function loadItems() {
  fetch('jsontienda/items.json')
    .then(response => response.json())
    .then(data => {
      items = data;
      renderItems();
    })
    .catch(error => {
      console.error("Error al cargar los ítems:", error);
    });
}

// Función para mostrar los elementos de la tienda
function renderItems() {
  const storeContainer = document.querySelector(".store-items");
  storeContainer.innerHTML = ""; 

  items.forEach(item => {
    const itemElement = `
      <div class="col-4">
        <img src="${item.image}" alt="${item.id}" class="imgTienda btn">
        <div class="modal-body texto">
          <div class="number-item">
            <span class="number">${item.price}</span>
            <div class="diamond"></div>
          </div>
          ${item.description ? `<p class="text-po">${item.description}</p>` : ""}
          <button class="btn btn-primary" id="${item.id}">Comprar</button>
        </div>
      </div>
    `;
    storeContainer.innerHTML += itemElement;
  });

  assignPurchaseEvents();
}

// Función para mostrar el modal de confirmación de compra
function showConfirmModal(itemId) {
  selectedItem = itemId;
  const confirmModal = new bootstrap.Modal(document.getElementById('exampleModal-comprar1'));
  confirmModal.show();
}

// Función para actualizar los diamantes
function actualizarDiamantes(costoDiamantes) {
  let diamantesElemento = document.querySelector(".wooden-sign2 .number-item3 .number");
  let diamantesActuales = parseInt(diamantesElemento.textContent.replace("diamantes: ", ""));
  let nuevosDiamantes = diamantesActuales - costoDiamantes;
  diamantesElemento.textContent = "diamantes: " + nuevosDiamantes;
}

// Función para mostrar el mensaje de alerta personalizado
function showAlert(message) {
  const alertMessage = document.getElementById("alert-message");
  alertMessage.innerText = message;
  const customAlert = document.getElementById("custom-alert");
  customAlert.style.display = "block";

  document.getElementById("close-alert").onclick = function() {
    customAlert.style.display = "none";
  };
}

// Función para manejar la lógica de compra
function handlePurchase() {
  const selectedItemData = items.find(item => item.id === selectedItem);

  if (userDiamonds >= selectedItemData.price) {
    userDiamonds -= selectedItemData.price;
    showAlert(`¡Compra exitosa! Te quedan ${userDiamonds} diamantes.`);
    actualizarDiamantes(selectedItemData.price);

    // Desbloquear el ítem comprado
    unlockedItems.push(selectedItemData.id);
    localStorage.setItem('unlockedItems', JSON.stringify(unlockedItems));

    // Llamar a la función para actualizar la visualización de los ítems de perfil desbloqueados
    renderProfileItems();
  } else {
    showAlert('No tienes suficientes diamantes para realizar esta compra.');
  }

  const confirmModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-comprar1'));
  confirmModal.hide();
}

// Asignar eventos de compra a cada botón
function assignPurchaseEvents() {
  items.forEach(item => {
    const itemButton = document.getElementById(item.id);
    if (itemButton) {
      itemButton.addEventListener("click", () => showConfirmModal(item.id));
    }
  });

  document.getElementById("compra1").addEventListener("click", handlePurchase);
  document.getElementById("salir4").addEventListener("click", () => {
    selectedItem = "";
    const confirmModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-comprar1'));
    confirmModal.hide();
  });
}


// Cargar la tienda al cargar la página
document.addEventListener("DOMContentLoaded", loadItems);
