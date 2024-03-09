import { TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/use-theme";

export function useChipStyle() {
  const theme = useTheme()

  const container: ViewStyle = {
    backgroundColor: theme.colors.signatureColor,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 13,
    margin: 5,
    alignItems: "center",
    gap:8,
    flexDirection:'row'
  };

  const label: TextStyle = {
    color: theme.colors.white,

  };

  return {container,label};
}
