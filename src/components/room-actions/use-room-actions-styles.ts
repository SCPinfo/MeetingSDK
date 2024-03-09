import { TextStyle, ViewStyle } from "react-native"
import { useTheme } from "../../hooks/use-theme";
import { useCommonStyles } from "../../use-common-styles";
import { opacity } from "../../utils/theme-helper";
import { fontSizeStyles } from "../text/text.presets";

export function useRoomActionsStyles() {
  const theme = useTheme()
  const { highZIndex } = useCommonStyles()
  const backgroundColor = theme.colors.backgroundColor
  const signatureColor = theme.colors.signatureColor
  const primaryTextColor = theme.colors.primaryTextColor
  const whiteColor = theme.colors.white
  const blackColor = theme.colors.black
  const buttonStyle: ViewStyle = {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  }

  const transparentButtonStyle: ViewStyle = {
    ...buttonStyle,
    backgroundColor: opacity(theme.colors.callBackgroundColor,0.5),
  }

  const activeButtonStyle: ViewStyle = {
    ...buttonStyle,
    backgroundColor: theme.colors.white,
  }

  const rejectButtonStyle: ViewStyle = {
    ...buttonStyle,
    backgroundColor: theme.colors.rejectColor,
  }

  const buttonTextStyle: TextStyle = {
    fontSize: fontSizeStyles.xs * theme.fontSizeMultiplier,
    color: theme.colors.white,
    marginTop: 4,
  }

  const buttonContainer: ViewStyle = {
    alignItems: "center",
  }

  const buttonsContainer: ViewStyle = {
    flexDirection: "row",
    flexWrap:"wrap",
    rowGap:15,
    columnGap:40,
    justifyContent: "space-evenly",
    width:"100%",
    alignSelf: "center",
  }

  const actionsContainer: ViewStyle = {
    ...highZIndex,
    position: "absolute",
    bottom: 20,
    right:0,
    left:0,
    borderRadius:20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems:'center',
    width:'100%',
  }

  const reconnectingContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    width:"100%",
    alignSelf: "center",
  }

  const defaultSheetItem: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 15,
  }

  return {
    buttonStyle,
    transparentButtonStyle,
    activeButtonStyle,
    rejectButtonStyle,
    buttonTextStyle,
    buttonContainer,
    buttonsContainer,
    reconnectingContainer,
    defaultSheetItem,
    backgroundColor,
    signatureColor,
    primaryTextColor,
    whiteColor,
    blackColor,
    actionsContainer,
  }
}
