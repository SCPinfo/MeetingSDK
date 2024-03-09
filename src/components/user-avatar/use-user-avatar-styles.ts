import { TextStyle, ViewStyle } from "react-native"
import { typography } from "../../theme"
import { useTheme } from "../../hooks/use-theme"
import { getRandomColor } from "../../utils/methods";

export function useUserAvatarStyles() {
  const theme = useTheme()
  const signatureChildColor = theme.colors.signatureChildColor

  const imageHandler = (size): ViewStyle => {
    return {
      overflow: "hidden",
      height: size,
      width: size,
      justifyContent:"center",
      borderRadius: size / 2,
    }
  }

  const dimensionsStyle = (size): ViewStyle => {
    return {
      height: size,
      width: size,
      justifyContent:"center",
      borderRadius: size / 2,
    }
  }

  const nameStyle = (size): TextStyle => {
    return {
      fontSize: size / 2.2,
      color: theme.colors.white,
      fontFamily: typography.medium
    }
  }

  const nameAvatar = (primaryBackground: boolean, randomBackground?: string,name = ""): ViewStyle => {
    const randomColor = randomBackground ?? getRandomColor(name)
    return {
      backgroundColor: primaryBackground ? theme.colors.signatureColor : randomColor,
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf:"center"
    }
  }


  const defaultAvatar: ViewStyle = {
    backgroundColor: theme.colors.signatureColor,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }


  return {
    imageHandler,
    nameStyle,
    nameAvatar,
    defaultAvatar,
    signatureChildColor,
    dimensionsStyle
  }
}
