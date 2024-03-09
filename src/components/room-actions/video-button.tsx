import { Pressable, View } from "react-native";
import FontIcon from "../font-icon/font-icons";
import { useRoomActionsStyles } from "./use-room-actions-styles";
import { useAppSelector } from "../../services/redux/hooks";
import { webcamProducerSelector } from "../../services/redux/producers/producers-selectors";
import { RootState } from "../../services/redux/store";
import { meetingService } from "../../services/meeting";
import { If } from "../../utils/methods";
import { Permission } from "../../services/room/roles";
import { usePermissionSelector } from "../../services/redux/permissions/permissions-selectors";

const VideoButton = () => {
  const webcamProducer = useAppSelector(webcamProducerSelector);
  const {webcamInProgress,canSendWebcam} = useAppSelector((state: RootState) => state.me);
  const webcamEnabled = webcamProducer && !webcamProducer.paused;
  const hasVideoPermission = usePermissionSelector(Permission.SHARE_VIDEO);
  const {activeButtonStyle,buttonContainer,transparentButtonStyle,blackColor,whiteColor} = useRoomActionsStyles()

  const handleClick = async () => {
    if (webcamEnabled) {
      await meetingService.disableWebcam();
    } else {
      await meetingService.enableWebcam();
    }
  }

  return (
      <Pressable
        style={buttonContainer}
        onPress={handleClick}
        disabled={!canSendWebcam || !hasVideoPermission || webcamInProgress}
      >
        <If condition={webcamEnabled}>
          <View style={transparentButtonStyle}>
            <FontIcon type={"fa5"} name={"video"} color={whiteColor} size={20} />
          </View>
        </If>
        <If condition={!webcamEnabled}>
          <View style={transparentButtonStyle}>
            <FontIcon type={"fa5"} name={"video-slash"} color={whiteColor} size={20} />
          </View>
        </If>
      </Pressable>
  );
};

export default VideoButton
