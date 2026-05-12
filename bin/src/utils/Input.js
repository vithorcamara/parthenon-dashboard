// Project/src/core/Input.js
export default function Input() {
    console.log("[Input] Inicializado.");

    let pad = null;
    let enabled = true;

    // PAD Initialization
    try {
        pad = Pads.get(0);
        console.log("[Input] Controle (Pad 0) inicializado com sucesso.");
    } catch (e) {
        console.error("[Input] Falha ao inicializar Pads.get(0).", e);
        pad = null;
    }

    this.buttons = {};
    this.lastButtons = {};

    const buttonMap = {
        start: Pads.START,
        select: Pads.SELECT,
        up: Pads.UP,
        down: Pads.DOWN,
        left: Pads.LEFT,
        right: Pads.RIGHT,
        cross: Pads.CROSS,
        circle: Pads.CIRCLE,
        triangle: Pads.TRIANGLE,
        square: Pads.SQUARE,
        l1: Pads.L1,
        r1: Pads.R1,
        l2: Pads.L2,
        r2: Pads.R2,
    };

    // UPDATE
    this.update = () => {
        if (!enabled) return;

        this.lastButtons = { ...this.buttons };

        if (pad) {
            pad.update();
            for (const name in buttonMap) {
                this.buttons[name] = pad.pressed(buttonMap[name]);
            }
        }
        // ANALÓGICO ESQUERDO
        const DEADZONE = 25;

        this.buttons.leftAnalogLeft  = pad.lx < -DEADZONE;
        this.buttons.leftAnalogRight = pad.lx > DEADZONE;

        this.buttons.leftAnalogUp    = pad.ly < -DEADZONE;
        this.buttons.leftAnalogDown  = pad.ly > DEADZONE;
    };

    // Queries
    this.isButtonDown = (name) => !!this.buttons[name];
    this.isButtonPressed = (name) =>
        !!this.buttons[name] && !this.lastButtons[name];

    // Keyboard fallback (mock)
    let keyDownHandler = null;
    let keyUpHandler = null;

    if (!pad) {
        const keyboardMap = {
            enter: 'start',
            arrowup: 'up',
            arrowdown: 'down',
            arrowleft: 'left',
            arrowright: 'right',
            x: 'confirm',
            c: 'cancel',
        };

        const handleKey = (event, isDown) => {
            const button = keyboardMap[event.key.toLowerCase()];
            if (button) {
                this.buttons[button] = isDown;
            }
        };

        keyDownHandler = (e) => handleKey(e, true);
        keyUpHandler = (e) => handleKey(e, false);

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        console.log("[Input] Mock de teclado ativado.");
    }

    // SHUTDOWN (CRÍTICO)
    this.shutdown = () => {
        if (!enabled) return;
        enabled = false;

        console.log("[Input] Shutdown");

        // Para polling
        pad = null;

        // Remove listeners de teclado
        if (keyDownHandler) {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        }

        this.buttons = {};
        this.lastButtons = {};
    };
}

