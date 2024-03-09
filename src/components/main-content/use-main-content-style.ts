import { useWindowDimensions, ViewStyle } from "react-native";
import { CALL_ACTIONS_HEIGHT } from "../../constants/constants";

export function useMainContentStyle() {

  const container: ViewStyle = {
    height: useWindowDimensions().height - CALL_ACTIONS_HEIGHT
  };

  const galleryViewContainer: ViewStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    overflow: 'hidden',
  };

  return { container , galleryViewContainer};
}
