const HomeDashboard = {
    "B1": {
        "action": LogoRevealScreen,
        "size": "1x1",
        "label": Texts.BOOT_DASHBOARD_BUTTON_1,
        "icon": "disc"
    },
    "B2": {
        "label": Texts.BOOT_DASHBOARD_BUTTON_2,
        "action": () => { console.log("[BootScreen] Botao B1 pressionado!");
            this.screenManager.loadScreen(LogoRevealScreen);
        },
        "size": "2x2"
    },
    "B3": null,
    "B4": {
        "action": LogoRevealScreen,
        "size": "1x1",
        "label": Texts.BOOT_DASHBOARD_BUTTON_1,
        "icon": "disc"
    },
    "B5": {
        "action": LogoRevealScreen,
        "size": "1x1",
        "label": Texts.BOOT_DASHBOARD_BUTTON_1,
        "icon": "disc"
    },
    "B6": null,
    "B7": null,
    "B8": {
        "action": LogoRevealScreen,
        "size": "1x1",
        "label": LANG.DASHBOARD.HOME.B8,
        "icon": "disc"
    }
};