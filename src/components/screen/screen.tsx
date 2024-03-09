import * as React from "react"
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from "react-native"
import {useCalculateKeyboardOffset} from "../../hooks/use-calculate-keyboard-offset";

import { ScreenProps } from "./screen.props"
import { useScreenPresets } from "./screen.presets"
import { useCommonStyles } from "../../use-common-styles"
import { initialWindowMetrics } from "react-native-safe-area-context"
function ScreenWithoutScrolling(props: ScreenProps) {
  const {containerColor,statusBarColor} = useCommonStyles()
  const keyboardOffset = useCalculateKeyboardOffset()
  const {presets}=useScreenPresets()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = { backgroundColor:props.backgroundColor ?? containerColor }

  const insetStyle = { paddingBottom: props.unsafe  ? 0 : initialWindowMetrics?.insets.bottom,backgroundColor:"transparent" }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={"padding"}
      keyboardVerticalOffset={props.keyboardOffset !== 0 ? keyboardOffset : 0}
    >
      <StatusBar barStyle={props.statusBar || statusBarColor} backgroundColor={"transparent"} translucent={true}/>
      <View style={[preset.inner, style]}>
        {props.children}
        <View style={insetStyle}/>
      </View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const {containerColor, statusBarColor} = useCommonStyles()
  const keyboardOffset = useCalculateKeyboardOffset()
  const {presets}=useScreenPresets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle =  { backgroundColor:props.backgroundColor ?? containerColor }
  const insetStyle = { paddingBottom: props.unsafe  ? 0 : initialWindowMetrics?.insets.bottom,backgroundColor:"transparent" }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={"padding"}
      keyboardVerticalOffset={props.keyboardOffset !== 0 ? keyboardOffset : 0}
    >
      <StatusBar barStyle={props.statusBar || statusBarColor} backgroundColor={"transparent"} translucent={true}/>
      <View style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {props.children}
          <View style={insetStyle}/>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  const {isNonScrolling}=useScreenPresets()

  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
