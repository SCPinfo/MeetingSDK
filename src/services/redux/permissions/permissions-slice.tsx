
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";
import { Permission } from "../../room/roles";


export interface PermissionsState {
  locked: boolean;
  permissions: Permission[];
}

const initialState: PermissionsState = {
  locked: false,
  permissions: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setLocked: ((state, action: PayloadAction<boolean>) => {
      state.locked = action.payload;
    }),
    addPermissions: ((state, action: PayloadAction<Permission[]>) => {
      state.permissions = [...new Set([...state.permissions,...action.payload])];
    }),
    removePermissions: ((state, action: PayloadAction<Permission[]>) => {
      const removedPermissions = action.payload
      state.permissions = state.permissions.filter((p)=> !removedPermissions.includes(p))
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(roomActions.setRoomState, (state, action) => {
        if (action.payload === RoomConnectionStateEnum.Closed) {
          state.locked = false;
          state.permissions = [];
        }
      });
  }
});

export const permissionsActions = permissionsSlice.actions;
export default permissionsSlice.reducer;
