
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";
import { Permission } from "react-native";
import { peersActions } from "../peers/peers-slice";



const initialState: Record<string, Permission[]> = {};

const peerPermissionsSlice = createSlice({
  name: 'peerPermissions',
  initialState,
  reducers: {
    addPermissions: ((state, action: PayloadAction<{ peerId:string;permissions:Permission[] }>) => {
      state[action.payload.peerId] = [...new Set([...state[action.payload.peerId]??[],...action.payload.permissions])]
    }),
    removePermissions: ((state, action: PayloadAction<{ peerId:string;permissions:Permission[] }>) => {
      if(state[action.payload.peerId]){
        state[action.payload.peerId] = state[action.payload.peerId].filter((p)=> !action.payload.permissions.includes(p))
      }
    }),
  },
  extraReducers: (builder) => {
    builder
      // @ts-ignore
      .addCase(roomActions.setRoomState, (state, action) => {
        if (action.payload === RoomConnectionStateEnum.Closed) {
          return {}
        }
      })
     .addCase(peersActions.removePeer, (state, action) => {
        delete state[action.payload]
      })
  }
});

export const peerPermissionsActions = peerPermissionsSlice.actions;
export default peerPermissionsSlice.reducer;
