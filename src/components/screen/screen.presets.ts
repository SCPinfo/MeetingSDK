import { ViewStyle } from "react-native"
import { useTheme } from "../../hooks/use-theme"

export const useScreenPresets =()=>{
  const theme =useTheme()
  const presets = {
    /**
     * No scrolling. Suitable for full-screen carousels and components
     * which have built-in scrolling like FlatList.
     */
    fixed: {
      outer: {
        backgroundColor: theme.colors.containerColor,
        flex: 1,
        height: "100%",
      } as ViewStyle,
      inner: {
        justifyContent: "flex-start",
        alignItems: "stretch",
        height: "100%",
        width: "100%",
      } as ViewStyle,
    },

    /**
     * Scrolls. Suitable for forms or other things requiring a keyboard.
     *
     * Pick this one if you don't know which one you want yet.
     */
    scroll: {
      outer: {
        backgroundColor: theme.colors.containerColor,
        flex: 1,
        height: "100%",
      } as ViewStyle,
      inner: { justifyContent: "flex-start", alignItems: "stretch",flexGrow:1 } as ViewStyle,
    },
  } as any


  function isNonScrolling(preset?: string) {
    // any of these things will make you scroll
    return !preset || !presets[preset] || preset === "fixed"
  }
  return{
    isNonScrolling,
    presets
  }
}





