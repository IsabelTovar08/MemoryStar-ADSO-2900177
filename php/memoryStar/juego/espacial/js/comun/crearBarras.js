export class UIElementsBarras {
    constructor(scene) {
        this.scene = scene;
        this.createOxygenProgress();
        this.createTimer();
        this.createPoints();
        this.createDiamonds();
    }

    createOxygenProgress() {
        let oxigenoProgressX = window.innerWidth < 900 ? 9 : 15;
        let oxigenoProgressY = 10;
        let oxigenoProgressWidth = window.innerWidth < 900 ? 175 : 270;
        let oxigenoProgressHeight = window.innerWidth < 900 ? 38 : 50;
        let oxigenoProgressCornerRadius = window.innerWidth < 900 ? 3 : 5;

        let graphicsOxigenoProgress = this.scene.add.graphics()
            .fillStyle(0xffc5c5, 0.5)
            .fillRect(oxigenoProgressX, oxigenoProgressY, oxigenoProgressWidth, oxigenoProgressHeight)
            .setScrollFactor(0);
        
        let maskGraphicsOxigenoProgress = this.scene.make.graphics()
            .fillStyle(0xffffff)
            .fillRoundedRect(oxigenoProgressX, oxigenoProgressY, oxigenoProgressWidth, oxigenoProgressHeight, oxigenoProgressCornerRadius)
            .setScrollFactor(0);
        
        graphicsOxigenoProgress.setMask(maskGraphicsOxigenoProgress.createGeometryMask());

        // Imagen Oxígeno en la barra de progreso
        this.scene.oxigen = this.scene.add.image(28, 13, 'oxigeRecort')
            .setScale(window.innerWidth < 900 ? 0.062 : 0.09)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setPosition(window.innerWidth < 900 ? 19 : 28, 13);
    }

    createTimer() {
        let temporizadorX = window.innerWidth < 900 ? 310 : 550;
        let temporizadorY = 10;
        let temporizadorWidth = window.innerWidth < 900 ? 175 : 270;
        let temporizadorHeight = window.innerWidth < 900 ? 38 : 50;
        let temporizadorCornerRadius = window.innerWidth < 900 ? 3 : 5;

        let graphicsTemporizador = this.scene.add.graphics()
            .fillStyle(0xffc5c5, 0.5)
            .fillRect(temporizadorX, temporizadorY, temporizadorWidth, temporizadorHeight)
            .setScrollFactor(0);
        
        let maskGraphicsTemporizador = this.scene.make.graphics()
            .fillStyle(0xffffff)
            .fillRoundedRect(temporizadorX, temporizadorY, temporizadorWidth, temporizadorHeight, temporizadorCornerRadius)
            .setScrollFactor(0);
        
        graphicsTemporizador.setMask(maskGraphicsTemporizador.createGeometryMask());

        // Imagen para el temporizador
        this.scene.timerImage = this.scene.add.image(580, 13, 'temporizador')
            .setScale(window.innerWidth < 900 ? 0.062 : 0.09)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setPosition(window.innerWidth < 900 ? 325 : 580, 13);
    }

    createPoints() {
        let puntosX = window.innerWidth < 900 ? this.scene.scale.width - 250 : this.scene.scale.width - 350;
        let puntosY = 10;
        let puntosWidth = window.innerWidth < 900 ? 100 : 150;
        let puntosHeight = window.innerWidth < 900 ? 38 : 50;
        let puntosCornerRadius = window.innerWidth < 900 ? 3 : 5;

        let graphicspuntos = this.scene.add.graphics()
            .fillStyle(0xffc5c5, 0.5)
            .fillRect(puntosX, puntosY, puntosWidth, puntosHeight)
            .setScrollFactor(0);
        
        let maskGraphicsPuntos = this.scene.make.graphics()
            .fillStyle(0xffffff)
            .fillRoundedRect(puntosX, puntosY, puntosWidth, puntosHeight, puntosCornerRadius)
            .setScrollFactor(0);
        
        graphicspuntos.setMask(maskGraphicsPuntos.createGeometryMask());

        // Imagen para los puntos/estrellas
        this.scene.pointsImage = this.scene.add.image(this.scene.scale.width - 340, 13, 'estrellaPuntos')
            .setScale(window.innerWidth < 900 ? 0.062 : 0.09)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setPosition(window.innerWidth < 900 ? this.scene.scale.width - 240 : this.scene.scale.width - 340, 13);
    }

    createDiamonds() {
        let diamantesX = window.innerWidth < 900 ? this.scene.scale.width - 115 : this.scene.scale.width - 170;
        let diamantesY = 10;
        let diamantesWidth = window.innerWidth < 900 ? 100 : 150;
        let diamantesHeight = window.innerWidth < 900 ? 38 : 50;
        let diamantesCornerRadius = window.innerWidth < 900 ? 3 : 5;

        let graphicsDiamantes = this.scene.add.graphics()
            .fillStyle(0xffc5c5, 0.5)
            .fillRect(diamantesX, diamantesY, diamantesWidth, diamantesHeight)
            .setScrollFactor(0);
        
        let maskGraphicsDiamantes = this.scene.make.graphics()
            .fillStyle(0xffffff)
            .fillRoundedRect(diamantesX, diamantesY, diamantesWidth, diamantesHeight, diamantesCornerRadius)
            .setScrollFactor(0);
        
        graphicsDiamantes.setMask(maskGraphicsDiamantes.createGeometryMask());

        // Imagen para los diamantes
        this.scene.diamondsImage = this.scene.add.image(this.scene.scale.width - 160, 13, 'diamante')
            .setScale(window.innerWidth < 900 ? 0.062 : 0.09)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setPosition(window.innerWidth < 900 ? this.scene.scale.width - 110 : this.scene.scale.width - 160, 13);
    }
}