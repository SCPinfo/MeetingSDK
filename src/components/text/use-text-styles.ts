import { TextStyle } from "react-native"
import { typography } from "../../theme"
import { fontSizeStyles } from "./text.presets"
import { useTheme } from "../../hooks/use-theme"

export function useTextStyle() {
    const theme =useTheme()
    /**
     * All text will start off looking like this.
     */
    const BASE: TextStyle = {
        fontFamily: typography.primary,
        color: theme.colors.secondaryTextColor,
        fontSize: fontSizeStyles.l *theme.fontSizeMultiplier,
    }
    /**
     * All the variations of text styling within the app.
     *
     * You want to customize these to whatever you need in your app.
     */
    const presets = {
        /**
         * The default text styles.
         */
        default: BASE,

        /**
         * A bold version of the default text.
         */
        bold: { ...BASE, fontWeight: "bold" } as TextStyle,

        /**
         * Large headers.
         */
        header: { ...BASE, fontSize: fontSizeStyles.xxbl *theme.fontSizeMultiplier, fontWeight: "bold" } as TextStyle,

        /**
         * Field labels that appear on forms above the inputs.
         */
        fieldLabel: { ...BASE, fontSize: fontSizeStyles.sm *theme.fontSizeMultiplier, color: theme.colors.secondaryTextColor, textAlign: "left" } as TextStyle,

        /**
         * A smaller piece of secondary information.
         */
        secondary: { ...BASE, fontSize: fontSizeStyles.xxxs *theme.fontSizeMultiplier, color: theme.colors.secondaryTextColor } as TextStyle,

        error: { ...BASE, fontSize: fontSizeStyles.s *theme.fontSizeMultiplier, color: theme.colors.errorColor },
    }
    return {
        BASE,
        presets
    }
}