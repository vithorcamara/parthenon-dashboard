// Parthenon/src/screens/BootScreen.js

import LogoRevealScreen from './BootStartScreen.js';

import Colors from '../ui/Colors.js';
import Fonts from '../ui/Fonts.js';
import TextStyles from '../ui/Texts.js';

const data_screen = Screen.getMode();

export default class BootDashboardScreen {

    // =====================================
    // GRID CONFIG
    // =====================================

    static GRID = {
        cols: 4,
        rows: 2,

        startX: 60,
        startY: 125,

        tileW: 120,
        tileH: 100,

        gap: 10,
    };

    constructor({ input, screenManager }) {

        this.input = input;
        this.screenManager = screenManager;

        this.gameFont = null;

        // =====================================
        // NAVIGATION MENU
        // =====================================

        this.navItems =
            LANG.DASHBOARD.NAVMENU;

        this.activeNavIndex = 0;

        // =====================================
        // TILE SELECTION
        // =====================================

        this.selectedTileIndex = 0;

        console.log(
            "[BootDashboardScreen] Constructor initialized."
        );
    }

    // =====================================
    // SCREEN LIFECYCLE
    // =====================================

    enter(params) {

        console.log(
            "[BootDashboardScreen] Entering screen.",
            params
        );

        try {

            this.gameFont = Fonts.REGULAR;

            console.log(
                "[BootDashboardScreen] Font loaded successfully."
            );

            Object.entries(data_screen).forEach(([key, value]) => {
                console.log(key, value);
            });

        } catch (e) {

            console.error(
                "[BootDashboardScreen] Failed to load font:",
                e
            );

            this.gameFont = null;
        }
    }

    update() {

        this.updateNavMenu();

        this.updateTileNavigation();

        // DEBUG / TEMP
        if (this.input.isButtonPressed('start')) {

            console.log(
                "[BootDashboardScreen] START pressed."
            );

            this.screenManager.loadScreen(
                LogoRevealScreen
            );
        }
    }

    render() {

        // =====================================
        // BACKGROUND
        // =====================================

        Draw.rect(
            0,
            0,
            data_screen.width,
            data_screen.height,
            Colors.BACKGROUND1
        );

        // =====================================
        // UI
        // =====================================

        this.drawNavMenu();

        this.drawTiles();
    }

    exit() {

        console.log(
            "[BootDashboardScreen] Exiting screen."
        );

        this.gameFont = null;
    }

    // =====================================
    // CURRENT MENU
    // =====================================

    getCurrentMenu() {

        return this.navItems[
            this.activeNavIndex
        ];
    }

    // =====================================
    // CURRENT TILES
    // =====================================

    getCurrentTiles() {

        const currentMenu =
            this.getCurrentMenu();

        return currentMenu.tiles.map(tile =>
            this.generateTile(tile)
        );
    }

    getSelectedTile() {

        const tiles =
            this.getCurrentTiles();

        return tiles[
            this.selectedTileIndex
        ];
    }

    // =====================================
    // NAVIGATION MENU
    // =====================================

    drawNavMenu() {

        if (!this.gameFont) return;

        let x = 90;

        const y = 75;

        this.navItems.forEach((item, index) => {

            const style =
                (index === this.activeNavIndex)
                    ? TextStyles.SELECTED_NAVMENU
                    : TextStyles.UNSELECTED_NAVMENU;

            this.gameFont =
                style.font;

            this.gameFont.color =
                style.color;

            this.gameFont.scale =
                style.scale;

            const formattedText =
                item.label
                    .toLowerCase()
                    .replace(/\b\w/g, c => c.toUpperCase());

            this.gameFont.print(
                x,
                y,
                formattedText
            );

            const textSize =
                this.gameFont.getTextSize(
                    formattedText
                );

            x += textSize.width + 40;
        });
    }

    updateNavMenu() {

        // =====================================
        // NEXT MENU
        // =====================================

        if (this.input.isButtonPressed("r1")) {

            this.activeNavIndex++;

            if (
                this.activeNavIndex >=
                this.navItems.length
            ) {

                this.activeNavIndex = 0;
            }

            this.selectedTileIndex = 0;
        }

        // =====================================
        // PREVIOUS MENU
        // =====================================

        if (this.input.isButtonPressed("l1")) {

            this.activeNavIndex--;

            if (this.activeNavIndex < 0) {

                this.activeNavIndex =
                    this.navItems.length - 1;
            }

            this.selectedTileIndex = 0;
        }
    }

