document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('buscar_email');
    const validar_codigo = document.getElementById('confirmar_codigo');
    const cambiar_contrasena = document.getElementById('nueva_contrasena');
    let user;

    const mensajeDiv = document.getElementById('emailError');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const correo = document.getElementById('emailRecuperar').value.trim();

        if (!correo) {
            mensajeDiv.style.display = 'block';
            mensajeDiv.style.color = 'red';
            mensajeDiv.textContent = 'El correo electrónico no puede estar vacío.';
            return;
        }

        // Crea un objeto con los datos
        const datos = {
            emailRecuperar: correo
        };

        // Enviar los datos como JSON
        fetch('../recuperar/proceso/email/email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Especifica que estás enviando JSON
            },
            body: JSON.stringify(datos), // Convierte el objeto a una cadena JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                mensajeDiv.style.display = 'block';

                if (data.status === 'success' && data.codigo_usuario_existe) {
                    mensajeDiv.style.color = 'green';
                    mensajeDiv.textContent = data.message;
                    document.getElementById('confirma_email').value = datos.emailRecuperar;
                    goToStep(2)
                    validar_codigo.addEventListener('submit', function (event) {
                        event.preventDefault();
                        const codigo = document.getElementById('codigo').value.trim();
                        const code = {
                            codigo: codigo
                        };
                        fetch('../recuperar/proceso/email/validarCodigo.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json', // Especifica que estás enviando JSON
                            },
                            body: JSON.stringify(code),
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'success') {
                                    console.log('Siguiente paso completado');
                                    mensajeDiv.style.color = 'green';
                                    mensajeDiv.textContent = data.message;
                                    user = data.user;
                                    goToStep(3)
                                    cambiar_contrasena.addEventListener('submit', function (event) {
                                        event.preventDefault();
                                        if (validarContrasena()) {
                                            const newPassword = document.getElementById('new_password').value.trim();
                                            const nueva = { contrasena: newPassword , usuario: user};
                                    
                                            // Agregar log para verificar qué se está enviando
                                            console.log('Enviando datos:', nueva);
                                    
                                            fetch('../recuperar/proceso/email/nueva.php', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(nueva),
                                            })
                                            .then(response => {
                                                // Agregar verificación de la respuesta
                                                console.log('Status:', response.status);
                                                // Si la respuesta no está ok, convertir a texto para ver el error
                                                if (!response.ok) {
                                                    return response.text().then(text => {
                                                        throw new Error(`Error del servidor: ${text}`);
                                                    });
                                                }
                                                return response.json();
                                            })
                                            .then(data => {
                                                console.log('Respuesta:', data);
                                                if (data.status === 'success') {
                                                    mensajeDiv.style.color = 'green';
                                                    mensajeDiv.textContent = data.message;
                                                    goToStep(4);
                                                } else {
                                                    mensajeDiv.style.color = 'red';
                                                    mensajeDiv.textContent = data.message || 'Error al actualizar la contraseña';
                                                }
                                            })
                                            .catch(error => {
                                                console.error('Error completo:', error);
                                                mensajeDiv.style.color = 'red';
                                                mensajeDiv.textContent = 'Error en la comunicación con el servidor';
                                            });
                                        }
                                    });
                                    // Aquí puedes hacer una acción adicional, como mostrar otro mensaje o redirigir al usuario.
                                } else {
                                    console.error('Error en el siguiente paso:', data.message);
                                    mensajeDiv.textContent = data.message;

                                }
                            })
                            .catch(error => {
                                console.error('Hubo un error en el siguiente paso:', error);
                            });
                    });

                    // formulario.style.display = 'none';
                } else {
                    mensajeDiv.style.color = 'red';
                    mensajeDiv.textContent = data.message;
                }
            })
            .catch(error => {
                mensajeDiv.style.display = 'block';
                mensajeDiv.style.color = 'red';
                mensajeDiv.textContent = 'Hubo un problema con la solicitud. Inténtalo de nuevo.';
                console.error('Error:', error);
            });
    });
});
function goToStep(stepNumber) {
    document.querySelectorAll(".modal-step").forEach(step => {
        step.classList.remove("active");
    });

    const stepElement = document.getElementById(`step${stepNumber}`);
    stepElement.classList.add("active");

    // if (stepElement) {
    //   stepElement.classList.add("active");
    //   localStorage.setItem("currentStep", `step${stepNumber}`);
    // } else {
    //   console.error(`No se encontró el elemento con el ID: step${stepNumber}`);
    // }

    // // Verificar si es el último paso para limpiar el localStorage
    // if (stepNumber == 4) {
    //   closeModal(); // Llama a closeModal en el último paso
    // }
}
function validarContrasena() {
    const newPassword = document.getElementById('new_password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const passwordError = document.getElementById('passwordError');

    // Validación de longitud y espacios en blanco
    if (newPassword.length < 8 || /\s/.test(newPassword)) {
        passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres y no contener espacios.';
        passwordError.style.display = 'block';
        return false;
    }

    // Verificación de coincidencia
    if (newPassword !== confirmPassword) {
        passwordError.textContent = 'Las contraseñas no coinciden.';
        passwordError.style.display = 'block';
        return false;
    }

    // Ocultar el mensaje de error si las contraseñas son válidas
    passwordError.style.display = 'none';
    return true;
}