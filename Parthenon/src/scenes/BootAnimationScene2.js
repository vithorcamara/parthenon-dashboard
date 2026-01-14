import BootScene from './BootScene.js';
import { Timer } from '../utils/Timer.js';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Screen.getMode();
const gameFont = new Font("./assets/fonts/Pixellari.ttf");

export default function BootAnimationScene(context) {
    this.sceneManager = context.sceneManager;
    this.input = context.input;

    let currentFrame = 1;
    let logoImage = null;
    let timer = null;

    const FRAME_COUNT = 222;
    const FRAME_TIME_MS = 1000 / 30; // 30 FPS
    const FRAME_SKIP = 2; // Altere este valor para pular quadros (0 = sem pulo, 1 = pular 1 quadro, etc.)

    console.log("[BootAnimationScene] Construtor.");

    this.enter = function () {
        console.log("[BootAnimationScene] Entrando na cena de animação.");
        currentFrame = 1;
        timer = new Timer();
        this.loadFrame();
    }.bind(this);

    this.loadFrame = function () {
        if (logoImage) {
            // Libera a imagem anterior
            logoImage = null;
            std.gc();
        }
        const frameNumber = currentFrame.toString().padStart(4, '0');
        const framePath = `./assets/gfx/logos/converted_startup/frame_${frameNumber}.png`;
        logoImage = new Image(framePath, RAM);
    }.bind(this);

    this.update = function () {
        if (timer.get() >= FRAME_TIME_MS) {
            timer.reset();
            currentFrame += 1 + FRAME_SKIP;

            if (currentFrame > FRAME_COUNT) {
                this.sceneManager.loadScene(BootScene);
                return;
            }

            this.loadFrame();
        }
    }.bind(this);

    this.render = function () {
        if (!logoImage || !logoImage.ready()) return;

        const x = (SCREEN_WIDTH - logoImage.width) / 2;
        const y = (SCREEN_HEIGHT - logoImage.height) / 2;

        logoImage.draw(x, y);

        gameFont.print(10, SCREEN_HEIGHT - 30, "Carregando...");
    }.bind(this);

    this.exit = function () {
        logoImage = null;
        timer = null;
        std.gc();
    }.bind(this);
}
