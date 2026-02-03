import Colors from './colors.js';
import Fonts from './fonts.js';

const TextStyles = {
    UNSELECTED_NAVMENU: {
        font: Fonts.REGULAR,
        color: Colors.SECONDARY_TEXT,
        scale: 0.75f,
    },
    SELECTED_NAVMENU: {
        font: Fonts.BOLD,
        color: Colors.PRIMARY_TEXT,
        scale: 0.85f,
    },
    DASHBOARD_BUTTON: {
        font: Fonts.SEMIBOLD,
        color: Colors.PRIMARY_TEXT,
        scale: 0.6f,
    },
}

export default TextStyles;