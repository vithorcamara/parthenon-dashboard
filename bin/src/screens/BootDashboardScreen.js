// Parthenon/src/screens/BootScreen.js

import LogoRevealScreen from './BootStartScreen.js';

import Colors from '../ui/Colors.js';
import Fonts from '../ui/Fonts.js';
import TextStyles from '../ui/Texts.js';

const data_screen = Screen.getMode();

export default class BootDashboardScreen {
    constructor({ input, screenManager }) {
        this.input = input;
        this.screenManager = screenManager;

        this.gameFont = null;

        // =========================
        // NAVIGATION MENU
        // =========================
        this.navItems = LANG.DASHBOARD.NAVMENU;
        this.activeNavIndex = 0;

        // =========================
        // HOME TILES
        // =========================
        this.homeTiles = [
            {
                id: "disc",
                title: "Iniciar disco",
                x: 60,
                y: 125,
                w: 120,
                h: 100,
                color: Color.new(0, 90, 255),
            },

            {
                id: "recent",
                title: "Recentes",
                x: 60,
                y: 235,
                w: 120,
                h: 100,
                color: Color.new(0, 90, 255),
            },

            {
                id: "discord",
                title: "Entre no nosso servidor Discord",
                x: 190,
                y: 125,
                w: 240,
                h: 210,
                color: Color.new(30, 30, 30),
            },

            {
                id: "profile",
                title: "Ver Perfil",
                x: 440,
                y: 125,
                w: 120,
                h: 100,
                color: Color.new(0, 90, 255),
            },

            {
                id: "guide",
                title: "Guia do Parthenon",
                x: 440,
                y: 235,
                w: 120,
                h: 100,
                color: Color.new(0, 90, 255),
            },
        ];

        console.log("[BootDashboardScreen] Constructor initialized.");
    }

    // =====================================
    // SCREEN LIFECYCLE
    // =====================================

    enter(params) {
        console.log("[BootDashboardScreen] Entering screen.", params);

        try {
            this.gameFont = Fonts.REGULAR;

            console.log("[BootDashboardScreen] Font loaded successfully.");

            Object.entries(data_screen).forEach(([key, value]) => {
                console.log(key, value);
            });

        } catch (e) {
            console.error("[BootDashboardScreen] Failed to load font:", e);
            this.gameFont = null;
        }
    }

    update() {
        this.updateNavMenu();

        // DEBUG / TEMP
        if (this.input.isButtonPressed('start')) {
            console.log("[BootDashboardScreen] START pressed.");

            this.screenManager.loadScreen(LogoRevealScreen);
        }
    }

    render() {
        // =========================
        // BACKGROUND
        // =========================
        Draw.rect(
            0,
            0,
            data_screen.width,
            data_screen.height,
            Colors.BACKGROUND1
        );

        // =========================
        // UI
        // =========================
        this.drawNavMenu();
        this.drawHomeTiles();
    }

    exit() {
        console.log("[BootDashboardScreen] Exiting screen.");

        this.gameFont = null;
    }

    // =====================================
    // NAVIGATION MENU
    // =====================================

    drawNavMenu() {
        if (!this.gameFont) return;

        let x = 90;
        const y = 75;

        this.navItems.forEach((item, index) => {

            const style = (index === this.activeNavIndex)
                ? TextStyles.SELECTED_NAVMENU
                : TextStyles.UNSELECTED_NAVMENU;

            this.gameFont = style.font;
            this.gameFont.color = style.color;
            this.gameFont.scale = style.scale;

            const formattedText =
                item.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

            this.gameFont.print(x, y, formattedText);

            const textSize = this.gameFont.getTextSize(item);

            x += textSize.width + 40;
        });
    }

    updateNavMenu() {
        if (this.input.isButtonPressed("r1")) {

            this.activeNavIndex++;

            if (this.activeNavIndex >= this.navItems.length) {
                this.activeNavIndex = 0;
            }
        }

        if (this.input.isButtonPressed("l1")) {

            this.activeNavIndex--;

            if (this.activeNavIndex < 0) {
                this.activeNavIndex = this.navItems.length - 1;
            }
        }
    }

    // =====================================
    // HOME DASHBOARD
    // =====================================

    drawHomeTiles() {
        if (!this.gameFont) return;

        this.homeTiles.forEach(tile => {

            // =========================
            // TILE BACKGROUND
            // =========================
            Draw.rect(
                tile.x,
                tile.y,
                tile.w,
                tile.h,
                tile.color
            );

            // =========================
            // TILE TITLE
            // =========================
            this.gameFont = Fonts.REGULAR;

            this.gameFont.color = Color.new(255, 255, 255);

            this.gameFont.scale = 0.45;

            this.gameFont.print(
                tile.x + 10,
                tile.y + tile.h - 20,
                tile.title
            );
        });
    }
}