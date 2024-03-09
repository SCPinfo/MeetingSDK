import { ViewStyle, TextStyle } from "react-native"
import { spacing } from "../../theme"
import { useTheme } from "../../hooks/use-theme"

const theme = useTheme()
/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingHorizontal: 30,
  paddingVertical: 12,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
}


export const buttonText: TextStyle = { color: theme.colors.signatureChildColor, fontWeight: "bold" }
/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: theme.colors.signatureColor} as ViewStyle,

  textButton :{  ...BASE_VIEW},
  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: {  color: theme.colors.signatureChildColor, fontWeight: "bold" } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: theme.colors.signatureChildColor,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
