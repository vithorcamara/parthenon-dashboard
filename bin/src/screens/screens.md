# Diretório `src/screens`

Este diretório contém os módulos para cada **tela ou estado completo** da aplicação. Uma "cena" representa um "hub" na visão da UX.

Cada arquivo aqui define uma cena coesa e autônoma, responsável por sua própria lógica de `update` e `render`.

Exemplos de cenas:
- **Bootscreen.js**: A primeira cena, responsável por carregar assets globais e verificar o estado inicial do sistema.
- **Homescreen.js**: O dashboard principal ou tela de "boas-vindas".
- **GameListscreen.js**: A tela que exibe a lista de jogos disponíveis (PS2, PS1, etc.).
- **Settingsscreen.js**: A tela onde o usuário pode alterar as configurações da aplicação.
- **Loginscreen.js**: Caso a aplicação tenha um sistema de perfis online.

Todas as cenas implementam uma interface comum (`enter`, `update`, `render`, `exit`) para serem gerenciadas pelo `screenManager` de forma consistente. As cenas são responsáveis por carregar e descarregar seus próprios assets para gerenciar a memória de forma eficiente.

