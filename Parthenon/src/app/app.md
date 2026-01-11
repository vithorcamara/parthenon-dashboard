# Diretório `src/app`

Este diretório contém a **lógica de negócio** e os sistemas que governam a aplicação. Enquanto `src/core` é o "motor", `src/app` é o "carro" construído sobre ele.

O código aqui é específico para as funcionalidades do frontend de PS2.

## Subdiretórios

- **services/**: Contém a lógica para interagir com sistemas externos ou gerenciar estado complexo. Por exemplo, `OplService.js` para se comunicar com o Open PS2 Loader, ou `UserService.js` para gerenciar o perfil do usuário.
- **components/**: Agrupa componentes de UI mais complexos e específicos de domínio, que são reutilizados em diferentes cenas mas não são genéricos o suficiente para pertencerem a `src/ui`. Um bom exemplo é `GameList.js`, que encapsula a lógica de renderizar e navegar por uma lista de jogos.
