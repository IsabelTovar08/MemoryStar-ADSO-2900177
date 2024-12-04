document.addEventListener("DOMContentLoaded", function () {
  function validarLogin() {
    let nombreUsuario = document.getElementById("username").value;
    let passwordUsuario = document.getElementById("password").value;

    const datosLogin = {
      usuario: nombreUsuario,
      clave: passwordUsuario,
    };

     fetch("server/recibirConfiguracion.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosLogin),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        if (data.success) {
          window.location.href = data.redireccion;
        } else {
          alert("Error en el servidor: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
      });
  }
});
