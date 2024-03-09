import React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { isIOS } from "../../utils/platform"
import { isTextArabic } from "../../utils/methods"
import { useTextFieldStyles } from "./use-text-field-styles"



// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
  withUnderLine?: boolean
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    CONTAINER,
    INPUT,
    UNDERLINE,
    hintColor,
    transparent
  } = useTextFieldStyles()
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    placeholderTextColor,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    withUnderLine,
    ...rest
  } = props


  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride, withUnderLine ? UNDERLINE : null]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyles}>
      {(labelTx || label) && <Text preset="fieldLabel" tx={labelTx} text={label} />}
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={placeholderTextColor ?? hintColor}
        underlineColorAndroid={transparent}
        style={[inputStyles, { writingDirection: isIOS() ? isTextArabic(rest.value || actualPlaceholder) ? 'rtl' : 'ltr' : "auto" }]}
        ref={forwardedRef}
        textAlign={isIOS() ? isTextArabic(rest.value || actualPlaceholder) ? 'right' : 'left' : undefined}
        {...rest}
      />
    </View>
  )
}
