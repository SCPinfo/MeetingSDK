import { View } from "react-native";
import { RoomActions } from "../../../components/room-actions/room-actions";
import AudioPeers from "../../../components/audio-peers/audio-peers";
import MainContent from "../../../components/main-content/main-content";
import { useRoomStyle } from "./use-room-style";
import RoomHeader from "./room-header-section/room-header";

export const Room = () => {
  const { container } = useRoomStyle()


  return (
    <View style={container}>
      <RoomHeader />
      <AudioPeers />
      <MainContent />
      <RoomActions />
    </View>
  );
};

