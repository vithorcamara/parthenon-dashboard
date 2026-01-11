# Diretório `src`

Este é o diretório raiz para todo o **código-fonte** da aplicação, escrito em JavaScript.

A estrutura de subdiretórios dentro de `src` foi projetada para seguir o princípio da **Separação de Responsabilidades**, um dos pilares da arquitetura definida no SAD. Cada subdiretório tem um propósito claro e bem definido:

- **config/**: Constantes e dados de configuração globais.
- **core/**: A infraestrutura base da aplicação (motor).
- **scenes/**: Cada uma das telas principais da aplicação.
- **app/**: A lógica de negócio e os sistemas que governam a aplicação.
- **ui/**: Componentes de interface reutilizáveis e de baixo nível.
- **utils/**: Funções e classes utilitárias genéricas.

O arquivo `main.js` na raiz do projeto é o ponto de entrada, responsável por inicializar o sistema a partir do código contido aqui.
