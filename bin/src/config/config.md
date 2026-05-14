# Diretório `src/config`

Este diretório define **decisões e dados de configuração globais** que são usados em toda a aplicação. O objetivo é centralizar valores que podem precisar de ajuste, evitando que fiquem "hardcoded" (fixos) em meio à lógica.

Arquivos planejados para este diretório:

- **controls.js**: Realiza o mapeamento semântico dos botões do controle (ex: `CONFIRM = 'X'`, `CANCEL = 'O'`). A aplicação deve usar os nomes semânticos, não os botões físicos, para permitir fácil remapeamento.
- **constants.js**: Armazena constantes da aplicação, como a versão do software, URLs de APIs, chaves de desenvolvimento, etc.
- **settings.js**: Gerencia as configurações que o usuário pode alterar e que devem ser salvas e carregadas, como idioma, tema selecionado ou volume do áudio.
