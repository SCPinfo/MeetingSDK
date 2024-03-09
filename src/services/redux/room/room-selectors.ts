import { Selector } from "../store";
import { RoomState } from "./room-slice";

export const roomSelect: Selector<RoomState> = (state) => state.room;
export const maxActiveVideosSelector: Selector<number> = (state) => state.roomSettings.maxActiveVideos;
export const meetingSelector: Selector<any> = (state) => state.room.roomData;
