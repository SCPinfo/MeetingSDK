import { ViewStyle } from "react-native"
import { useTheme } from "./hooks/use-theme"
import { useStaticStyles } from "./use-static-styles"
import { opacity } from "./utils/theme-helper"
import { ThemeModeEnum } from "./enums/theme-mode-enum"
import I18n from "i18n-js"
import { LanguageEnum } from "./enums/language-enum"

export function useCommonStyles() {
  const theme = useTheme()
  const containerColor =theme.colors.containerColor
  const backgroundColor =theme.colors.backgroundColor
  const wallpaperPatternColor = theme.colors.wallpaperPatternColor
  const { flexOne, flexGrowOne, flexGrowZero, w100, w80, streamContainer, alignSelfStart, highZIndex, fullHeightWidth } = useStaticStyles()
  const statusBarColor:"light-content" | "dark-content" = theme.mode===ThemeModeEnum.Light?"dark-content":"light-content"
  const imageActivityIndicator: ViewStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    bottom: 0,
    backgroundColor: opacity(theme.colors.backgroundColor,0.2),
    zIndex: 9999
  }

  const headerContainerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.backgroundColor,
    width: "100%",
    paddingHorizontal: 15
  }

  const flippedIconStyle : null | { transform: { scaleX: number }[] } = I18n.locale === LanguageEnum.English ? null: {transform:[{scaleX:-1}]}

  const centeredFlex:ViewStyle={
    flex: 1,
    justifyContent: "center",
    alignItems:"center"
  }

  return {
    flexOne,
    flexGrowOne,
    flexGrowZero,
    w100,
    w80,
    imageActivityIndicator,
    streamContainer,
    alignSelfStart,
    highZIndex,
    headerContainerStyle,
    fullHeightWidth,
    containerColor,
    wallpaperPatternColor,
    statusBarColor,
    backgroundColor,
    flippedIconStyle,
    centeredFlex
  }
}
