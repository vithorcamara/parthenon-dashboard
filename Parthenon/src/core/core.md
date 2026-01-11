# Diretório `src/core`

O diretório `core` contém a **infraestrutura base da aplicação**, também referida como o "motor" ou "engine" do frontend.

Os módulos aqui são **totalmente agnósticos à lógica de negócio**. Eles fornecem os sistemas fundamentais sobre os quais a aplicação é construída. Por exemplo, o `SceneManager` sabe como trocar de cena, mas não sabe *o que é* uma `GameListScene`.

Componentes principais:
- **App.js**: O orquestrador principal, que une todos os sistemas do core e inicia o loop da aplicação.
- **GameLoop.js**: Gerencia o ciclo de `update` e `render`, garantindo que a aplicação execute de forma consistente.
- **SceneManager.js**: Controla a transição entre as diferentes cenas (telas) da aplicação.
- **Input.js**: Abstrai a leitura do controle do PS2, fornecendo uma API simples para verificar o estado dos botões.
- **Renderer.js**: Contém funções de baixo nível para desenhar primitivas na tela (retângulos, texto, imagens).
- **Audio.js**: Gerencia a reprodução de música de fundo e efeitos sonoros.
