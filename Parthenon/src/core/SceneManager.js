// Project/src/core/SceneManager.js
export default function SceneManager(input) {
    console.log("[SceneManager] Inicializado.");
    this.currentScene = null;
    this.input = input;

    this.loadScene = function(SceneConstructor, params = {}) {
        if (this.currentScene && typeof this.currentScene.exit === 'function') {
            this.currentScene.exit();
            console.log(`[SceneManager] Saindo da cena: ${this.currentScene.constructor.name || 'AnonymousScene'}`);
        }

        // Passa o input e a si mesmo (o SceneManager) para a cena
        this.currentScene = new SceneConstructor({
            input: this.input, 
            sceneManager: this
        });

        if (typeof this.currentScene.enter === 'function') {
            this.currentScene.enter(params);
            console.log(`[SceneManager] Entrando na cena: ${this.currentScene.constructor.name || 'AnonymousScene'}`);
        }
    }.bind(this);

    this.update = function() {
        if (this.currentScene && typeof this.currentScene.update === 'function') {
            this.currentScene.update(); // No longer passes dt
        }
    }.bind(this);

    this.render = function() {
        if (this.currentScene && typeof this.currentScene.render === 'function') {
            this.currentScene.render();
        }
    }.bind(this);
}
