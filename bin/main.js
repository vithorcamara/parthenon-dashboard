// {"name": "Parthenon Dashboard", "author": "Vitor Câmara / Gemini", "version": "20260110", "icon": "assets/icon.png", "file": "main.js"}
// Este arquivo inicializa o AthenaEnv e a aplicação principal.

console.log("[main] Iniciando Parthenon Dashboard...");

// Importar e executar a função principal da aplicação
import { run } from './src/core/App.js';

std.loadScript('./src/utils/audio.js');

Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);
Screen.setFrameCounter(true);
Screen.setVSync(true);
Screen.display(run);
