# 🏛️ Parthenon Dashboard
O **Parthenon Dashboard** é um frontend moderno, inspirado no estilo Metro do Xbox 360, para o PlayStation 2, desenvolvido com **AthenaEnv** e **JavaScript**. Este projeto não é apenas um launcher, mas um **sistema central** para a experiência do usuário, projetado para orquestrar e integrar ferramentas existentes da cena PS2, como **OPL (Open PS2 Loader)**, **LaunchELF** e **Popstarter**.
Para mais detalhes sobre a filosofia do projeto, veja o [Documento de Conceito](./Docs/Concept.md).

---

## 🌟 Visão do Projeto
O objetivo é criar uma experiência de usuário que não seja apenas uma aplicação, mas uma **experiência em nível de sistema** para o PlayStation 2. Os principais objetivos são:
- **Centralização:** Unificar jogos, aplicações e mídia em um único lugar.
- **Orquestração:** Integrar e gerenciar ferramentas consolidadas da comunidade (OPL, LaunchELF, etc.) sob uma interface coesa.
- **UX Moderna:** Oferecer uma navegação fluida, baseada em hubs, inspirada nos dashboards dos consoles da 7ª geração.
- **Acessibilidade:** Construído em JavaScript sobre o AthenaEnv para reduzir a barreira de entrada para novos colaboradores.
A interface é projetada como um “espaço arquitetônico”, com hubs claros e organizados e foco em minimalismo e funcionalidade, refletindo os princípios do próprio Parthenon.
Para mais detalhes sobre a visão de design, veja o [Documento de Visão de UX](./Docs/UXVD.md).

---

## ✨ Funcionalidades
- **Launcher de Jogos:** Integração com OPL para listar e iniciar jogos de PS2.
- **Interface Inspirada no Metro:** Navegação moderna e visualmente agradável do Xbox 260.
- **Suporte a Temas:** Personalize cores, fontes e layouts através de arquivos de configuração simples.
- **Arquitetura Escalável:** Baseada em Cenas e Serviços para facilitar a adição de novas funcionalidades.
- **Construído com JavaScript:** Utiliza o poder do [AthenaEnv](https://github.com/DanielSant0s/AthenaEnv) para desenvolvimento rápido e acessível no PS2.

---

## 🚀 Começando
Para rodar este projeto, você precisará de um emulador de PlayStation 2 como o [PCSX2](https://pcsx2.net/).

### Rodando no Emulador (PCSX2)
1. **Habilite o Host Filesystem:**
   - No PCSX2, vá para `Configurações > Emulação`.
   - Marque a caixa **"Enable host filesystem"**.
2. **Inicie o Frontend:**
   - No menu principal do PCSX2, vá para `Sistema > Iniciar Arquivo...`.
   - Navegue até a pasta do projeto e selecione o arquivo `Parthenon/parthenon.elf`.
O frontend deverá carregar e exibir a interface.

### Criando uma `.iso` para Distribuição
Para rodar o projeto em hardware real ou para uma distribuição mais simples, você pode criar um arquivo `.iso`.
1. **Compacte os Arquivos:**
   - Selecione **todos os arquivos e pastas** dentro da pasta `Parthenon`.
   - Crie um arquivo `.zip` a partir desses arquivos. **Importante:** Certifique-se de que os arquivos estejam na raiz do zip, e não dentro de uma subpasta.
2. **Converta para `.iso`:**
   - Utilize uma ferramenta online como o [mconverter.eu](https://mconverter.eu/) ou um software de sua preferência para converter o arquivo `.zip` em uma `.iso`.
3. **Inicie a `.iso`:**
   - No PCSX2, vá para `Sistema > Iniciar ISO...` e selecione o arquivo `.iso` recém-criado.

---

## 📂 Estrutura do Projeto
A arquitetura do projeto é projetada para ser modular e de fácil manutenção. Para um guia completo, consulte nosso [Software Architecture Document (SAD)](./Docs/SAD.md).
```
/
└── Parthenon/
    ├── assets/          # Recursos visuais, sonoros e de tema
    ├── src/             # Código-fonte da aplicação em JavaScript
    │   ├── app/         # Lógica de negócio e serviços
    │   ├── config/      # Configurações globais
    │   ├── core/        # Núcleo da aplicação (loop, cenas, input)
    │   ├── scenes/      # Telas individuais da aplicação
    │   ├── ui/          # Componentes de UI reutilizáveis
    │   └── utils/       # Funções utilitárias
    ├── main.js          # Ponto de entrada da aplicação
    ├── parthenon.elf    # O executável do AthenaEnv
    ├── SYSTEM.CNF       # Configuração de boot do PS2
    └── ...
```

---

## 🤝 Contribuindo
Adoraríamos ter sua ajuda para tornar este frontend ainda melhor! Se você tem ideias, sugestões ou quer contribuir com AthenaEnv, por favor, leia o [guia de contribuição](./Docs/Parthenon/3-%20Contributing.md).

---

## 📄 Licença
Este projeto é distribuído sob a licença [GPL-3.0](./LICENSE) e para mais informações sobre a licensa do AthenaEnv, veja o arquivo de [LICENÇA](./Docs/Parthenon/4-%20License.md) para mais detalhes.

---

## ❤️ Agradecimentos
Um agradecimento especial a todos que contribuíram direta ou indiretamente para este projeto. Veja a lista de [AGRADECIMENTOS](./Docs/Parthenon/6-%20Thanks.md) do AthenaEnv.