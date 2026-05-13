// {"name": "Parthenon Dashboard", "author": "Vitor Câmara / Gemini", "version": "20260110", "icon": "assets/icon.png", "file": "main.js"}
// Este arquivo inicializa o AthenaEnv e a aplicação principal.

console.log("[main] Iniciando Parthenon Dashboard...");

// Importar e executar a função principal da aplicação
import { run } from './src/core/App.js';
import Preferences from './src/config/Preferences.js';

const lang = Preferences.LANGUAGE || 'us';

const jsList = [
    './src/utils/Audio.js', // Sound Handler
    './src/ui/Colors.js', // Colors
    './src/ui/Fonts.js', // Fonts
    './src/ui/Texts.js', // Text Styles
    `./src/config/${lang}_lang.js`, // Language File
];

jsList.forEach((js) => { std.loadScript(js); });

Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);
Screen.setFrameCounter(true);
Screen.setVSync(true);
Screen.display(run);
