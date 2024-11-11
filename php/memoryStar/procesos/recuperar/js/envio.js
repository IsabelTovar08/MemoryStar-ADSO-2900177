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
            mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> El correo electrónico no puede estar vacío.`;
            return;
        }
        if (!validarEmail(correo)) {
            mensajeDiv.style.display = 'block';
            mensajeDiv.style.color = 'red';
            mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> El correo electrónico proporcionado no es válido.`;
        } else {
            // Mostrar mensaje de carga
            mensajeDiv.style.display = 'block';
            mensajeDiv.style.color = 'blue';
            mensajeDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Procesando...`;

            const datos = {
                emailRecuperar: correo
            };

            // Enviar los datos como JSON
            fetch('../recuperar/proceso/email/email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
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
                        mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message}`;
                        document.getElementById('confirma_email').value = datos.emailRecuperar;
                        goToStep(2);

                        validar_codigo.addEventListener('submit', function (event) {
                            event.preventDefault();

                            // Mostrar mensaje de carga al validar el código
                            mensajeDiv.style.display = 'block';
                            mensajeDiv.style.color = 'blue';
                            mensajeDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Validando código...`;

                            const codigo = document.getElementById('codigo').value.trim();
                            const code = { codigo: codigo };

                            fetch('../recuperar/proceso/email/validarCodigo.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(code),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    if (data.status === 'success') {
                                        console.log('Siguiente paso completado');
                                        mensajeDiv.style.display = 'block';
                                        mensajeDiv.style.color = 'green';
                                        mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message}`;
                                        user = data.user;
                                        goToStep(3);

                                        cambiar_contrasena.addEventListener('submit', function (event) {
                                            event.preventDefault();

                                            // Mostrar mensaje de carga al actualizar la contraseña
                                            mensajeDiv.style.display = 'block';
                                            mensajeDiv.style.color = 'blue';
                                            mensajeDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Actualizando contraseña...`;

                                            if (validarContrasena()) {
                                                const newPassword = document.getElementById('new_password').value.trim();
                                                const nueva = { contrasena: newPassword, usuario: user };

                                                // Enviar nueva contraseña al servidor
                                                fetch('../recuperar/proceso/email/nueva.php', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(nueva),
                                                })
                                                    .then(response => {
                                                        if (!response.ok) {
                                                            return response.text().then(text => {
                                                                throw new Error(`Error del servidor: ${text}`);
                                                            });
                                                        }
                                                        return response.json();
                                                    })
                                                    .then(data => {
                                                        if (data.status === 'success') {
                                                            mensajeDiv.style.display = 'block';
                                                            mensajeDiv.style.color = 'green';
                                                            mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message}`;
                                                            goToStep(4);
                                                        } else {
                                                            mensajeDiv.style.display = 'block';
                                                            mensajeDiv.style.color = 'red';
                                                            mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${data.message}` || 'Error al actualizar la contraseña';
                                                        }
                                                    })
                                                    .catch(error => {
                                                        console.error('Error completo:', error);
                                                        mensajeDiv.style.display = 'block';
                                                        mensajeDiv.style.color = 'red';
                                                        mensajeDiv.textContent = 'Error en la comunicación con el servidor';
                                                    });
                                            }
                                        });
                                    } else {
                                        mensajeDiv.style.color = 'red';
                                        mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${data.message}`;
                                        mensajeDiv.style.display = 'block';
                                    }
                                })
                                .catch(error => {
                                    console.error('Hubo un error en el siguiente paso:', error);
                                });
                        });

                    } else {
                        mensajeDiv.style.color = 'red';
                        mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${data.message}`;
                    }
                })
                .catch(error => {
                    mensajeDiv.style.display = 'block';
                    mensajeDiv.style.color = 'red';
                    mensajeDiv.textContent = 'Hubo un problema con la solicitud. Inténtalo de nuevo.';
                    console.error('Error:', error);
                });
        }
    });
});

function goToStep(stepNumber) {
    document.querySelectorAll(".modal-step").forEach(step => {
        step.classList.remove("active");
    });

    const stepElement = document.getElementById(`step${stepNumber}`);
    stepElement.classList.add("active");
}
function validarContrasena() {
    const newPassword = document.getElementById('new_password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    // const passwordError = document.getElementById('passwordError');
    const mensajeDiv = document.getElementById('emailError');


    // Validación de longitud y espacios en blanco
    if (newPassword.length < 8 || /\s/.test(newPassword)) {
        mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> La contraseña debe tener al menos 8 caracteres y no contener espacios.`;
        mensajeDiv.style.display = 'block';
        return false;
    }

    // Verificación de coincidencia
    if (newPassword !== confirmPassword) {
        mensajeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Las contraseñas no coinciden.`;
        mensajeDiv.style.display = 'block';
        return false;
    }

    // Ocultar el mensaje de error si las contraseñas son válidas
    mensajeDiv.style.display = 'none';
    return true;
}
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}