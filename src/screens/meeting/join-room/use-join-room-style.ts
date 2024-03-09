import { useTheme } from "../../../hooks/use-theme";
import { TextStyle, ViewStyle } from "react-native";

export function useJoinRoomStyle() {
  const theme = useTheme();
  const whiteColor = theme.colors.white

  const container: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: theme.colors.callBackgroundColor
  };

  const headerText: TextStyle = {
    textAlign: "center", color: theme.colors.white,
    marginBottom: 30,
    fontSize: 18
  };

  const meetingTitle: TextStyle = {
    textAlign: "center", color: theme.colors.white
  };

  const webCamPreviewContainer: ViewStyle = {
    marginVertical: 20
  };

  const actionsContainer: ViewStyle = {
    width: "100%", marginBottom: 20, justifyContent: "space-evenly", alignItems: "center", flexDirection: "row"
  };

  const micIndicatorContainer :ViewStyle={
    zIndex:1, marginTop:10,
    position: "absolute",top:0
  }

  return { container, actionsContainer, meetingTitle, headerText, webCamPreviewContainer, micIndicatorContainer, whiteColor };
}
