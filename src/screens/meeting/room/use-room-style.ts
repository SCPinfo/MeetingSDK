import { useTheme } from "../../../hooks/use-theme";
import { ViewStyle } from "react-native";

export function useRoomStyle() {
  const theme = useTheme();

  const container: ViewStyle = {
    flex: 1, justifyContent: "flex-start", backgroundColor: theme.colors.callBackgroundColor
  };

  return { container };
}
