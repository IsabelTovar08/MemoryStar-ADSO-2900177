const userPuntos = document.querySelectorAll(".userPunto");

// Aplicar clases dinámicamente para podio
if (userPuntos[0]) userPuntos[0].classList.add("ganador"); // Primer lugar
if (userPuntos[1]) userPuntos[1].classList.add("segundo"); // Segundo lugar
if (userPuntos[2]) userPuntos[2].classList.add("tercero"); // Tercer lugar

const fotor = document.querySelectorAll(".foto-user");

// Aplicar clases dinámicamente para podio
if (fotor[0]) fotor[0].classList.add("ganador1"); // Primer lugar
if (fotor[1]) fotor[1].classList.add("segundo1"); // Segundo lugar
if (fotor[2]) fotor[2].classList.add("tercero1"); // Tercer lugar