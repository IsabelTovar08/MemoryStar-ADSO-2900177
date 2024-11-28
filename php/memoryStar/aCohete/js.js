const div = document.createElement('div')
        div.classList.add('color')

        const cuerpo = document.querySelector('body')
        setTimeout(() => {

            cuerpo.appendChild(div)
        }, 4500)

        // estrellas

        const opacidad = ["#fff1", "#fff2", "#fff3", "#fff4", "#fff5", "#fff6", "#fff7", "#fff8", "#fff9", "#fffa", "#fffb", "#fffc", "#fffd", "#fffe", "#ffff"]
        const generadorEstrellas = (tamaño, selector, cantidad, duracion) => {
            const cordenadas = [];
            const totalEstrellas = 200;
            for (let i = 0; i < cantidad; i++) {
                const x = Math.floor(Math.random() * 100);
                const y = Math.floor(Math.random() * 100);
                let numero = Math.floor(Math.random() * opacidad.length)
                cordenadas.push(`${x}vw ${y}vh 0 ${opacidad[numero]},${x}vw ${y + 100}vh 0 ${opacidad[numero]}`);
            }
            const container = document.querySelector(selector);
            container.style.setProperty("--capaEspacio", cordenadas.join(","));
            container.style.setProperty("--side", tamaño);
            container.style.setProperty("--duracion", duracion)
        }
        generadorEstrellas('1px', ".estrella-1", 300, "10s")
        generadorEstrellas('2px', ".estrella-2", 200, "15s")
        generadorEstrellas('3px', ".estrella-3", 100, "20s")

       