// cargarAudios.js
export function cargarAudios() {
    return fetch('sonidos/sonidos.json')
        .then(response => response.json())
        .then(data => {
            const audios = {};
            data.audios.forEach(audio => {
                const audioHtml = document.createElement('audio');
                audioHtml.id = audio.id;
                audioHtml.loop = audio.loop;

                const sourceHtml = document.createElement('source');
                sourceHtml.src = audio.src;
                sourceHtml.type = audio.type;

                audioHtml.appendChild(sourceHtml);
                document.body.appendChild(audioHtml);
                
                // Guardar el audio en el objeto audios
                audios[audio.id] = audioHtml;
            });
            return audios; // Devuelve el objeto con los audios cargados
        })
        .catch(error => console.error('Error al cargar los audios:', error));
}
