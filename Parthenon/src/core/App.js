// Project/src/core/App.js
import SceneManager from './SceneManager.js';
import Input from './Input.js';
import BootScene from '../scenes/BootScene.js';

export function run() {
    // --- Initialization ---
    console.log("[App.run] Configurando ambiente AthenaEnv...");
    Screen.setVSync(true);
    Screen.setFrameCounter(true);
    console.log("[App.run] VSync e Frame Counter habilitados.");

    // --- Game Objects and State ---
    const input = new Input();
    const sceneManager = new SceneManager(input);

    // Carrega a cena inicial
    sceneManager.loadScene(BootScene);

    console.log("[App.run] Iniciando loop principal (Screen.display)...");
    // --- Main Game Loop ---
    Screen.display(() => {
        // --- Update ---
        input.update(); // Atualiza o estado do controle
        sceneManager.update(); // Atualiza a cena ativa (sem dt)

        // --- Render ---
        sceneManager.render(); // Renderiza a cena ativa
    });
}
