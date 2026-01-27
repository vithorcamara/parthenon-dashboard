// Project/src/core/App.js
import ScreenManager from './ScreenManager.js';
import Input from './Input.js';
import LogoRevealScreen from '../screens/BootStartScreen.js';
import BootDashboardScreen from '../screens/BootDashboardScreen.js';

export function run() {
    // --- Initialization ---
    console.log("[App.run] Configurando ambiente AthenaEnv...");
    Screen.setVSync(true);
    Screen.setFrameCounter(true);
    console.log("[App.run] VSync e Frame Counter habilitados.");

    // --- Game Objects and State ---
    const input = new Input();
    const screenManager = new ScreenManager(input);

    // Carrega a cena inicial
    screenManager.loadScreen(LogoRevealScreen);

    console.log("[App.run] Iniciando loop principal (Screen.display)...");
    // --- Main Game Loop ---
    Screen.display(() => {
        // --- Update ---
        input.update(); // Atualiza o estado do controle
        screenManager.update(); // Atualiza a cena ativa (sem dt)

        // --- Render ---
        screenManager.render(); // Renderiza a cena ativa
    });
    Screen.flip();
    Screen.clear();
}

