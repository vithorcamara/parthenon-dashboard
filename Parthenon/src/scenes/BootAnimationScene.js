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
    let startupSound = null;

    const FRAME_COUNT = 222;
    const FRAME_TIME_MS = 1000 / 45; // 30 FPS
    const FRAME_SKIP = 3;

    console.log("[BootAnimationScene] Construtor.");

    let soundStarted = false;

    this.enter = function () {
        console.log("[BootAnimationScene] Entrando na cena.");

        currentFrame = 1;
        timer = new Timer();

        console.log("[Audio] Criando stream...");
        startupSound = Sound.Stream("./assets/audio/sfx/startup.wav");
        if (!startupSound) {
            console.error("[Audio] Falha ao carregar o áudio de inicialização.");
        } else {
            console.log("[Audio] Tocando stream ENTER...");
            // startupSound.play(Sound.findChannel());
            soundStarted = true;
        }

        this.loadFrame();
    }.bind(this);


    this.loadFrame = function () {
        if (logoImage) {
            logoImage = null;
            std.gc();
        }

        const frameNumber = currentFrame.toString().padStart(4, '0');
        const framePath = `./assets/gfx/logos/converted_startup/frame_${frameNumber}.png`;
        logoImage = new Image(framePath);
    }.bind(this);
    
    this.update = function () {
        // if (!soundStarted && startupSound) {
        //     console.log("[Audio] Tocando stream...");
        //     startupSound.play(Sound.findChannel());
        //     soundStarted = true;
        // }
        console.log("[BootAnimationScene] Atualizando cena.");
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
        // 🧹 Libera áudio
        if (startupSound) {
            startupSound.pause();
            startupSound.free();
            startupSound = null;
        }

        logoImage = null;
        timer = null;
        std.gc();
    }.bind(this);
}
