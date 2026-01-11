# Projeto: Parthenon Dashboard
## Software Architecture Document (SAD)

---

## 1. Visão Geral

O projeto **Parthenon Dashboard** é um **frontend e sistema de experiência do usuário** para o PlayStation 2, desenvolvido sobre o **AthenaEnv** com JavaScript. Ele atua como um **orquestrador central**, projetado para integrar e gerenciar ferramentas existentes da cena, como **OPL (Open PS2 Loader)**, **LaunchELF**, e outros homebrews, sob uma interface unificada e moderna.

Este documento descreve a **arquitetura de software** do projeto, servindo como **guia prático** para a organização de pastas, arquivos e módulos, garantindo escalabilidade e manutenibilidade dentro das restrições da plataforma. A arquitetura é pensada para suportar a visão do Parthenon como um "núcleo de sistema", conforme detalhado no [Concept Document](./Concept.md).

---

## 2. Objetivos da Arquitetura

A arquitetura foi definida para:

*   Facilitar a manutenção e a adição de novas funcionalidades.
*   Separar claramente **dados, lógica da aplicação e renderização**.
*   Permitir prototipagem e iteração rápidas da interface.
*   Reduzir o acoplamento entre os diferentes sistemas (UI, API, launcher).
*   Respeitar as limitações de memória e performance do PS2.
*   Abstrair a complexidade da comunicação com o OPL e APIs externas.

---

## 3. Princípios Arquiteturais

### 3.1 Separação de Responsabilidades

O projeto é dividido em quatro domínios principais:

*   **Assets**: Dados brutos (imagens, fontes, sons, temas em JSON).
*   **Core**: Infraestrutura da aplicação (loop principal, input, renderização, gerenciador de cenas).
*   **App**: Lógica da aplicação e regras de negócio (telas, comunicação com API, execução de jogos).
*   **Config**: Dados de configuração e constantes globais.

### 3.2 main.js Minimalista

O arquivo `main.js` deve conter apenas:

*   Inicialização do AthenaEnv.
*   Instanciação do objeto principal da aplicação (ex: `App.js`).
*   Início do loop principal.
*   Nenhuma lógica de UI ou de aplicação deve residir aqui.

### 3.3 Telas como Scenes

Cada tela ou estado principal da aplicação é uma **Scene** independente:

*   Tela de Login
*   Menu Principal (Dashboard)
*   Lista de Jogos
*   Tela de Configurações

Scenes são gerenciadas por um `SceneManager` e não compartilham lógica interna diretamente.

### 3.4 Gerenciamento de Memória de Assets

A gestão de memória no PS2 é crítica. A arquitetura adota uma estratégia clara para o carregamento e descarregamento de assets:

*   **Assets Globais**: Fontes, ícones e sons de UI comuns são carregados uma única vez pela `BootScene` (ou uma cena de carregamento inicial) e mantidos na memória.
*   **Assets de Cena**: Cada `Scene` é responsável por carregar seus próprios assets específicos (ex: imagens de fundo, logos de jogos) em seu método `enter()`.
*   **Limpeza Obrigatória**: Cada `Scene` **deve** descarregar os assets que carregou em seu método `exit()` para liberar memória antes da transição para a próxima cena.

Essa abordagem garante que apenas os recursos necessários estejam na memória, evitando sobrecarga.

---

## 4. Estrutura de Diretórios

### 4.1 Estrutura Raiz

```
/
├── assets/
├── src/
├── main.js
├── athena.ini
├── athena.elf
├── SYSTEM.CNF
├── ATHA_000.01
└── README.md
```

---

## 5. Arquitetura de Assets (`assets/`)

Diretório para **dados estáticos e de configuração visual**. Nenhum arquivo aqui contém lógica.

```
assets/
├── gfx/
│   ├── icons/      # Ícones da interface
│   ├── backgrounds/  # Imagens de fundo
│   └── logos/        # Logos de jogos/sistema
├── audio/
│   ├── music/      # Música de fundo
│   └── sfx/        # Efeitos sonoros da UI
├── fonts/
│   └── *.ttf       # Fontes
└── themes/
    └── default.json # Definição de cores, fontes, layout
```

---

## 6. Arquitetura de Código (`src/`)

### 6.1 `src/config/`

Define **decisões e dados de configuração globais**.

```
src/config/
├── controls.js   # Mapeamento semântico de botões (ex: 'CONFIRM', 'CANCEL')
├── constants.js  # Constantes da aplicação (versão, URLs de API)
└── settings.js   # Configurações do usuário (carregadas/salvas)
```

### 6.2 `src/core/`

Infraestrutura base da aplicação, totalmente agnóstica à lógica de negócio.

```
src/core/
├── App.js           # Orquestrador principal da aplicação
├── GameLoop.js      # Gerencia o loop de update/render
├── SceneManager.js  # Gerencia a transição entre as cenas
├── Input.js         # Abstrai a leitura do controle do PS2
├── Renderer.js      # Funções de baixo nível para desenhar na tela
└── Audio.js         # Gerencia a reprodução de som e música
```

### 6.3 `src/scenes/`

Cada Scene representa uma **tela ou estado completo** da aplicação.

```
src/scenes/
├── BootScene.js     # Carrega assets iniciais
├── LoginScene.js    # Tela de autenticação
├── HomeScene.js     # Dashboard principal
├── GameListScene.js # Tela de listagem de jogos
└── SettingsScene.js # Tela de configurações
```

