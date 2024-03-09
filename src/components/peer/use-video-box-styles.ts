import { Dimensions, ImageStyle,ViewStyle } from "react-native"
import { CALL_ACTIONS_HEIGHT } from "../../constants/constants";

export function useVideoBoxStyles() {
  const screenWidth: number = Dimensions.get("window").width
  const screenHeight: number = Dimensions.get("window").height - CALL_ACTIONS_HEIGHT


  const itemStyle = (membersLength:number): ViewStyle => {
    if (membersLength === 2) {
      return {
        width: screenWidth,
        height: screenHeight,
      }
    } else if (membersLength === 3 || membersLength === 4) {
      return {
        width: screenWidth / 2.1,
        height: screenHeight / 2.15,
        margin: 3,
      }
    } else if (membersLength === 5 || membersLength === 6) {
      return {
        width: screenWidth / 2.1,
        height: screenHeight / 3.2,
        margin: 3,
      }
    } else if (membersLength === 7 || membersLength === 8) {
      return {
        width: screenWidth / 2.1,
        height: screenHeight / 4.35,
        margin: 3,
      }
    } else {
      return {
        width: screenWidth,
        height: screenHeight,
      }
    }
  }


  const itemBorderRadius = (arrayLength:number): ImageStyle => {
    return arrayLength > 2 ? {
      borderRadius: 15,
    }
      :
      {
        borderRadius: 0,
      }
  }

  return {
    itemStyle,
    itemBorderRadius,
  }
}
