# Diretório `src/app/services`

Este diretório contém "serviços", que são módulos responsáveis por gerenciar uma área de responsabilidade específica, interagir com sistemas externos ou encapsular lógica de negócio complexa.

Serviços são a ponte entre a UI (Cenas) e o "mundo exterior" ou o estado persistente da aplicação. Eles ajudam a manter as cenas mais limpas e focadas na apresentação.

Exemplos de serviços:
- **OplService.js**: Único responsável por saber como se comunicar com o Open PS2 Loader (OPL). Ele expõe métodos simples como `launchGame(gameId)`, escondendo toda a complexidade da comunicação subjacente.
- **ApiClient.js**: Gerencia toda a comunicação com uma API externa (se houver), como buscar perfis de usuário, listas de jogos online ou placares.
- **UserService.js**: Mantém o estado do usuário logado, suas preferências e dados de perfil.
