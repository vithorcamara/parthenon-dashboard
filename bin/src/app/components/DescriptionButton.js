export default class DescriptionButton {

    static BUTTONS = [
        {
            icon: new Image("assets/gfx/icons/cross.png"),
            label: "Selecionar"
        },
        {
            icon: new Image("assets/gfx/icons/circle.png"),
            label: "Voltar"
        },
        {
            icon: new Image("assets/gfx/icons/triangle.png"),
            label: "Detalhes"
        },
        {
            icon: new Image("assets/gfx/icons/square.png"),
            label: "Opções"
        }
    ];

    static render(level = 1) {

        // Limita entre 1 e 4
        if (level < 1) level = 1;
        if (level > 4) level = 4;

        const buttonsToShow = this.BUTTONS.slice(0, level);

        let x = 56;
        const y = 460;

        const style = TextStyles.DESCRIPTION_BUTTON;
        const font = style.font;

        if (!font) return;

        buttonsToShow.forEach((button) => {

            // DESENHAR ÍCONE
            if (button.icon && button.icon.ready()) {
                button.icon.width = 18;
                button.icon.height = 18;
                button.icon.draw(x, y);
            }

            // TEXTO
            font.color = style.color;
            font.scale = style.scale;

            const textX = x + 24; // Espaço após o ícone (32px + margem)
            const textY = y + 4;

            font.print(textX, textY, button.label);

            const textSize = font.getTextSize(button.label);

            // Espaçamento entre botões: ícone(32) + margem(6) + texto + separador(70)
            x += textSize.width + 32;
        });
    }
}