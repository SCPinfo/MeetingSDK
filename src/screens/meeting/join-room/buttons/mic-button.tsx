
import { Pressable, View } from "react-native";
import { If } from "../../../../utils/methods";
import FontIcon from "../../../../components/font-icon/font-icons";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/hooks";
import { roomActions } from "../../../../services/redux/room/room-slice";
import { useRoomActionsStyles } from "../../../../components/room-actions/use-room-actions-styles";
import { mediaPreviewService } from "../../../../services/media-preview";

const MicButton = () => {
    const { previewMicTrackId, micInProgress } = useAppSelector((state) => state.me);
    const dispatch = useAppDispatch();
    const {activeButtonStyle,buttonContainer,transparentButtonStyle,blackColor,whiteColor} = useRoomActionsStyles()

    const toggleMic = () => {
        if (!previewMicTrackId) {
          dispatch(mediaPreviewService.enablePreviewMic());
          dispatch(roomActions.setMicEnabled(true));
        } else if (previewMicTrackId) {
          dispatch(mediaPreviewService.stopPreviewMic());
          dispatch(roomActions.setMicEnabled(false));
        }
      }

    return (
      <Pressable
        style={buttonContainer}
        onPress={toggleMic}
        disabled={micInProgress}
      >
        <If condition={!!previewMicTrackId}>
          <View style={activeButtonStyle}>
            <FontIcon type={"materialCommunity"} name={"microphone"} color={blackColor} size={22} />
          </View>
        </If>
        <If condition={!previewMicTrackId}>
          <View style={activeButtonStyle}>
            <FontIcon type={"materialCommunity"} name={"microphone-off"} color={blackColor} size={22} />
          </View>
        </If>
      </Pressable>
    );
};

export default MicButton;
