import React from "react";
import { useAppSelector } from "../../services/redux/hooks";
import { RootState } from "../../services/redux/store";
import { View } from "react-native";
import { If } from "../../utils/methods";
import { JoinRoom } from "./join-room/join-room";
import { Room } from "./room/room";
import { RoomConnectionStateEnum } from "../../services/redux/room/room-slice";
import { useCommonStyles } from "../../use-common-styles";

interface MeetingProps {
  meetingId?: string | null;
}

export const Meeting = ({ route }) => {
  const { meetingId } = route.params as MeetingProps;
  const {flexOne} = useCommonStyles()
  const roomState = useAppSelector((state: RootState) => state.room.state)
  const isConnected = roomState === RoomConnectionStateEnum.Connected
  const isReconnecting = roomState === RoomConnectionStateEnum.Reconnecting
  const isDisconnected = roomState === RoomConnectionStateEnum.Disconnected
  const isClosed = roomState === RoomConnectionStateEnum.Closed
  const isInLobby = roomState === RoomConnectionStateEnum.Lobby

  return (
    <View style={flexOne}>
      <If condition={isClosed}>
        <JoinRoom meetingId={meetingId}/>
      </If>
      <If condition={isConnected}>
        <Room/>
      </If>
    </View>
  );
};

