import { Pressable, View } from "react-native";
import { If } from "../../../../utils/methods";
import FontIcon from "../../../../components/font-icon/font-icons";
import { useRoomActionsStyles } from "../../../../components/room-actions/use-room-actions-styles";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/hooks";
import { mediaPreviewService } from "../../../../services/media-preview";
import { roomActions } from "../../../../services/redux/room/room-slice";


const VideoButton = () => {
  const { previewWebcamTrackId, webcamInProgress } = useAppSelector((state) => state.me);
  const dispatch = useAppDispatch();
  const { activeButtonStyle, buttonContainer, transparentButtonStyle, blackColor, whiteColor } = useRoomActionsStyles();

  const toggleCam = () => {
    if (!previewWebcamTrackId) {
      dispatch(mediaPreviewService.enablePreviewWebcam());
      dispatch(roomActions.setCameraEnabled(true));
    } else if (previewWebcamTrackId) {
      dispatch(mediaPreviewService.stopPreviewWebcam());
      dispatch(roomActions.setCameraEnabled(false));
    }
  };

  return (
    <Pressable
      style={buttonContainer}
      onPress={toggleCam}
      disabled={webcamInProgress}
    >
      <If condition={!!previewWebcamTrackId}>
        <View style={activeButtonStyle}>
          <FontIcon type={"fa5"} name={"video"} color={blackColor} size={18} />
        </View>
      </If>
      <If condition={!previewWebcamTrackId}>
        <View style={activeButtonStyle}>
          <FontIcon type={"fa5"} name={"video-slash"} color={blackColor} size={18} />
        </View>
      </If>
    </Pressable>
  );
};

export default VideoButton;
