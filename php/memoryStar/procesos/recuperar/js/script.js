// document.addEventListener("DOMContentLoaded", () => {
//   const savedStep = localStorage.getItem("currentStep");
//   const savedEmail = localStorage.getItem("userEmail"); // Obtener el correo guardado

//   openModal(); // Abre el modal al cargar la página
  
//   if (savedEmail) {
//     document.getElementById("emailRecuperar").value = savedEmail; // Mostrar el correo guardado
//     document.getElementById("confirmEmailText").textContent = savedEmail; // Mostrar el correo en confirmación
//   }

//   if (savedStep) {
//     goToStep(savedStep.replace("step", "")); // Remueve "step" para obtener solo el número
//   } else {
//     goToStep(1); // Mostrar el primer paso por defecto
//   }
// });

// function validateEmail() {
//   const emailInput = document.getElementById("emailRecuperar");
//   const emailError = document.getElementById("emailError");
//   const existingEmails = ["example@example.com"]; // Simulación de emails existentes

//   emailError.style.display = "none";
//   emailInput.classList.remove("error", "success");

//   if (existingEmails.includes(emailInput.value)) {
//     emailInput.classList.add("success");
//     localStorage.setItem("userEmail", emailInput.value); // Guardar el correo en localStorage
//     goToStep(2);
//   } else {
//     emailError.style.display = "block";
//     emailInput.classList.add("error");
//   }
// }

// function validateCode() {
//   const codeInput = document.getElementById("code");
//   const codeError = document.getElementById("codeError");
//   const correctCode = "123456"; // Simulación de código correcto

//   codeError.style.display = "none";
//   codeInput.classList.remove("error", "success");

//   if (codeInput.value === correctCode) {
//     codeInput.classList.add("success");
//     goToStep(3);
//   } else {
//     codeError.style.display = "block";
//     codeInput.classList.add("error");
//   }
// }

// function goToConfirmEmailStep() {
//   const email = document.getElementById("emailRecuperar").value;
//   if (email === "") {
//     document.getElementById("emailError").textContent = "Por favor, introduce un correo.";
//     document.getElementById("emailError").style.display = "block";
//     return;
//   }
//   document.getElementById("emailError").style.display = "none";
//   document.getElementById("confirmEmailText").textContent = email;
//   localStorage.setItem("userEmail", email); // Guardar el correo en localStorage
//   goToStep("ConfirmEmail");
// }

// function confirmEmail() {
//   goToStep(2); // Ir al paso de validación de código si el correo fue confirmado
// }

// function goToStep(stepNumber) {
//   document.querySelectorAll(".modal-step").forEach(step => {
//     step.classList.remove("active");
//   });

//   const stepElement = document.getElementById(`step${stepNumber}`);
//   if (stepElement) {
//     stepElement.classList.add("active");
//     localStorage.setItem("currentStep", `step${stepNumber}`);
//   } else {
//     console.error(`No se encontró el elemento con el ID: step${stepNumber}`);
//   }

//   // Verificar si es el último paso para limpiar el localStorage
//   if (stepNumber == 4) {
//     closeModal(); // Llama a closeModal en el último paso
//   }
// }

// function validatePasswords() {
//   const newPassword = document.getElementById("newPassword");
//   const confirmPassword = document.getElementById("confirmPassword");
//   const passwordError = document.getElementById("passwordError");

//   passwordError.style.display = "none";
//   newPassword.classList.remove("error", "success");
//   confirmPassword.classList.remove("error", "success");

//   if (newPassword.value && newPassword.value === confirmPassword.value) {
//     newPassword.classList.add("success");
//     confirmPassword.classList.add("success");
//     goToStep(4); // Ir al último paso
//   } else {
//     passwordError.style.display = "block";
//     newPassword.classList.add("error");
//     confirmPassword.classList.add("error");
//   }
// }

// // Función para cerrar el modal y limpiar el progreso en localStorage sin recargar la página
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.remove("show");
  }
  localStorage.removeItem("currentStep"); // Limpiar el progreso en localStorage
  localStorage.removeItem("userEmail"); // Limpiar el correo 
  // resetModal(); // Llama a la función para restablecer el contenido
}

// function resetModal() {
//   // Reinicia el modal para que vuelva al primer paso sin depender del localStorage
//   goToStep(1);
// }

function openModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.add("show");
  }
}
