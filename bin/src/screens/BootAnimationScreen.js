import Bootscreen from './BootDashboard.js';
import { Timer } from '../utils/timer.js';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Screen.getMode();
const gameFont = new Font("./assets/fonts/Pixellari.ttf");

export default function BootAnimationscreen(context) {
    this.screenManager = context.screenManager;
    this.input = context.input;

    let currentFrame = 1;
    let logoImage = null;
    let timer = null;
    let destroyed = false;

    let holdingLastFrame = false;
    let lastFrameTimer = null;

    const FRAME_COUNT = 222;
    const FRAME_TIME_MS = 1000 / 30;
    const FRAME_SKIP = 2;
    const LAST_FRAME_HOLD_MS = 600;

    console.log("[BootAnimationscreen] Constructed");

    this.enter = () => {
        if (destroyed) return;

        currentFrame = 1;
        holdingLastFrame = false;

        timer = new Timer();
        lastFrameTimer = null;

        playBgm(SoundPath.BOOT);
        loadFrame();
    };

    const loadFrame = () => {
        if (destroyed) return;

        logoImage = null;

        const frameNumber = currentFrame.toString().padStart(4, '0');
        const framePath =
            `./assets/gfx/logos/converted_startup/frame_${frameNumber}.png`;

        logoImage = new Image(framePath);
    };

    this.update = () => {
        if (destroyed || !timer) return;

        AudioUpdate();
        
        if (holdingLastFrame) {
            if (lastFrameTimer && lastFrameTimer.get() >= LAST_FRAME_HOLD_MS) {
                this.screenManager.loadscreen(Bootscreen);
            }
            return;
        }

        if (timer.get() >= FRAME_TIME_MS) {
            timer.reset();
            currentFrame += 1 + FRAME_SKIP;

            if (currentFrame >= FRAME_COUNT) {
                currentFrame = FRAME_COUNT;
                holdingLastFrame = true;
                lastFrameTimer = new Timer();
                loadFrame();
                return;
            }

            loadFrame();
        }
    };

    this.render = () => {
        if (!logoImage || !logoImage.ready()) return;

        const x = (SCREEN_WIDTH - logoImage.width) >> 1;
        const y = (SCREEN_HEIGHT - logoImage.height) >> 1;

        logoImage.draw(x, y);
        gameFont.print(10, SCREEN_HEIGHT - 30, "Carregando...");
    };

    this.exit = () => {
        if (destroyed) return;
        stopBgm();
    };

    this.destroy = () => {
        if (destroyed) return;
        destroyed = true;

        stopBgm();

        if (timer && timer.destroy) {
            timer.destroy();
        }
        timer = null;

        if (lastFrameTimer && lastFrameTimer.destroy) {
            lastFrameTimer.destroy();
        }
        lastFrameTimer = null;

        logoImage = null;
    };
}

