import { ViewStyle, TextStyle } from "react-native"
import { spacing, typography } from "../../theme"
import { useTheme } from "../../hooks/use-theme"
import { fontSizeStyles } from "../text/text.presets"
import { opacity } from "../../utils/theme-helper"

export function useTextFieldStyles() {
    const theme = useTheme()
    const hintColor = theme.colors.hintColor
    const transparent = theme.colors.transparent

    // the base styling for the container
    const CONTAINER: ViewStyle = {
        paddingVertical: spacing[1],
        width: "100%",
    }

    // the base styling for the TextInput
    const INPUT: TextStyle = {
        fontFamily: typography.primary,
        color: theme.colors.primaryTextColor,
        minHeight: 44,
        fontSize: fontSizeStyles.xl * theme.fontSizeMultiplier,
        backgroundColor: theme.colors.containerColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor:  opacity(theme.colors.dividerColor,0.2),
        marginTop: 5,
        paddingHorizontal: 10,

        // https://github.com/callstack/react-native-paper/issues/2581
        paddingVertical: 3
    }

    const UNDERLINE: TextStyle = {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.signatureColor,
    }

    return {
        CONTAINER,
        INPUT,
        UNDERLINE,
        hintColor,
        transparent
    }
}
