import DashboardScreen from './DashboardScreen.js';
import { Timer } from '../utils/timer.js';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Screen.getMode();

// Timings
const FADE_IN_TIME = 1500;
const HOLD_TIME = 1000;
const FADE_OUT_TIME = 500;

// Logo scale (5x menor)
const LOGO_SCALE = 0.2;

// Estados
const STATES = {
    FADE_IN_BASE: 0,
    FADE_IN_COLUMNS: 1,
    FADE_IN_ROOF: 2,
    FADE_IN_NAME: 3,
    HOLD: 4,
    FADE_OUT: 5
};

const logo_path = "./assets/gfx/logos/start/logo_";

export default function LogoRevealScreen(context) {
    this.screenManager = context.screenManager;

    let destroyed = false;
    let state = STATES.FADE_IN_BASE;
    let timer = null;

    let parts = null;
    let globalAlpha = 1;

    console.log("[LogoRevealScreen] Constructed");

    this.enter = () => {
        if (destroyed) return;

        timer = new Timer();
        state = STATES.FADE_IN_BASE;
        globalAlpha = 1;

        playBgm(SoundPath.BOOT);

        parts = {
            base: {
                image: new Image(`${logo_path}base.png`),
                alpha: 0,
                scaled: false
            },
            columns: {
                image: new Image(`${logo_path}columns.png`),
                alpha: 0,
                scaled: false
            },
            roof: {
                image: new Image(`${logo_path}roof.png`),
                alpha: 0,
                scaled: false
            },
            name: {
                image: new Image(`${logo_path}name.png`),
                alpha: 0,
                scaled: false
            }
        };

        console.log("[LogoRevealScreen] Entered");
    };

    const fadeIn = (part) => {
        part.alpha = Math.min(timer.get() / FADE_IN_TIME, 1);
        if (part.alpha >= 1) {
            timer.reset();
            return true;
        }
        return false;
    };

    this.update = () => {
        if (destroyed || !timer) return;

        AudioUpdate();

        switch (state) {
            case STATES.FADE_IN_BASE:
                if (fadeIn(parts.base)) {
                    state = STATES.FADE_IN_COLUMNS;
                }
                break;

            case STATES.FADE_IN_COLUMNS:
                if (fadeIn(parts.columns)) {
                    state = STATES.FADE_IN_ROOF;
                }
                break;

            case STATES.FADE_IN_ROOF:
                if (fadeIn(parts.roof)) {
                    state = STATES.FADE_IN_NAME;
                }
                break;

            case STATES.FADE_IN_NAME:
                if (fadeIn(parts.name)) {
                    state = STATES.HOLD;
                    timer.reset();
                }
                break;

            case STATES.HOLD:
                if (timer.get() >= HOLD_TIME) {
                    state = STATES.FADE_OUT;
                    timer.reset();
                }
                break;

            case STATES.FADE_OUT:
                globalAlpha = 1 - Math.min(timer.get() / FADE_OUT_TIME, 1);
                if (globalAlpha <= 0) {
                    this.screenManager.loadScreen(DashboardScreen);
                }
                break;
        }
    };

    this.render = () => {
        if (!parts) return;

        // Aplica scale UMA vez
        Object.values(parts).forEach(item => {
            if (!item.image.ready() || item.scaled) return;

            item.image.width  *= LOGO_SCALE;
            item.image.height *= LOGO_SCALE;
            item.scaled = true;
        });

        // Posições
        const centerX = SCREEN_WIDTH >> 1;
        const centerY = SCREEN_HEIGHT >> 1;

        if (!parts.columns.image.ready()) return; // ponto de referência

        // Columns centralizado
        const columnsX = centerX - (parts.columns.image.width >> 1);
        const columnsY = centerY - (parts.columns.image.height >> 1);

        // Base abaixo das columns
        const baseX = centerX - (parts.base.image.width >> 1);
        const baseY = columnsY + parts.columns.image.height + 5;

        // Roof acima das columns
        const roofX = centerX - (parts.roof.image.width >> 1);
        const roofY = columnsY - parts.roof.image.height - 5;

        // Name abaixo da base
        const nameX = centerX - (parts.name.image.width >> 1);
        const nameY = baseY + parts.base.image.height + 5;

        // Helper para desenhar com alpha
        const draw = (item, x, y) => {
            if (!item.image.ready() || item.alpha <= 0) return;

            item.image.color = Color.new(
                255,
                255,
                255,
                Math.floor(255 * item.alpha * globalAlpha)
            );

            item.image.draw(x, y);
        };

        // Ordem de desenho
        draw(parts.roof, roofX, roofY);
        draw(parts.columns, columnsX, columnsY);
        draw(parts.base, baseX, baseY);
        draw(parts.name, nameX, nameY);
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

        parts = null;
    };
}

