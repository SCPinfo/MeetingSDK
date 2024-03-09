import { TextStyle, ViewStyle } from "react-native"
import { useTheme } from "../../../../hooks/use-theme"
import { useCommonStyles } from "../../../../use-common-styles"
import { opacity } from "../../../../utils/theme-helper"
import { fontSizeStyles } from "../../../../components/text/text.presets"
import { typography } from "../../../../theme"

export function useRoomHeaderStyle() {
    const { highZIndex } = useCommonStyles()
    const theme = useTheme()
    const whiteColor = theme.colors.white


    const headerText: ViewStyle = {
        maxWidth: "66%",
        alignItems: "center"
    }

    const headerContainer: ViewStyle = {
        ...highZIndex,
        paddingTop: 10,
        paddingBottom: 10,
        position: "absolute",
        width: "98%",
        backgroundColor: opacity(theme.colors.callBackgroundColor, 0.9),
        borderRadius: 10,
        borderColor: theme.colors.secondaryTextColor,
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        top: 30, right: 4, left: 4,
    }
    const textShadowStyle: TextStyle = {
        textShadowColor: opacity(theme.colors.shadowColor, 0.7),
        textShadowOffset: { width: 0, height: 1.2 },
        textShadowRadius: 3,
    }

    const meetingTitleStyle: TextStyle = {
        ...textShadowStyle,
        fontSize: fontSizeStyles.xxl * theme.fontSizeMultiplier, fontFamily: typography.medium, color: theme.colors.white,
    }
    const timerStyle: TextStyle = {
        ...textShadowStyle,
        fontSize: fontSizeStyles.s * theme.fontSizeMultiplier, color: theme.colors.white,
        marginTop: 4,
    }
    const headerTextContainer: ViewStyle = {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1
    }
    const actionsContainer: ViewStyle = {
        flexDirection: 'row', alignItems: 'center'
    }
    return {

        headerText,
        headerContainer,
        meetingTitleStyle,
        timerStyle,
        textShadowStyle,
        headerTextContainer,
        whiteColor,
        actionsContainer

    }

}