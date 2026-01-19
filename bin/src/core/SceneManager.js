// Project/src/core/SceneManager.js

export default class SceneManager {
    constructor(input) {
        console.log("[SceneManager] Initialized");
        this.currentScene = null;
        this.input = input;
        this._switching = false;
    }

    loadScene(SceneConstructor, params = {}) {
        if (this._switching) return;
        this._switching = true;

        const oldScene = this.currentScene;

        // Remove referência ANTES de destruir
        this.currentScene = null;

        if (oldScene) {
            try {
                if (typeof oldScene.exit === 'function') {
                    oldScene.exit();
                }

                if (typeof oldScene.destroy === 'function') {
                    oldScene.destroy();
                }
            } catch (e) {
                console.error("[SceneManager] Error destroying scene", e);
            }
        }

        // Cria nova cena
        let newScene = null;
        try {
            newScene = new SceneConstructor({
                input: this.input,
                sceneManager: this
            });
        } catch (e) {
            console.error("[SceneManager] Failed to construct scene", e);
            this._switching = false;
            return;
        }

        this.currentScene = newScene;

        try {
            if (typeof newScene.enter === 'function') {
                newScene.enter(params);
            }
        } catch (e) {
            console.error("[SceneManager] Error entering scene", e);
        }

        this._switching = false;

        console.log(`[SceneManager] Active scene: ${newScene.constructor.name || 'AnonymousScene'}`);
    }

    update() {
        const scene = this.currentScene;
        if (scene && typeof scene.update === 'function') {
            scene.update();
        }
    }

    render() {
        const scene = this.currentScene;
        if (scene && typeof scene.render === 'function') {
            scene.render();
        }
    }

    shutdown() {
        if (!this.currentScene) return;

        const scene = this.currentScene;
        this.currentScene = null;

        try {
            if (scene.exit) scene.exit();
            if (scene.destroy) scene.destroy();
        } catch (e) {
            console.error("[SceneManager] Shutdown error", e);
        }
    }
}
