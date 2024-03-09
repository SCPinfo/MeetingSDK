import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";


export enum SideSectionState {
  Chat = "chat",
  Participants = "participants",
  RoomDetails = "roomDetails"
}

interface ISnackbar{
  icon:string,
  message :string ,
  autoClose:boolean ,
  key:number
}
interface IState {
  isSideSectionOpened: boolean;
  settingsDialogOpen:boolean;
  sideSection : SideSectionState;
  screenshotDialogOpen : boolean;
  screenshotImage :string
  stopRecordingDialogOpen:boolean;
  snackbar :ISnackbar;
  recordingConsentOpen:boolean;
  showHeaderSection : boolean ;
}

type UiUpdate = Partial<IState>;

const initialState: IState = {
  isSideSectionOpened: false,
  sideSection : null,
  settingsDialogOpen:false,
  screenshotDialogOpen : false,
  stopRecordingDialogOpen:false,
  screenshotImage:'',
  snackbar:null,
  recordingConsentOpen:false,
  showHeaderSection :true,
};


const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleSideSection: ((state, action: PayloadAction<SideSectionState>) => {
      if(action.payload === state.sideSection)
        action.payload = null

      state.sideSection = action.payload
    }),
    setUi: ((state, action: PayloadAction<UiUpdate>) => {
      return { ...state, ...action.payload };
    }),
  },
  extraReducers: (builder) => {
    builder
      // @ts-ignore
      .addCase(roomActions.setRoomState, (state, action) => {
        if (action.payload === RoomConnectionStateEnum.Closed)
          return initialState;
      });
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