Cada `Scene` implementa uma interface comum para consistência, documentada abaixo. Isso ajuda novos contribuidores e facilita o debug.

```js
class Scene {
  /**
   * Chamado quando a cena se torna ativa.
   * @param {object} params - Parâmetros passados da cena anterior.
   */
  enter(params) {}

  /**
   * Atualiza a lógica da cena.
   * @param {number} dt - Delta time, tempo desde o último frame.
   */
  update(dt) {}

  /**
   * Renderiza os elementos visuais da cena.
   * @param {Renderer} renderer - O objeto responsável pelo desenho.
   */
  render(renderer) {}

  /**
   * Chamado quando a cena está prestes a ser desativada.
   * Ideal para limpar recursos específicos da cena.
   */
  exit() {}
}
```

### 6.4 `src/app/`

Contém a **lógica de negócio** e os sistemas que governam a aplicação.

```
src/app/
├── services/
│   ├── OplService.js    # Lógica para chamar e interagir com o OPL
│   ├── ApiClient.js     # Comunicação com a API externa (perfis, jogos)
│   └── UserService.js   # Gerencia o estado do usuário logado
└── components/
    ├── GameList.js      # Componente que renderiza uma lista de jogos
    ├── ProfileCard.js   # Componente para exibir info do perfil
    └── UINavigator.js   # Sistema de navegação por elementos da UI
```

### 6.5 `src/ui/`

Componentes de interface reutilizáveis e de baixo nível.

> **Nota de atenção**: Dado o hardware restrito do PS2, é crucial evitar composição profunda de componentes ou abstrações de UI muito genéricas que não serão reutilizadas. Se um componente for complexo e usado apenas em uma `Scene`, considere movê-lo para `src/app/components/` ou declará-lo na própria `Scene` para manter a arquitetura mais "flat" e performática.

```
src/ui/
├── Button.js
├── Label.js
├── Image.js
└── DialogBox.js
```

### 6.6 `src/utils/`

Funções e classes utilitárias, genéricas e desacopladas de qualquer outro domínio.

```
src/utils/
├── Math.js
├── Timer.js
├── EventBus.js
└── Logger.js
```

---

## 7. Fluxo de Execução

O fluxo principal para iniciar um jogo seria:

```
main.js → core.App → core.SceneManager → scenes.GameListScene
      ↓
(usuário seleciona jogo)
      ↓
GameListScene → app.services.OplService.launchGame(gameId)
      ↓
(OplService executa o ELF do OPL com os parâmetros corretos)
      ↓
[ OPL CARREGA O JOGO ]
      ↓
(usuário usa IGR no jogo)
      ↓
[ CONSOLE REINICIA E CARREGA O FRONTEND NOVAMENTE ]
```

---

## 8. Decisões Arquiteturais Importantes

*   **OPL como Serviço**: O frontend não tem conhecimento sobre como carregar um jogo. Ele apenas solicita a execução ao `OplService`, que é o único a conhecer os detalhes da comunicação com o OPL.
*   **Dados de UI em Assets**: A aparência (temas, cores) é definida em arquivos JSON (`assets/themes`), permitindo customização sem alterar o código.
*   **Input Abstraído**: A lógica da aplicação responde a eventos semânticos (`CONFIRM`), não a botões físicos (`X`), permitindo remapeamento fácil (`controls.js`).
*   **Estado Desacoplado**: O estado do usuário e dos jogos é gerenciado por serviços (`UserService`, `ApiClient`) e não diretamente pelas cenas, permitindo que a UI seja mais "burra".
*   **Comunicação Desacoplada entre Cenas e Serviços**: Para evitar que as cenas se tornem "controladores gordos" (classes com excesso de responsabilidade), a comunicação complexa ou que envolve múltiplos domínios deve ser preferencialmente feita através do `EventBus` (`src/utils/EventBus.js`). Isso impede o acoplamento direto entre cenas e reduz a dependência de chamadas diretas a serviços.

---

## 9. Escalabilidade e Evolução

Esta arquitetura permite:

*   Adicionar novas telas (Scenes) sem impactar as existentes.
*   Modificar a aparência (Themes) sem reescrever a lógica.
*   Trocar ou atualizar o serviço de API alterando apenas o `ApiClient`.
*   Adicionar novas fontes de jogos (além do OPL) criando um novo serviço similar ao `OplService`.
*   Implementar transições de tela animadas (fades, slides) de forma isolada, possivelmente em um novo diretório `src/core/transitions/`.

---

## 10. Escopo e Limites (O que o Frontend NÃO Faz)

Para evitar *feature creep* e manter o foco, é importante definir o que **não** é responsabilidade deste frontend:

*   **Não gerencia save games**: A responsabilidade por salvar e carregar jogos é do próprio jogo ou do emulador/serviço que o executa.
*   **Não valida arquivos de jogos (ISOs)**: O frontend assume que os jogos listados pelo OPL ou outra fonte são válidos e funcionais.
*   **Não substitui as funcionalidades do OPL**: Ele atua como uma "pele" ou interface para o OPL, mas não implementa a lógica de carregamento de dispositivos (USB, SMB, HDD).
*   **Não mantém estado após um reboot**: Toda vez que o console é reiniciado (inclusive via IGR), a aplicação é recarregada do zero. A persistência de dados do usuário deve ser feita via serviços externos ou arquivos de configuração.