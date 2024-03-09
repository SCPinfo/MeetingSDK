import * as React from "react"
import { ActivityIndicator, Keyboard, TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { useTheme } from "../../hooks/use-theme"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps & { loading?: boolean, loaderColor?: string }) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    loading,
    loaderColor,
    ...rest
  } = props
  const theme =useTheme()
  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  return (
    <TouchableOpacity style={viewStyles} {...rest} onPress={(event) => {
      if (rest.onPress){
        rest.onPress(event)
      }
      Keyboard.dismiss()
    }}>
      {loading ?
        <ActivityIndicator size="small" color={loaderColor ?? theme.colors.signatureChildColor} />
        :
        content
      }
    </TouchableOpacity>
  )
}
