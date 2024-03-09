import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";
import { DeviceMediaCapabilities } from "../../room/types";


export interface MeState {
  id: string;
  user: User
  device: any;
  previewWebcamTrackId?: string;
  previewMicTrackId?: string;
  canSendMic: boolean;
  canSendWebcam: boolean;
  canShareScreen: boolean;
  canTranscribe: boolean;
  canSelectAudioOutput: boolean;
  peersCameraOff: boolean;
  peersAudioOff: boolean;
  raisedHand: boolean;
  raisedHandTimestamp: number;
  restartIceInProgress: boolean;
  webcamInProgress: boolean;
  shareInProgress: boolean;
  micInProgress: boolean;
  webcamPermissionDenied : boolean;
  micPermissionDenied: boolean,
  speakerInProgress: boolean,
  audioOnlyInProgress: boolean;
  raisedHandInProgress: boolean;
  hasAudioContext: boolean;
  isSpeaking:boolean;
}

const initialState: MeState =
  {
    id: null,
    user: null,
    device: null,
    canSendMic: false,
    canSendWebcam: false,
    canShareScreen: false,
    canTranscribe: false,
    canSelectAudioOutput: false,
    peersCameraOff: false,
    peersAudioOff: false,
    raisedHand: false,
    raisedHandTimestamp: 0,
    hasAudioContext: false,
    restartIceInProgress: false,
    webcamInProgress: false,
    webcamPermissionDenied : false,
    micPermissionDenied: false,
    micInProgress: false,
    speakerInProgress: false,
    shareInProgress: false,
    audioOnlyInProgress: false,
    raisedHandInProgress: false,
    isSpeaking:false
  };

const meSlice = createSlice({
  name: 'me',
  initialState: initialState,
  reducers: {
    setMe: ((state, action: PayloadAction<{ socketId: string, user: User }>) => {
      state.id = action.payload.socketId;
      state.user = action.payload.user
    }),
    setMediaCapabilities: ((
      state,
      action: PayloadAction<DeviceMediaCapabilities>
    ) => {
      return {...state, ...action.payload};
    }),
    setRaisedHand: ((state, action: PayloadAction<boolean>) => {
      state.raisedHand = action.payload;
      if (state.raisedHand) {
        state.raisedHandTimestamp = Date.now()
      }
    }),
    setPreviewMicTrackId: ((state, action: PayloadAction<string | undefined>) => {
      state.previewMicTrackId = action.payload;
    }),
    setPreviewWebcamTrackId: ((state, action: PayloadAction<string | undefined>) => {
      state.previewWebcamTrackId = action.payload;
    }),
    setPeersCameraOffState: ((state, action: PayloadAction<boolean>) => {
      state.peersCameraOff = action.payload;
    }),
    setPeersAudioOffState: ((state, action: PayloadAction<boolean>) => {
      state.peersAudioOff = action.payload;
    }),
    setWebcamInProgress: ((state, action: PayloadAction<boolean>) => {
      state.webcamInProgress = action.payload;
    }),
    setMicInProgress: ((state, action: PayloadAction<boolean>) => {
      state.micInProgress = action.payload
    }),
    setWebcamPermissionDenied: ((state, action: PayloadAction<boolean>) => {
      state.webcamPermissionDenied = action.payload;
    }),
    setMicPermissionDenied: ((state, action: PayloadAction<boolean>) => {
      state.micPermissionDenied = action.payload
    }),
    setSpeakerInProgress: ((state, action: PayloadAction<boolean>) => {
      state.speakerInProgress = action.payload
    }),
    setShareInProgress: ((state, action: PayloadAction<boolean>) => {
      state.shareInProgress = action.payload
    }),
    setAudioOnlyInProgress: ((state, action: PayloadAction<boolean>) => {
      state.audioOnlyInProgress = action.payload
    }),
    setRestartICEInProgress: ((state, action: PayloadAction<boolean>) => {
      state.restartIceInProgress = action.payload
    }),
    setRaiseHandInProgress: ((state, action: PayloadAction<boolean>) => {
      state.raisedHandInProgress = action.payload;
    }),
    setIsSpeaking: ((state, action: PayloadAction<boolean>) => {
      state.isSpeaking = action.payload;
    }),
    activateAudioContext: (state) => {
      state.hasAudioContext = true;
    },
    palyNotificationSound: () => {
       //Paly sound effect

    },
  },
  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(roomActions.setRoomState, (state, action) => {
        if (action.payload === RoomConnectionStateEnum.Closed)
          return initialState;
      });
  }
});

export const meActions = meSlice.actions;

export default meSlice.reducer;
