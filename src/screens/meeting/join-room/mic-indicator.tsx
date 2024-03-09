import React from 'react';
import { View } from "react-native";
import Chip from "../../../components/chip/chip";
import FontIcon from "../../../components/font-icon/font-icons";
import { useJoinRoomStyle } from "./use-join-room-style";

interface IProps {
  isEnabled:boolean
}

const MicIndicator = ({isEnabled}:IProps) => {

  const {micIndicatorContainer,whiteColor} = useJoinRoomStyle()

  return (
    <View style={micIndicatorContainer}>
      <Chip
        icon={<FontIcon type={"materialCommunity"} name={isEnabled ?"microphone":"microphone-off"} color={whiteColor} size={18} />}
        label={isEnabled ? "room.microphoneIsOn" : "room.microphoneIsOff"}
      />
    </View>
  );
};

export default MicIndicator;
