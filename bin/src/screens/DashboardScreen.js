// Parthenon/src/screens/BootScreen.js

import LogoRevealScreen from './BootScreen.js';

import Colors from '../ui/Colors.js';
import Fonts from '../ui/Fonts.js';

import DashboardGrid from '../app/components/DashboardGrid.js';
import DashboardNav from '../app/components/DashboardNav.js';

const data_screen = Screen.getMode();

export default class BootDashboardScreen {

    constructor({ input, screenManager }) {
        this.input = input;
        this.screenManager = screenManager;
        this.gameFont = null;

        // DATA
        this.navItems = LANG.DASHBOARD.NAVMENU;
        this.activeNavIndex = 0;
        this.selectedTileIndex = 0;

        console.log("[BootDashboardScreen] Constructor initialized.");
    }

    // SCREEN LIFECYCLE
    enter(params) {
        console.log("[BootDashboardScreen] Entering screen.", params);
        this.gameFont = Fonts.REGULAR;
    }

    update() {
        // 1. Navigation Menu (Tabs)
        const newNavIndex = DashboardNav.handleInput(
            this.input, 
            this.activeNavIndex, 
            this.navItems.length
        );

        if (newNavIndex !== this.activeNavIndex) {
            this.activeNavIndex = newNavIndex;
            this.selectedTileIndex = 0; // Reset focus on tab change
        }

        // 2. Tile Grid Navigation (Now fully handled by component)
        this.selectedTileIndex = DashboardGrid.handleInput(
            this.input,
            this.getCurrentMenu().tiles,
            this.selectedTileIndex
        );

        // DEBUG / TEMP
        if (this.input.isButtonPressed('start')) {
            this.screenManager.loadScreen(LogoRevealScreen);
        }
    }

    render() {
        // BACKGROUND
        Draw.rect(0, 0, data_screen.width, data_screen.height, Colors.BACKGROUND1);

        // UI COMPONENTS
        DashboardNav.render(this.navItems, this.activeNavIndex);
        
        DashboardGrid.render(
            this.getCurrentMenu().tiles,
            this.selectedTileIndex
        );
    }

    exit() {
        console.log("[BootDashboardScreen] Exiting screen.");
        this.gameFont = null;
    }

    // DATA HELPERS
    getCurrentMenu() {
        return this.navItems[this.activeNavIndex];
    }

    getSelectedTile() {
        return this.getCurrentMenu().tiles[this.selectedTileIndex];
    }
}
