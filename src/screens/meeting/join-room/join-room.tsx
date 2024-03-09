import React, { useCallback, useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { socketService } from "../../../services/socket";
import { useAppDispatch, useAppSelector } from "../../../services/redux/hooks";
import { meetingService } from "../../../services/meeting";
import { Button, Text } from "../../../components";
import MicButton from "./buttons/mic-button";
import SettingsButton from "./buttons/settings-button";
import VideoButton from "./buttons/video-button";
import { WebcamPreview } from "../../../components/webcam-preview/webcam-preview";
import { useJoinRoomStyle } from "./use-join-room-style";
import MicIndicator from "./mic-indicator";
import { meetingSelector } from "../../../services/redux/room/room-selectors";
import { ServerErrorsEnum } from "../../../enums";
import { ErrorView } from "../../../components/error-view/error-view";
import { LoadingView } from "../../../components/loading-view/loading-view";

interface JoinRoomProps {
  meetingId?: string;
}

export const JoinRoom = ({ meetingId }: JoinRoomProps) => {
  const dispatch = useAppDispatch();
  const { previewMicTrackId } = useAppSelector((state) => state.me);
  const meeting = useAppSelector(meetingSelector);
  const [loading, setLoading] = useState(true);
  const [isJoinLoading, setJoinLoading] = useState(false);
  const [meetingError, setError] = useState<any>(null);
  const windowsHeight = useWindowDimensions().height;
  const { actionsContainer, container, webCamPreviewContainer, meetingTitle, headerText } = useJoinRoomStyle();

  const validateMeeting = useCallback(async () => {
    setError(null);
    try {
      await dispatch(meetingService.validateMeeting(meetingId));
    } catch (error: any) {
      if (error?.data && error.message === ServerErrorsEnum.AllowJoinMeetingTime) {
        setError({ message: error.message, data: { limitTime: error.data.limitTime } });
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, meetingId]);


  const validateRoom = useCallback(async () => {
    if (socketService.isConnected()) {
      await validateMeeting();
    } else {
      // add pending action
      socketService.addPendingAction(validateMeeting);
    }
  }, [validateMeeting]);


  useEffect(() => {
    validateRoom();
  }, [validateRoom]);


  const joinRoom = async () => {
    setError(null);
    setJoinLoading(true);
    try {
      await dispatch(meetingService.join(meetingId));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setJoinLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingView />
      ) : meeting ? (
          <View style={container}>
            <Text preset={"bold"} tx={"room.description"} style={headerText} />

            <Text text={meeting.title} style={meetingTitle} />

            <View style={webCamPreviewContainer}>
              <WebcamPreview height={windowsHeight / 2.2}>
                <MicIndicator isEnabled={!!previewMicTrackId} />
              </WebcamPreview>
            </View>

            <View style={actionsContainer}>
              <VideoButton />
              <MicButton />
              <SettingsButton />
            </View>

            <Button
              tx={"room.joinMeeting"}
              onPress={joinRoom}
              disabled={isJoinLoading}
              loading={isJoinLoading}
            />
          </View>
      ) : meetingError ? (
        <ErrorView error={meetingError} />
      ) : null}
    </>

  );
};
