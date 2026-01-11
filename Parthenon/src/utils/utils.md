# Diretório `src/utils`

Este diretório contém **funções e classes utilitárias, genéricas e desacopladas** de qualquer outro domínio da aplicação.

Um módulo utilitário não deve ter dependências de `core`, `app`, `scenes` ou `ui`. Ele resolve um problema genérico que poderia, teoricamente, ser copiado e colado em outro projeto sem modificação.

Exemplos:
- **Math.js**: Funções matemáticas úteis, como `clamp`, `lerp` (interpolação linear), ou `map` (mapear um valor de um intervalo para outro).
- **Timer.js**: Classes para criar temporizadores, contadores regressivos ou medir intervalos de tempo.
- **EventBus.js**: Um sistema de publicação/inscrição de eventos, que permite a comunicação desacoplada entre diferentes partes do sistema.
- **Logger.js**: Um wrapper para a função de log, permitindo categorizar mensagens (debug, warning, error) e ligar/desligar a saída de logs facilmente.
