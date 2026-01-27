// Parthenon/src/screens/BootScreen.js
import LogoRevealScreen from './BootStartScreen.js';
const data_screen = Screen.getMode();
import Colors from '../ui/colors.js';
import Fonts from '../ui/fonts.js';
import TextStyles from '../ui/text.js';

export default class BootDashboardScreen {
    constructor({ input, screenManager }) {
        this.input = input;
        this.screenManager = screenManager;
        this.gameFont = null;
        this.navItems = ["Inicio", "Jogos & Apps", "Midia", "Configurações"];
        this.activeNavIndex = 0; // item inicialmente selecionado
        console.log("[BootScreen] Construtor.");
    }

    // Helper para desenhar o navmenu
    drawNavMenu() {
        if (!this.gameFont) return;

        let x = 80; // posição inicial X
        const y = 50; // posição Y fixa do menu

        this.navItems.forEach((item, index) => {
            const style = (index === this.activeNavIndex) 
                ? TextStyles.SELECTED_NAVMENU 
                : TextStyles.UNSELECTED_NAVMENU;

            // Aplica estilo
            this.gameFont = style.font;
            this.gameFont.color = style.color;
            this.gameFont.scale = style.scale;

            // Desenha item
            this.gameFont.print(x, y, item);

            // Atualiza posição X para próximo item (adapte conforme largura desejada)
            const textSize = this.gameFont.getTextSize(item);
            x += textSize.width + 40; // 40px de espaçamento entre itens
        });
    }

    // Atualiza o menu ao pressionar R1/L1
    updateNavMenu() {
        if (this.input.isButtonPressed("r1")) {
            this.activeNavIndex++;
            if (this.activeNavIndex >= this.navItems.length) {
                this.activeNavIndex = 0; // volta ao primeiro
            }
        }
        if (this.input.isButtonPressed("l1")) {
            this.activeNavIndex--;
            if (this.activeNavIndex < 0) {
                this.activeNavIndex = this.navItems.length - 1; // vai pro último
            }
        }
    }

    enter(params) {
        console.log("[BootScreen] Entrando na cena de Boot. Parametros:", params);
        // Carrega a fonte para esta cena.
        try {
            console.log("[BootScreen] Carregando fonte...");
            this.gameFont = Fonts.REGULAR;
            console.log("[BootScreen] Fonte carregada com sucesso.");
            
            // background = new Image("./assets/gfx/backgrounds/background_original.png");
            // background.width = data_screen.width;
            // background.height = data_screen.height;
            // console.log("[BootScreen] Background carregado com sucesso.");

            Object.entries(data_screen).forEach(([key, value]) => {console.log(key, value);});
        } catch (e) {
            console.error(`[BootScreen] Falha ao carregar a fonte '${this.gameFont}'. Erro:`, e);
            this.gameFont = null;
        }
    }

    update() {
        this.updateNavMenu();

        // Ao pressionar START, carrega a LogoRevealScreen
        if (this.input.isButtonPressed('start')) {
            console.log("[BootScreen] Botao START pressionado! Carregando LogoRevealScreen...");
            this.screenManager.loadScreen(LogoRevealScreen);
        }
    }

    render() {
        Draw.rect(0, 0, data_screen.width, data_screen.height, Colors.BACKGROUND1);
        this.drawNavMenu();
    }

    exit() {
        console.log("[BootScreen] Saindo da cena de Boot.");
        // Descarregar recursos da cena, se necessário
        this.gameFont = null;
    }
}
