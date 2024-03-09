import React, { ErrorInfo } from "react"
import { View } from "react-native"
import { Button, Icon, Text } from "../../components";
import { useErrorComponentStyles } from "./use-error-component-styles"

export interface ErrorComponentProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

/**
 * Describe your component here
 */
export const ErrorComponent = (props: ErrorComponentProps) => {
  const {CONTAINER,ANIMATION_CONTAINER,TITLE_ERROR,FRIENDLY_SUBTITLE,BTN_RESET}=useErrorComponentStyles()
  return (
    <View style={CONTAINER}>
        <View style={ANIMATION_CONTAINER}>
          <Icon icon="bug" style={{width:64,height:64}} />
        </View>

       <Text style={TITLE_ERROR} tx="errorScreen.title" />
     <Text style={FRIENDLY_SUBTITLE}  tx="errorScreen.friendlySubtitle" />
      <Button style={BTN_RESET} onPress={props.onReset} tx={"general.ok"} />
    </View>
  )
}
