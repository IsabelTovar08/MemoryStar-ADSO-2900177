    // Logo login
    const imagen = document.getElementById('imagen');
    let subir = true;
    setInterval(() => {
        if (subir) {
            imagen.style.transform = 'translateY(-8px)';
        } else {
            imagen.style.transform = 'translateY(0)';
        }
        subir = !subir;
    }, 1000);