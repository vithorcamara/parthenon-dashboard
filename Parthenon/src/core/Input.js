// Project/src/core/Input.js
// Abstrai o input do controle do PS2.

export default function Input() {
    console.log("[Input] Inicializado.");
    let pad;
    
    // Tenta inicializar o controle
    try {
        pad = Pads.get(0);
        console.log("[Input] Controle (Pad 0) inicializado com sucesso.");
    } catch (e) {
        console.error("[Input] Falha ao inicializar Pads.get(0). Usando mock de teclado. Erro:", e);
        pad = null; // Garante que o pad é nulo se falhar
    }

    this.buttons = {}; // Estado atual dos botões
    this.lastButtons = {}; // Estado dos botões no frame anterior

    // Mapeamento de botões do AthenaEnv para nomes semânticos
    // Isso deve ser movido para `src/config/controls.js` no futuro
    const buttonMap = {
        'start': Pads.START,
        'select': Pads.SELECT,
        'up': Pads.UP,
        'down': Pads.DOWN,
        'left': Pads.LEFT,
        'right': Pads.RIGHT,
        'confirm': Pads.CROSS, // Xis no PS2
        'cancel': Pads.CIRCLE, // Círculo no PS2
        'triangle': Pads.TRIANGLE,
        'square': Pads.SQUARE,
        'l1': Pads.L1,
        'r1': Pads.R1,
        'l2': Pads.L2,
        'r2': Pads.R2,
    };

    // Chamado a cada frame para atualizar o estado dos botões
    this.update = function() {
        // Copia o estado atual para o estado anterior
        this.lastButtons = { ...this.buttons };

        if (pad) {
            // No ambiente real, lê o estado do controle
            pad.update();
            for (const name in buttonMap) {
                this.buttons[name] = pad.pressed(buttonMap[name]);
            }
        }
        // A simulação do teclado continuará funcionando se 'pad' não for inicializado
        // e os event listeners forem adicionados.
    }.bind(this);

    // Verifica se um botão está pressionado (segurando)
    this.isButtonDown = function(buttonName) {
        return !!this.buttons[buttonName];
    }.bind(this);

    // Verifica se um botão foi pressionado neste frame (apenas um toque)
    this.isButtonPressed = function(buttonName) {
        return !!this.buttons[buttonName] && !this.lastButtons[buttonName];
    }.bind(this);

    // --- Simulação de teclado para teste no navegador ---
    if (!pad) {
        const keyboardMap = {
            'enter': 'start',
            'arrowup': 'up',
            'arrowdown': 'down',
            'arrowleft': 'left',
            'arrowright': 'right',
            'x': 'confirm',
            'c': 'cancel',
        };

        const handleKey = (event, isDown) => {
            const buttonName = keyboardMap[event.key.toLowerCase()];
            if (buttonName) {
                this.buttons[buttonName] = isDown;
            }
        };

        window.addEventListener('keydown', (e) => handleKey(e, true));
        window.addEventListener('keyup', (e) => handleKey(e, false));
        console.log("[Input] Mock de teclado ativado ('c' para cancelar).");
    }
}
