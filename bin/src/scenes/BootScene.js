// Parthenon/src/scenes/BootScene.js
import BootAnimationScene from './BootAnimationScene.js';

export default class BootScene {
    constructor({ input, sceneManager }) {
        this.input = input;
        this.sceneManager = sceneManager;
        this.gameFont = null;
        console.log("[BootScene] Construtor.");
    }

    enter(params) {
        console.log("[BootScene] Entrando na cena de Boot. Parametros:", params);
        // Carrega a fonte para esta cena.
        try {
            console.log("[BootScene] Carregando fonte...");
            this.gameFont = new Font("./assets/fonts/Pixellari.ttf");
            console.log("[BootScene] Fonte carregada com sucesso.");
        } catch (e) {
            console.error("[BootScene] Falha ao carregar a fonte 'Pixellari.ttf'. Erro:", e);
            this.gameFont = null;
        }
    }

    update() {
        // Ao pressionar START, carrega a BootAnimationScene
        if (this.input.isButtonPressed('start')) {
            console.log("[BootScene] Botao START pressionado! Carregando BootAnimationScene...");
            this.sceneManager.loadScene(BootAnimationScene);
        }
    }

    render() {
        if (this.gameFont) {
            this.gameFont.print(10, 10, "Parthenon Dashboard");
            this.gameFont.print(10, 30, "Pressione START");
        } else {
            // Fallback se a fonte não carregar.
            // A API de print global pode ou não existir, mas é uma tentativa.
            if (typeof print === 'function') {
                print("AthenaEnv Frontend - Fonte não carregada", 10, 10);
            }
        }
    }

    exit() {
        console.log("[BootScene] Saindo da cena de Boot.");
        // Descarregar recursos da cena, se necessário
        this.gameFont = null;
    }
}