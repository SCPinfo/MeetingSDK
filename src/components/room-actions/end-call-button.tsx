import React from 'react';

import { Pressable, View } from "react-native";
import { useAppDispatch } from "../../services/redux/hooks";
import { meetingService } from "../../services/meeting";
import { useRoomActionsStyles } from "./use-room-actions-styles";
import FontIcon from "../font-icon/font-icons";

const EndCallButton = () => {
  const dispatch = useAppDispatch();
  const {buttonContainer,rejectButtonStyle,whiteColor} =useRoomActionsStyles()


  const handleClick = async () => {
    await dispatch(meetingService.hangup())
  }

  return (
    <Pressable style={buttonContainer} onPress={handleClick}>
      <View style={rejectButtonStyle}>
        <FontIcon type={"materialCommunity"} name={"phone-hangup"} color={whiteColor} size={22} />
      </View>
    </Pressable>
  );
};

export default EndCallButton;
