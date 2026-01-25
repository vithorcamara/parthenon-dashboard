// Project/src/core/ScreenManager.js

export default class ScreenManager {
    constructor(input) {
        console.log("[ScreenManager] Initialized");
        this.currentScreen = null;
        this.input = input;
        this._switching = false;
    }

    loadScreen(screenConstructor, params = {}) {
        if (this._switching) return;
        this._switching = true;

        const oldScreen = this.currentScreen;

        // Remove referência ANTES de destruir
        this.currentScreen = null;

        if (oldScreen) {
            try {
                if (typeof oldScreen.exit === 'function') {
                    oldScreen.exit();
                }

                if (typeof oldScreen.destroy === 'function') {
                    oldScreen.destroy();
                }
            } catch (e) {
                console.error("[ScreenManager] Error destroying screen", e);
            }
        }

        // Cria nova cena
        let newScreen = null;
        try {
            newScreen = new screenConstructor({
                input: this.input,
                screenManager: this
            });
        } catch (e) {
            console.error("[ScreenManager] Failed to construct screen", e);
            this._switching = false;
            return;
        }

        this.currentScreen = newScreen;

        try {
            if (typeof newScreen.enter === 'function') {
                newScreen.enter(params);
            }
        } catch (e) {
            console.error("[ScreenManager] Error entering screen", e);
        }

        this._switching = false;

        console.log(`[ScreenManager] Active screen: ${newScreen.constructor.name || 'AnonymousScreen'}`);
    }

    update() {
        const screen = this.currentScreen;
        if (screen && typeof screen.update === 'function') {
            screen.update();
        }
    }

    render() {
        const screen = this.currentScreen;
        if (screen && typeof screen.render === 'function') {
            screen.render();
        }
    }

    shutdown() {
        if (!this.currentScreen) return;

        const screen = this.currentScreen;
        this.currentScreen = null;

        try {
            if (screen.exit) screen.exit();
            if (screen.destroy) screen.destroy();
        } catch (e) {
            console.error("[ScreenManager] Shutdown error", e);
        }
    }
}

