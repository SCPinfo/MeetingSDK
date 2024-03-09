import React from 'react';
import { useTheme } from "../../hooks/use-theme";
import { useAppSelector } from "../../services/redux/hooks";
import { RoomConnectionStateEnum } from "../../services/redux/room/room-slice";
import { RootState } from "../../services/redux/store";
import EndCallButton from "./end-call-button";
import { View } from "react-native";
import { useRoomActionsStyles } from "./use-room-actions-styles";
import VideoButton from "./video-button";
import MuteButton from "./mute-button";


export const RoomActions = () => {
  const room = useAppSelector((state: RootState) => state.room);
  const {actionsContainer} = useRoomActionsStyles()

  if (room.state !== RoomConnectionStateEnum.Connected) return null


  return (
    <>
      <View style={actionsContainer}>
        <MuteButton/>
        <VideoButton/>
        <EndCallButton/>
      </View>
    </>
  );
};
