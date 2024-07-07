

/**
 * script que cambia foto en el perfil 
 * Autor: Mauricio noscue 
 * Fecha: 07/07/2024
 * 
 * Estado: Sin completar 
 * 
 */




document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.getElementById('profileImage');
            profileImage.src = e.target.result;
            profileImage.style.display = 'block';
            document.getElementById('removePhotoButton').style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('removePhotoButton').addEventListener('click', function() {
    const profileImage = document.getElementById('profileImage');
    profileImage.src = '#';
    profileImage.style.display = 'none';
    this.style.display = 'none';
    document.getElementById('fileInput').value = ''; // Reset file input
});
