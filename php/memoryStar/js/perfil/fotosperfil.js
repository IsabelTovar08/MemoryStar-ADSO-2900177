// Función para cargar y renderizar los ítems de perfil desde el JSON
function renderProfileItems() {
  fetch('js/perfil/jsontienda/perfil_items.json')
    .then(response => response.json())
    .then(profileItems => {
      const modalContainer = document.querySelector(".modal-profile-items");
      modalContainer.innerHTML = ""; 

      profileItems.forEach(item => {
        const isUnlocked = unlockedItems.includes(item.id);
        const buttonClass = isUnlocked ? "buy-btn2" : "buy-btn2 disabled";
        const buttonStyle = isUnlocked ? "" : "style='background-color: gray;'";

        const profileElement = `
          <div class="col-4 row">
            <img src="${item.image}" alt="${item.id}" class="imgTienda3">
            <button class="${buttonClass}" data-image="${item.image}" ${buttonStyle}>Equipar</button>
          </div>
        `;
        modalContainer.innerHTML += profileElement;
      });

      // Llamar a la función para asignar eventos de equipar
      assignProfileSelectionEvents();
    })
    .catch(error => {
      console.error("Error al cargar los ítems de perfil:", error);
    });
}

// Función para asignar eventos de equipar a los botones
function assignProfileSelectionEvents() {
  const buttons = document.querySelectorAll('.buy-btn2');

  buttons.forEach(button => {
    if (!button.classList.contains('disabled')) {
      button.addEventListener('click', (event) => {
        const newProfileImageSrc = event.target.getAttribute('data-image');
        const profileImageElement = document.getElementById('profileImage2');
        profileImageElement.src = newProfileImageSrc;

        console.log("Perfil equipado con la imagen:", newProfileImageSrc);
      });
    }
  });
}

// Cargar y renderizar los ítems de perfil al cargar la página
document.addEventListener("DOMContentLoaded", renderProfileItems);


