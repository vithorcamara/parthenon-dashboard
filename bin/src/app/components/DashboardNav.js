export default class DashboardNav {
    static handleInput(input, currentIndex, totalItems) {
        let newIndex = currentIndex;

        // NEXT MENU
        if (input.isButtonPressed("r1")) {
            newIndex++;
            if (newIndex >= totalItems) {
                newIndex = 0;
            }
        }

        // PREVIOUS MENU
        if (input.isButtonPressed("l1")) {
            newIndex--;
            if (newIndex < 0) {
                newIndex = totalItems - 1;
            }
        }

        return newIndex;
    }

    static render(navItems, activeIndex) {
        let x = 48;
        const y = 103;

        navItems.forEach((item, index) => {
            const isSelected = (index === activeIndex);
            const style = isSelected ? TextStyles.SELECTED_NAVMENU : TextStyles.UNSELECTED_NAVMENU;

            const font = style.font;
            if (font) {
                font.color = style.color;
                font.scale = style.scale;

                const formattedText = item.label
                    .toLowerCase()
                    .replace(/\b\w/g, c => c.toUpperCase());

                font.print(x, y, formattedText);

                const textSize = font.getTextSize(formattedText);
                x += textSize.width + 40;
            }
        });
    }
}
