import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"
import { getDefaultHeaderHeight } from "@react-navigation/elements";

export function useCalculateKeyboardOffset() {

  const {top} = useSafeAreaInsets()
  const frame = useSafeAreaFrame();

  let headerSize = getDefaultHeaderHeight(frame, true, top);



  return headerSize
}
