import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { DisplayLayoutEnum } from "../../../enums/display-layout-enum";
import { Permission } from "../../room/roles";
import { defaultRoomConfig } from "../../room/room-config";
import { peersActions } from "../peers/peers-slice";
import { consumersActions } from "../consumers/consumers-slice";

export enum RoomConnectionStateEnum {
  Reconnecting = 'reconnecting',
  Connected = 'connected',
  Disconnected = 'disconnected',
  Closed = 'closed',
  Lobby = 'lobby'
}

export enum RecordingStatusEnum{
	Inactive = "inactive",
	Pending = "pending",
	Active = "active"
}
export interface IVirtualBackground {
  backgroundEffectEnabled?: boolean;
  enableBlur?: boolean;
  backgroundSrc :string;
  forPreview :boolean;
  blurAmount :number

}
export interface RoomState {
  state: RoomConnectionStateEnum;
  activeSpeakerId?: string;
  statsPeerId?: string;
  faceDetection?: boolean;
  roomData?;
  fullscreenConsumerId?: string;
  windowedConsumersIds: string[];
  selectedPeers: string[];
  spotlights: string[];
  windowedConsumers: string[];
  screenSharingConsumerId?:string;
  micEnabled: boolean;
  cameraEnabled: boolean;
  displayLayout:DisplayLayoutEnum;
  lockInProgress?: boolean;
  lobbyPeersPromotionInProgress?: boolean;
  roomPermissions?:Permission[];
  recordingStatus:RecordingStatusEnum;
  virtualBackground :IVirtualBackground;
  startedAt :number ;
}

const virtualBackgroundInitialState:IVirtualBackground={
  backgroundSrc :null,
  enableBlur :false,
  backgroundEffectEnabled:false,
  forPreview:false,
  blurAmount:0
}

const initialState: RoomState = {
  state: RoomConnectionStateEnum.Closed,
  windowedConsumersIds: [],
  selectedPeers: [],
  spotlights: [],
  windowedConsumers: [],
  micEnabled: false,
  cameraEnabled: false,
  displayLayout: defaultRoomConfig.defaultLayout,
  roomPermissions:[],
  recordingStatus: RecordingStatusEnum.Inactive,
  virtualBackground:virtualBackgroundInitialState ,
  startedAt :0,
};

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    updateRoom: ((state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    }),
    setRoomData: ((state, action: PayloadAction<any>) => {
      const roomData = action.payload;
      return {...state, roomData};
    }),
    updateRoomData: ((state, action: PayloadAction<any>) => {
      return {...state, roomData:{...state.roomData,...action.payload}};
    }),
    setRoomState: ((state, action: PayloadAction<RoomConnectionStateEnum>) => {
      if (action.payload == RoomConnectionStateEnum.Closed) {
        return initialState
      } else {
        return {...state, state:action.payload}
      }
    }),
    setRoomActiveSpeaker: ((state, action: PayloadAction<{ peerId: string, isMe: boolean}>) => {
      const { peerId, isMe } = action.payload;

      state.activeSpeakerId = peerId

      if (peerId && !isMe) {
        state.spotlights = state.spotlights.filter((id) => id !== peerId);
        state.spotlights.unshift(peerId);
      }
    }),
    setRoomStatsPeerId: ((state, action: PayloadAction<string>) => {
      state.statsPeerId = action.payload;
    }),
    setFaceDetection: ((state, action: PayloadAction<boolean>) => {
      state.faceDetection = action.payload;
    }),
    removeRoomPeerProps: ((state, action: PayloadAction<string>) => {
      const peerId = action.payload;
      if (peerId && peerId === state.activeSpeakerId)
        state.activeSpeakerId = null;
      if (peerId && peerId === state.statsPeerId)
        state.statsPeerId = null;
    }),
    updateUnreadCount: ((state) => {
      state.roomData.group.unReadCount = (state.roomData.group.unReadCount ?? 0) + 1
    }),
    resetUnreadCount: ((state) => {
      state.roomData.group.unReadCount = 0
    }),
    setFullscreenConsumer: ((state, action: PayloadAction<string | undefined>) => {
      state.fullscreenConsumerId = action.payload;
    }),
    setScreenSharingConsumer: ((state, action: PayloadAction<string | undefined>) => {
      state.screenSharingConsumerId = action.payload;
    }),
    addWindowedConsumer: ((state, action: PayloadAction<{ consumerId: string }>) => {
      state.windowedConsumers.push(action.payload.consumerId);
    }),
    removeWindowedConsumer: ((state, action: PayloadAction<{ consumerId: string }>) => {
      state.windowedConsumers =
        state.windowedConsumers.filter((id) => id !== action.payload.consumerId);
    }),
    setMicEnabled: ((state: any, action: PayloadAction<boolean>) => {
      state.micEnabled = action.payload
    }),
    setCameraEnabled: ((state: any, action: PayloadAction<boolean>) => {
      state.cameraEnabled = action.payload
    }),
    selectPeer: ((state, action: PayloadAction<{ peerId: string }>) => {
      if(state.displayLayout === DisplayLayoutEnum.Filmstrip){
        state.selectedPeers = [action.payload.peerId];
      }else{
        state.selectedPeers.push(action.payload.peerId);
      }
    }),
    deselectPeer: ((state, action: PayloadAction<{ peerId: string }>) => {
      if(state.displayLayout === DisplayLayoutEnum.Filmstrip){
        state.selectedPeers = [];
      }else{
        state.selectedPeers =
          state.selectedPeers.filter((peer) => peer !== action.payload.peerId);
      }
    }),
    setDisplayLayout: ((state, action: PayloadAction<DisplayLayoutEnum>) => {
      state.displayLayout = action.payload
    }),
    setPermissions: ((state, action: PayloadAction<Permission[]>) => {
      state.roomPermissions = action.payload
    }),
    setRecordingStatus: ((state, action: PayloadAction<RecordingStatusEnum>) => {
      state.recordingStatus = action.payload
    }),
    setVirtualBackground: ((state, action: PayloadAction<IVirtualBackground>) => {
      state.virtualBackground = action.payload
    }),
    setMeetingStarted: ((state: any) => {
      state.startedAt = Date.now()
    }),
    resetVirtualBackgroundState: ((state) => {
      state.virtualBackground = virtualBackgroundInitialState
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(peersActions.addPeer, (state, action) => {
        if (!state?.spotlights.includes(action.payload.id)) {
          state?.spotlights.push(action.payload.id);
        }
      })
      .addCase(peersActions.addPeers, (state, action) => {
        const peers = action.payload
        for (const peerId in peers) {
          if (!state?.spotlights.includes(peerId))
            state?.spotlights.push(peerId);
        }
      })
      .addCase(peersActions.removePeer, (state, action) => {
        state.spotlights = state.spotlights.filter((peer) => peer !== action.payload);
        state.selectedPeers = state.selectedPeers.filter((peer) => peer !== action.payload);
      })
      .addCase(consumersActions.removeConsumer, (state, action) => {
        state.windowedConsumers = state.windowedConsumers.filter((id) => id !== action.payload.consumerId);
      })
  }

});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
