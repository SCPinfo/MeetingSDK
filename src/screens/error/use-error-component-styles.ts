import { TextStyle, ViewStyle } from "react-native"
import { fontSizeStyles } from "../../components/text/text.presets"
import { useTheme } from "../../hooks/use-theme"

export function useErrorComponentStyles() {
    const theme =useTheme()
    const CONTAINER: ViewStyle = {
        alignItems: "center",
        flex: 1,
        padding: 16,
        paddingVertical: 50,
        backgroundColor: theme.colors.containerColor,
    }

    const BTN_RESET: ViewStyle = {
        paddingHorizontal: 40,
        backgroundColor: theme.colors.signatureColor,
        marginVertical: 30,
    }

    const TITLE_ERROR: TextStyle = {
        color: theme.colors.errorColor,
        fontWeight: "bold",
    }

    const FRIENDLY_SUBTITLE: TextStyle = {
        color: theme.colors.primaryTextColor,
        fontWeight: "normal",
        paddingVertical: 15,
         fontSize: fontSizeStyles.m 
    }



    // Uncomment this and the Text component in the ErrorComponent if
    // you want to see a backtrace in your error reporting screen.
    // const CONTENT_BACKTRACE: TextStyle = {
    //   color: color.dim,
    // }



    const ANIMATION_CONTAINER: ViewStyle = { width: '100%', height: 300 }
    return {
        CONTAINER,
        BTN_RESET,
        TITLE_ERROR,
        FRIENDLY_SUBTITLE,
        ANIMATION_CONTAINER,
    }
}
