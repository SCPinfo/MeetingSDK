import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";


export interface LobbyPeer {
  id: string;
  displayName?: string;
  picture?: string;
  userId?: string;
}

export type LobbyPeersState = LobbyPeer[];

const initialState: LobbyPeersState = [];

const lobbyPeersSlice = createSlice({
  name: 'lobbyPeers',
  initialState,
  reducers: {
    addPeers: ((state, action: PayloadAction<LobbyPeer[]>) => {
      return [...state, ...action.payload];
    }),
    addPeer: ((state, action: PayloadAction<LobbyPeer>) => {
      state.push(action.payload);
    }),
    removePeer: ((state, action: PayloadAction<LobbyPeer>) => {
      return state.filter((peer) => peer.id !== action.payload.id);
    }),
  },
  extraReducers: (builder) => {
    builder
      // @ts-ignore
      .addCase(roomActions.setRoomState, (state, action) => {
        if (action.payload === RoomConnectionStateEnum.Closed)
          return [];
      });
  }
});

export const lobbyPeersActions = lobbyPeersSlice.actions;
export default lobbyPeersSlice.reducer;
