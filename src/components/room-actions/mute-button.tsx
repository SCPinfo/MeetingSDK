import { Pressable, View } from "react-native";
import FontIcon from "../font-icon/font-icons";
import { useRoomActionsStyles } from "./use-room-actions-styles";
import { useAppSelector } from "../../services/redux/hooks";
import { meetingService } from "../../services/meeting";
import { RootState } from "../../services/redux/store";
import { micProducerSelector } from "../../services/redux/producers/producers-selectors";
import { If } from "../../utils/methods";
import { Permission } from "../../services/room/roles";
import { usePermissionSelector } from "../../services/redux/permissions/permissions-selectors";

const MuteButton = () => {

  const micProducer = useAppSelector(micProducerSelector);
  const {canSendMic,micInProgress} = useAppSelector((state: RootState) => state.me);
  const hasAudioPermission = usePermissionSelector(Permission.SHARE_AUDIO);
  const audioEnabled = micProducer && !micProducer.paused;
  const {activeButtonStyle,buttonContainer,transparentButtonStyle,blackColor,whiteColor} = useRoomActionsStyles()

  const handleClick = async () => {
    if (micProducer) {
      if (audioEnabled){
        await meetingService.muteMic();
      } else {
        await meetingService.unmuteMic();
      }
    } else {
      await meetingService.enableMic();
    }
  };

  return (
      <Pressable
        style={buttonContainer}
        onPress={handleClick}
        disabled={!canSendMic || !hasAudioPermission || micInProgress}
      >
        <If condition={audioEnabled}>
          <View style={transparentButtonStyle}>
            <FontIcon type={"materialCommunity"} name={"microphone"} color={whiteColor} size={23} />
          </View>
        </If>
        <If condition={!audioEnabled}>
          <View style={transparentButtonStyle}>
            <FontIcon type={"materialCommunity"} name={"microphone-off"} color={whiteColor} size={23} />
          </View>
        </If>
      </Pressable>
  );
};

export default MuteButton;
