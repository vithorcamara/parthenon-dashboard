// Project/src/scenes/BootScene.js
export default function BootScene({ input, sceneManager }) {
    this.input = input;
    this.sceneManager = sceneManager;
    let gameFont;

    console.log("[BootScene] Construtor.");

    this.enter = function(params) {
        console.log("[BootScene] Entrando na cena de Boot. Parametros:", params);
        // Carrega a fonte para esta cena.
        try {
            console.log("[BootScene] Carregando fonte...");
            gameFont = new Font("./assets/fonts/Pixellari.ttf");
            console.log("[BootScene] Fonte carregada com sucesso.");
        } catch (e) {
            console.error("[BootScene] Falha ao carregar a fonte 'Pixellari.ttf'. Erro:", e);
            gameFont = null;
        }
    }.bind(this);

    this.update = function() {
        // Exemplo de transição de cena ao pressionar START
        if (this.input.isButtonPressed('start')) {
            console.log("[BootScene] Botao START pressionado! (Transicao de cena nao implementada)");
            // Futuramente, poderia carregar a próxima cena:
            // this.sceneManager.loadScene(HomeScene);
        }
    }.bind(this);

    this.render = function() {
        if (gameFont) {
            gameFont.print(10, 10, "AthenaEnv Frontend");
            gameFont.print(10, 30, "Pressione START");
        } else {
            // Fallback se a fonte não carregar.
            // A API de print global pode ou não existir, mas é uma tentativa.
            if (typeof print === 'function') {
                print("AthenaEnv Frontend - Fonte não carregada", 10, 10);
            }
        }
    }.bind(this);

    this.exit = function() {
        console.log("[BootScene] Saindo da cena de Boot.");
        // Descarregar recursos da cena, se necessário
        gameFont = null;
    }.bind(this);
}
