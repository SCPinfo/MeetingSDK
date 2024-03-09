import { ViewStyle } from "react-native"

export function useStaticStyles() {
  const flexOne = { flex: 1 }

  const flexGrowOne = { flexGrow: 1 }

  const flexGrowZero = { flexGrow: 0 }

  const w100 = { width: "100%" }

  const w80: ViewStyle = { width: "80%" }

  const streamContainer: ViewStyle = { width: "100%", height: "100%", borderRadius: 15 }

  const alignSelfStart: any = { alignSelf: "flex-start" }

  const highZIndex: any = { zIndex: 9999 }

  const fullHeightWidth: any = { width: "100%", height: "100%" }

  return {
    flexOne,
    flexGrowOne,
    flexGrowZero,
    w100,
    w80,
    streamContainer,
    alignSelfStart,
    highZIndex,
    fullHeightWidth
  }
}
