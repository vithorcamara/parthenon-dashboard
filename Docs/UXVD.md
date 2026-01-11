# Parthenon Dashboard
## UX Vision Document — An Architectural Dashboard

---

## 1. Objetivo do Documento

Este documento complementa o **Software Architecture Document (SAD)**, descrevendo a **visão de experiência do usuário (UX)** e as **diretrizes visuais (UI)** do **Parthenon Dashboard** para PlayStation 2.

Enquanto o SAD define **como o sistema é construído**, este documento define:

-   Como o sistema **deve parecer**: uma interface estruturada e ordenada.
-   Como o usuário **interage**: navegação clara e previsível.
-   Quais princípios visuais devem ser seguidos: minimalismo funcional e foco no conteúdo.
-   O que caracteriza o dashboard como um **espaço arquitetônico e central**.

Este documento **não descreve implementação técnica**.

---

## 2. Visão Geral da Experiência

O **Parthenon Dashboard** busca oferecer uma experiência de **sistema**, não apenas de aplicativo. A visão é:

-   **Estruturada e Organizada**: A interface é organizada em hubs bem definidos, como "alas" de um edifício.
-   **Centralizadora**: Unifica jogos, apps e mídia em um ambiente coeso.
-   **Moderna e Limpa**: Inspirada em princípios de design "Metro", mas com identidade própria.
-   **Legível e Acessível**: Otimizada para uso com controle e legibilidade em TVs CRT e LCD.
-   **Fluida e Responsiva**: Performance otimizada para as limitações do hardware do PS2.

O sistema deve parecer um **dashboard de console**, refletindo a solidez e a ordem de uma estrutura arquitetônica.

---

## 3. O que “Metro-like” Significa Neste Projeto

O frontend **não replica** o Metro Dashboard original.  
Ele se **inspira** nos seus princípios.

### 3.1 Princípios Herdados do Metro

- Navegação **horizontal por hubs**
- Elementos grandes e legíveis
- Foco em conteúdo, não em molduras
- Animações simples e funcionais
- Feedback visual claro de foco/seleção
- Interface “flat” (sem efeitos pesados)

---

### 3.2 O que NÃO será copiado

- Assets proprietários do Xbox
- Layouts idênticos
- Tipografia original
- Gestos Kinect
- Comportamento exato do sistema original

A identidade visual será **original**, apenas inspirada.

---

## 4. Estrutura Conceitual da Dashboard

### 4.1 Hubs Principais

A navegação principal é composta por **hubs horizontais**:

```

[ Home ] [ Jogos PS2 ] [ Jogos PS1 ] [ Apps ] [ Online ] [ Configurações ]

```

- Apenas **um hub ativo por vez**
- Movimento horizontal troca hubs
- Movimento vertical navega dentro do hub

---

### 4.2 Tiles

Os conteúdos são apresentados como **tiles**:

- Tiles grandes (conteúdo principal)
- Tiles médios (listas)
- Tiles pequenos (atalhos/configurações)

Características:
- Sem bordas pesadas
- Cor sólida ou imagem simples
- Destaque claro quando selecionado

---

## 5. Navegação e Input

### 5.1 Navegação por Controle

- Direcional / Analógico: navegação
- `CONFIRM`: ação principal
- `CANCEL`: voltar
- `START`: menu contextual (quando aplicável)

A navegação deve ser:

- Previsível
- Consistente entre telas
- Baseada em **foco**, não em cursor livre

---

### 5.2 Foco Visual

O elemento em foco deve:

- Ter contraste claro
- Ser ligeiramente maior ou destacado
- Nunca deixar dúvida sobre onde o foco está

---

## 6. Animações e Transições

### 6.1 Princípios

- Animações curtas (100–250ms)
- Sempre funcionais (nunca decorativas)
- Nunca bloquear input por muito tempo
- Nunca causar queda perceptível de FPS

---

### 6.2 Tipos Permitidos

- Fade in / fade out
- Slide horizontal entre hubs
- Slide vertical em listas
- Destaque suave ao focar tile

---

### 6.3 O que Evitar

- Blur
- Partículas
- Sombras dinâmicas
- Overdraw excessivo

---

## 7. Tipografia

- Fonte simples e altamente legível
- Prioridade absoluta para leitura em 480i
- Hierarquia clara:
  - Títulos
  - Subtítulos
  - Texto informativo

A tipografia deve reforçar o estilo **limpo e moderno**, sem serifas ou ornamentos.

---

## 8. Cores e Temas

### 8.1 Temas

A aparência é controlada por arquivos de tema (`assets/themes/*.json`).

Cada tema define:
- Cores primárias
- Cores de destaque
- Cores de fundo
- Espaçamento base
- Estilo de tiles

---

### 8.2 Contraste

- Sempre priorizar contraste alto
- Evitar texto claro sobre fundo claro
- Evitar cores vibrantes demais em CRT

---

## 9. Feedback ao Usuário

O sistema deve sempre responder às ações do usuário:

- Som curto ao navegar
- Animação ao confirmar
- Mensagens claras para erros ou estados vazios

Estados importantes:
- Carregando
- Nenhum jogo encontrado
- Sem conexão
- Login inválido

---

## 10. Consistência entre Scenes

Independentemente da Scene:

- Navegação segue o mesmo padrão
- Botões semânticos mantêm significado
- Estilo visual permanece consistente
- Transições seguem as mesmas regras

Scenes **não devem** reinventar comportamento de UI.

---

## 11. Acessibilidade e Conforto

- Elementos grandes
- Texto legível à distância
- Sem excesso de informação simultânea
- Tempo suficiente para leitura

---

## 12. Limites da Experiência

Este frontend **não tenta**:

- Imitar fielmente dashboards modernos
- Competir visualmente com consoles atuais
- Introduzir multitarefa
- Executar conteúdo em background

A prioridade é **fluidez, clareza e estabilidade**.

---

## 13. Resumo da Visão

O AthenaEnv Frontend deve:

- Parecer um console moderno dentro do possível
- Ser simples, rápido e direto
- Honrar as limitações do PS2
- Inspirar-se no Metro sem copiá-lo
- Servir como base sólida para evolução futura

---

## 📌 Como usar esse documento
* Ele **não substitui** o SAD
* Ele **guia decisões de UI**
* Pode ser entregue a:
  * Designers
  * Colaboradores
  * Quem for criar temas
* Pode evoluir sem quebrar arquitetura
Próximos passos:
* Criar um **wireframe ASCII ou visual**
* Especificar **regras exatas de grid**
* Definir **tamanhos reais de tiles (px)**
* Criar um **checklist de conformidade Metro-like**
Esse projeto já está com **documentação de gente grande** 👌