    // =====================================
    // TILE NAVIGATION
    // =====================================

    updateTileNavigation() {

        const tiles =
            this.getCurrentTiles();

        const currentTile =
            this.getSelectedTile();

        // =====================================
        // RIGHT
        // =====================================

        if (this.input.isButtonPressed("right")) {

            this.selectedTileIndex++;

            if (
                this.selectedTileIndex >=
                tiles.length
            ) {

                this.selectedTileIndex = 0;
            }
        }

        // =====================================
        // LEFT
        // =====================================

        if (this.input.isButtonPressed("left")) {

            this.selectedTileIndex--;

            if (this.selectedTileIndex < 0) {

                this.selectedTileIndex =
                    tiles.length - 1;
            }
        }

        // =====================================
        // DOWN
        // =====================================

        if (this.input.isButtonPressed("down")) {

            const currentSlot =
                parseInt(
                    currentTile.slot.replace("B", "")
                );

            const targetSlot =
                currentSlot + 4;

            const nextTile =
                tiles.find(tile =>
                    parseInt(
                        tile.slot.replace("B", "")
                    ) === targetSlot
                );

            if (nextTile) {

                this.selectedTileIndex =
                    tiles.indexOf(nextTile);
            }
        }

        // =====================================
        // UP
        // =====================================

        if (this.input.isButtonPressed("up")) {

            const currentSlot =
                parseInt(
                    currentTile.slot.replace("B", "")
                );

            const targetSlot =
                currentSlot - 4;

            const nextTile =
                tiles.find(tile =>
                    parseInt(
                        tile.slot.replace("B", "")
                    ) === targetSlot
                );

            if (nextTile) {

                this.selectedTileIndex =
                    tiles.indexOf(nextTile);
            }
        }

        // =====================================
        // ACCEPT
        // =====================================

        if (this.input.isButtonPressed("cross")) {

            const tile =
                this.getSelectedTile();

            console.log(
                `[Dashboard] Launching tile: ${tile.id}`
            );
        }
    }

    // =====================================
    // GRID HELPERS
    // =====================================

    slotToGrid(slot) {

        const index =
            parseInt(
                slot.replace("B", "")
            ) - 1;

        return {

            col:
                index %
                BootDashboardScreen.GRID.cols,

            row:
                Math.floor(
                    index /
                    BootDashboardScreen.GRID.cols
                ),
        };
    }

    generateTile(tile) {

        const GRID =
            BootDashboardScreen.GRID;

        const { col, row } =
            this.slotToGrid(tile.slot);

        const width =
            GRID.tileW * tile.size.w +
            GRID.gap * (tile.size.w - 1);

        const height =
            GRID.tileH * tile.size.h +
            GRID.gap * (tile.size.h - 1);

        const x =
            GRID.startX +
            col * (
                GRID.tileW +
                GRID.gap
            );

        const y =
            GRID.startY +
            row * (
                GRID.tileH +
                GRID.gap
            );

        return {
            ...tile,

            x,
            y,

            w: width,
            h: height,
        };
    }

    // =====================================
    // DRAW DASHBOARD TILES
    // =====================================

    drawTiles() {

        if (!this.gameFont) return;

        const generatedTiles =
            this.getCurrentTiles();

        generatedTiles.forEach((tile, index) => {

            const isSelected =
                index ===
                this.selectedTileIndex;

            // =====================================
            // SELECTION BORDER
            // =====================================

            if (isSelected) {

                Draw.rect(
                    tile.x - 2,
                    tile.y - 2,
                    tile.w + 4,
                    tile.h + 4,
                    Color.new(255, 255, 255)
                );
            }

            // =====================================
            // TILE BACKGROUND
            // =====================================

            Draw.rect(
                tile.x,
                tile.y,
                tile.w,
                tile.h,
                tile.color
            );

            // =====================================
            // TILE TITLE
            // =====================================

            this.gameFont =
                Fonts.REGULAR;

            this.gameFont.color =
                Color.new(255, 255, 255);

            this.gameFont.scale = 0.45;

            this.gameFont.print(
                tile.x + 10,
                tile.y + tile.h - 20,
                tile.title
            );
        });
    }
}