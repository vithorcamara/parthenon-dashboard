export default class DashboardGrid {

    // GRID CONFIGURATION
    static CONFIG = {
        cols: 4,
        rows: 2,

        startX: 30,
        startY: 175,

        tileW: 140,
        tileH: 120,

        gap: 10,
    };

    // COORDINATE CALCULATIONS
    static slotToGrid(slot) {
        const index = parseInt(slot.replace("B", "")) - 1;

        return {
            col: index % DashboardGrid.CONFIG.cols,
            row: Math.floor(index / DashboardGrid.CONFIG.cols),
        };
    }

    static calculateTileBounds(tile) {
        const { col, row } = this.slotToGrid(tile.slot);
        const { tileW, tileH, gap, startX, startY } = DashboardGrid.CONFIG;

        const width = tileW * tile.size.w + gap * (tile.size.w - 1);
        const height = tileH * tile.size.h + gap * (tile.size.h - 1);

        const x = startX + col * (tileW + gap);
        const y = startY + row * (tileH + gap);

        return {
            ...tile,
            x,
            y,
            w: width,
            h: height,
        };
    }

    // RENDER LOGIC
    static render(tiles, selectedIndex) {

        tiles.forEach((rawTile, index) => {

            const tile = this.calculateTileBounds(rawTile);
            const isSelected = (index === selectedIndex);

            // 1. Selection Border
            if (isSelected) {
                Draw.rect(
                    tile.x - 2,
                    tile.y - 2,
                    tile.w + 4,
                    tile.h + 4,
                    Color.new(255, 255, 255)
                );
            }

            // 2. Tile Background
            Draw.rect(
                tile.x,
                tile.y,
                tile.w,
                tile.h,
                tile.color
            );

            // 3. Tile Title
            const font = Fonts.REGULAR;
            if (font) {
                font.color = Color.new(255, 255, 255);
                font.scale = 0.45;
                font.print(
                    tile.x + 10,
                    tile.y + tile.h - 20,
                    tile.title
                );
            }
        });
    }

    // INPUT HANDLING
    static handleInput(input, tiles, currentIndex) {
        let newIndex = currentIndex;
        const currentTile = tiles[currentIndex];

        if (!currentTile) return currentIndex;

        // RIGHT
        if (input.isButtonPressed("right") || input.isButtonPressed("leftAnalogRight")) {
            newIndex++;
            if (newIndex >= tiles.length) {
                newIndex = 0;
            }
        }

        // LEFT
        if (input.isButtonPressed("left") || input.isButtonPressed("leftAnalogLeft")) {
            newIndex--;
            if (newIndex < 0) {
                newIndex = tiles.length - 1;
            }
        }

        // DOWN
        if (input.isButtonPressed("down") || input.isButtonPressed("leftAnalogDown")) {
            const targetSlot = this.getNextVerticalSlot(currentTile.slot, 'down');
            const nextTile = tiles.find(tile => 
                parseInt(tile.slot.replace("B", "")) === targetSlot
            );
            if (nextTile) {
                newIndex = tiles.indexOf(nextTile);
            }
        }

        // UP
        if (input.isButtonPressed("up") || input.isButtonPressed("leftAnalogUp")) {
            const targetSlot = this.getNextVerticalSlot(currentTile.slot, 'up');
            const nextTile = tiles.find(tile => 
                parseInt(tile.slot.replace("B", "")) === targetSlot
            );
            if (nextTile) {
                newIndex = tiles.indexOf(nextTile);
            }
        }

        // ACCEPT / LAUNCH
        if (input.isButtonPressed("cross")) {
            console.log(`[Dashboard] Launching tile: ${currentTile.id}`);
        }

        return newIndex;
    }

    // NAVIGATION HELPERS
    static getNextVerticalSlot(currentSlot, direction) {
        const currentIndex = parseInt(currentSlot.replace("B", ""));
        const offset = (direction === 'down') ? this.CONFIG.cols : -this.CONFIG.cols;
        return currentIndex + offset;
    }
}
