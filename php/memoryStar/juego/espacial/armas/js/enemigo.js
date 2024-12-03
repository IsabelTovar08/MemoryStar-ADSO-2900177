function redirigir(){
  setTimeout(() => {
    window.location.href=("../../../index.html")
  }, 2000);
}

function mostrarTabla2() {
  const modalFinal2 = document.createElement("div");
  modalFinal2.className = "modal fade";
  modalFinal2.id = "modalFinal2";
  modalFinal2.setAttribute("tabindex", "-1");
  modalFinal2.setAttribute("aria-labelledby", "modalFinal2Label");
  modalFinal2.setAttribute("aria-hidden", "true");
  modalFinal2.setAttribute("data-bs-backdrop", "static");
  modalFinal2.setAttribute("data-bs-keyboard", "false");

  modalFinal2.innerHTML = `
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content contenedorTsolo">
        <div class="tituloTsolo">¡Juego Completado!</div>
        <div class="contenedorTsoloInterior">
          <div class="contenedor-estrellas">
            <img src="modales/modales/img/tablas/Star.png" class="star" alt="">
            <img src="modales/modales/img/tablas/Star.png" class="star" alt="">
            <img src="modales/modales/img/tablas/Star.png" class="star" alt="">
          </div>
          <div class="puntaje-total">
            ${puntuacion}
          </div>

          <div class="contenedor-puntaje">
            Tiempo:
            ${contador}s
          </div>
          <div class="contenedor-rubi">
            <div>${rubis}</div>
            <img src="modales/modales/img/tablas/rubipuntaje.png"
                style="width: 4vh; height: auto;">
          </div>

          <div class="col-12 row contenedor-info">
            <div class="col-6 usuarioPerfill">
              <img src="modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
            </div>
            <div class="col-3">${contador}s</div>
            <div class="col-3">${puntuacion}pts</div>
          </div>
        </div>

        <div class="contenedor-botonTsolo">
          <button class="botonTsolo" onclick="redirigir()">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalFinal2);

  // Agregamos el evento después de insertar el modal
  modalFinal2.addEventListener(
    "hidden.bs.modal",
    () => {
      mostrarTabla2();
    },
    { once: true }
  );

  new bootstrap.Modal(modalFinal2, { backdrop: "static" }).show();
}



document.addEventListener("DOMContentLoaded", () => {




    // variables globales
    const images = document.querySelectorAll(".sep");
    const container = document.getElementById("imagenes");
    let tiempo = document.getElementById("tiempo");
    let duracion = 15;
    let contador = 0;
    let rubis = 0;
    let puntuacion = 0;
    let total_tiempo = 0;
    let tiempoTranscurrido = 0; // Nueva variable para controlar el tiempo transcurrido
    let intervaloDeTiempo;
    const audioVictory = new Audio('../../../sonidos/juego/victoria1.mp3');
    const audioLoser = new Audio('../../../sonidos/juego/perder1.mp3')
    
    // Iniciamos el temporizador y guardamos la referencia del intervalo
    intervaloDeTiempo = tempo(duracion, tiempo);

    let correct;
    fetch("php/almacenar_enemigo.php")
      .then((response) => response.json())
      .then((data) => {
        correct = data.boss || [];
        console.log("boss:", correct);
      });
  
    let speed = 0;
    const placedPositions = [];
  
    images.forEach((img) => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const imgWidth = img.clientWidth;
      const imgHeight = img.clientHeight;
  
      if (container.offsetHeight < 500) {
        speed = 1;
      } else {
        speed = 2;
      }
      let isOverlapping;
      let randomX, randomY;
  
      do {
        isOverlapping = false;
        randomX = Math.floor(Math.random() * (containerWidth - imgWidth));
        randomY = Math.floor(Math.random() * (containerHeight - imgHeight));
  
        for (const position of placedPositions) {
          const [x, y, width, height] = position;
  
          if (
            randomX < x + width &&
            randomX + imgWidth > x &&
            randomY < y + height &&
            randomY + imgHeight > y
          ) {
            isOverlapping = true;
            break;
          }
        }
      } while (isOverlapping);
  
      placedPositions.push([randomX, randomY, imgWidth, imgHeight]);
  
      img.style.left = `${randomX}px`;
      img.style.top = `${randomY}px`;
  
      img.dx = Math.random() < 0.5 ? speed : -speed;
      img.dy = Math.random() < 0.5 ? speed : -speed;
  
      img.addEventListener("click", () => {
        if (img.id == correct) {
          console.log("correcto");
          img.classList.add("bien");
          img.classList.remove("mal");
          
          // Detenemos el temporizador y calculamos recompensas
          clearInterval(intervaloDeTiempo);
          calcularRecompensas();
          
          // Mostramos el modal de finalización
          mostrarTabla();
        } else {
          console.log(`La imagen tiene un id diferente: ${img.id}`);
          img.classList.remove("bien");
          img.classList.add("mal");
  
          setTimeout(() => {
            img.classList.remove("mal");
          }, 500);
        }
      });
    });

    // Nueva función para calcular recompensas según el tiempo
    function calcularRecompensas() {
        tiempoTranscurrido = 15 - parseInt(tiempo.textContent.trim().split(':')[1]);
        
        if (tiempoTranscurrido >= 0 && tiempoTranscurrido <= 5) {
            puntuacion = 200;
            rubis = 1;
        } else if (tiempoTranscurrido >= 6 && tiempoTranscurrido <= 10) {
            puntuacion = 150;
            rubis = 0;
        } else if (tiempoTranscurrido >= 11 && tiempoTranscurrido <= 14) {
            puntuacion = 100;
            rubis = 0;
        } else {
            puntuacion = 0;
            rubis = 0;
        }
        
        contador = tiempoTranscurrido; // Actualizamos el contador para mostrar el tiempo que tardó
    }
  
    function checkCollision(img1, img2) {
      const rect1 = img1.getBoundingClientRect();
      const rect2 = img2.getBoundingClientRect();
  
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    }
  
    function moveImages() {
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
  
        if (rect.left <= 0 || rect.right >= window.innerWidth) img.dx *= -1;
        if (rect.top <= 0 || rect.bottom >= window.innerHeight) img.dy *= -1;
  
        img.style.left = rect.left + img.dx + "px";
        img.style.top = rect.top + img.dy + "px";
  
        images.forEach((otherImg) => {
          if (img !== otherImg && checkCollision(img, otherImg)) {
            img.dx *= -1;
            img.dy *= -1;
            otherImg.dx *= -1;
            otherImg.dy *= -1;
          }
        });
      });
  
      requestAnimationFrame(moveImages);
    }
  
    moveImages();
  
    function tempo(pduracion, elemento) {
      let duracion = pduracion;
      const intervalo = setInterval(() => {
        elemento.innerHTML = ` 00:${duracion < 10 ? "0" : ""}${duracion}`;
        duracion--;
        if (duracion <= 0) {
          clearInterval(intervalo);
          elemento.innerHTML = `¡Tiempo!`;
          puntuacion = 0;
          rubis = 0;
          contador = 15;

          var perdistee = new bootstrap.Modal(document.getElementById("perdioo"));
          perdistee.show();
          // Intentar reproducir el sonido
          audioLoser.play().catch((error) => {
            console.error("Error al reproducir audio:", error);
          });
          let perdio = document.getElementById('perdiste')
          perdio.addEventListener("click", () => {
            window.location.href = "../../../index.html";
          });
        }
      }, 1000);
      return intervalo;
    }
  
    function mostrarTabla() {
      const modalFinal = document.createElement("div");
      modalFinal.className = "modal fade";
      modalFinal.id = "modalFinal";
      modalFinal.setAttribute("tabindex", "-1");
      modalFinal.setAttribute("aria-labelledby", "modalFinalLabel");
      modalFinal.setAttribute("aria-hidden", "true");
      modalFinal.setAttribute("data-bs-backdrop", "static");
      modalFinal.setAttribute("data-bs-keyboard", "false");
  
      modalFinal.innerHTML = `
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content contenedorTsolo">
              <div class="tituloTsolo">¡Juego Completado!</div>
              <div class="contenedorTsoloInterior">
              <div class="contenedor-estrellas">
                            <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                            <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                            <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                        </div>
                  <div class="puntaje-total">
                      ${puntuacion}
                  </div>
  
                  <div class="contenedor-puntaje">
                      Tiempo:
                      ${contador}s
                  </div>
                  <div class="contenedor-rubi">
                            <div>${rubis}</div>
                            <img src="../../../modales/modales/img/tablas/rubipuntaje.png"
                                style="width: 4vh; height: auto;">
                  </div>
  
                  <div class="col-12 row contenedor-info">
                      <div class="col-6 usuarioPerfill">
                          <img src="../../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                      </div>
                      <div class="col-3">${contador}s</div>
                      <div class="col-3">${puntuacion}pts</div>
                  </div>
              </div>
  
              <div class="contenedor-botonTsolo">
                  <button class="botonTsolo">
                      Salir
                  </button>
              </div>
          </div>
      </div>
      `;
  
      puntos(puntuacion, rubis, contador );
      document.body.appendChild(modalFinal);
      new bootstrap.Modal(modalFinal, { backdrop: "static" }).show();
    }

      function puntos(puntuacion, rubis, contador) {

          const datosJuego = {
            puntos:puntuacion ,
            diamantes: rubis,
           tiempo: contador,
            archivo: 3
        };
        
          fetch('../../../procesos/puntuacionmario/datos.php', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosJuego)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.mensaje);
            console.log('enviado uno armas 3 ')
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
            
        });
    
      }
});