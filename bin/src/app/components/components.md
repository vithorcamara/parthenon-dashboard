# Diretório `src/app/components`

Este diretório agrupa **componentes de UI complexos e específicos do domínio da aplicação**.

Diferente dos componentes em `src/ui` (que são genéricos como `Button` ou `Label`), os componentes aqui têm conhecimento sobre a lógica de negócio da aplicação. Eles são reutilizáveis entre as cenas, mas não são universais.

Exemplos:
- **GameList.js**: Um componente que sabe como receber uma lista de jogos (de um serviço) e renderizá-la na tela, incluindo a arte da capa, o título e a navegação por essa lista.
- **ProfileCard.js**: Um componente que exibe as informações de um perfil de usuário, como avatar, nome e estatísticas.
- **UINavigator.js**: Um sistema mais robusto para gerenciar a navegação e o foco entre um grupo complexo de elementos de UI, específico para as necessidades do dashboard.
