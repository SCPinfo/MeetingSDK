import React from "react"
import { View, ViewStyle } from "react-native"

interface ISpaceProps {
  direction?: "vertical" | "horizontal"
  spaceAmount: number
}

export const Space = (props: ISpaceProps) => {
  const { direction = "vertical", spaceAmount } = props
  const style: ViewStyle = direction === "vertical" ? { height: spaceAmount } : { width: spaceAmount }

  return <View style={style} />
}
