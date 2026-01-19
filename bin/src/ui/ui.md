# Diretório `src/ui`

Este diretório contém **componentes de interface reutilizáveis e de baixo nível**.

Estes são os "blocos de construção" fundamentais da nossa UI. Eles são "burros" (não têm lógica de negócio) e são altamente configuráveis e reutilizáveis em qualquer parte da aplicação. A principal responsabilidade deles é renderizar algo na tela e, opcionalmente, responder a input básico.

Exemplos:
- **Button.js**: Renderiza um botão com um texto e/ou ícone, e pode ser focado e clicado.
- **Label.js**: Renderiza um texto simples na tela com uma determinada fonte e cor.
- **Image.js**: Renderiza uma imagem em uma posição específica.
- **DialogBox.js**: Renderiza uma caixa de diálogo para exibir mensagens ao usuário.

> **Nota de Atenção**: Conforme o SAD, é importante não criar hierarquias de componentes muito profundas ou abstrações excessivas aqui, para manter a performance alta no hardware do PS2.
