// Parthenon/src/screens/BootScreen.js
import LogoRevealScreen from './BootStartScreen.js';
const data_screen = Screen.getMode();

export default class BootScreen {
    constructor({ input, screenManager }) {
        this.input = input;
        this.screenManager = screenManager;
        this.gameFont = null;
        console.log("[BootScreen] Construtor.");
    }

    enter(params) {
        console.log("[BootScreen] Entrando na cena de Boot. Parametros:", params);
        // Carrega a fonte para esta cena.
        try {
            console.log("[BootScreen] Carregando fonte...");
            this.gameFont = Fonts.REGULAR;
            this.gameFont.color = Colors.PRIMARY_COLOR;
            console.log("[BootScreen] Fonte carregada com sucesso.");
            Object.entries(data_screen).forEach(([key, value]) => {console.log(key, value);});
        } catch (e) {
            console.error("[BootScreen] Falha ao carregar a fonte 'SpaceGrotesk-Regular.ttf'. Erro:", e);
            this.gameFont = null;
        }
    }

    update() {
        // Ao pressionar START, carrega a LogoRevealScreen
        if (this.input.isButtonPressed('start')) {
            console.log("[BootScreen] Botao START pressionado! Carregando LogoRevealScreen...");
            this.screenManager.loadScreen(LogoRevealScreen);
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
        console.log("[BootScreen] Saindo da cena de Boot.");
        // Descarregar recursos da cena, se necessário
        this.gameFont = null;
    }
}
