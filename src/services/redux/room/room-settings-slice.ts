
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AudioPreset, Resolution } from "../../room/types";
import { defaultRoomConfig } from "../../room/room-config";
import { NotificationSettings } from "../../../models/notification-settings";

export interface RoomSettingsState {
  maxActiveVideos: number;
  mirroredSelfView: boolean;
  hideNonVideo: boolean;
  hideSelfView: boolean;
  hideRoomActions: boolean;
  verticalDivide: boolean;
  dynamicWidth: boolean;
  aspectRatio: number;
  resolution: Resolution;
  frameRate: number;
  screenSharingResolution: Resolution;
  screenSharingFrameRate: number;
  preferredRecorderMimeType: string,
  audioPreset: string,
  audioPresets: Record<string, AudioPreset>,
  autoGainControl: boolean;
  echoCancellation: boolean;
  noiseSuppression: boolean;
  sampleRate: number;
  channelCount: number;
  sampleSize: number;
  opusStereo: boolean;
  opusDtx: boolean;
  opusFec: boolean;
  opusPtime: number;
  opusMaxPlaybackRate: number;
  selectedSpeakerDeviceId?: string;
  selectedMicrophoneDeviceId?: string;
  selectedVideoDeviceId?: string;
  devices: MediaDeviceInfo[];
  browserPermissions: { audio:boolean, video:boolean}
  chatEnabled: boolean,
  raiseHandEnabled: boolean,
  recordingEnabled: boolean,
  playAppSounds :boolean,
  noiseThreshold: number;
  notificationSettings: NotificationSettings;
}

type SettingsUpdate = Partial<RoomSettingsState>;

const initialState: RoomSettingsState = {
  mirroredSelfView: true,
  resolution: defaultRoomConfig.resolution,
  frameRate: defaultRoomConfig.frameRate,
  screenSharingResolution: defaultRoomConfig.screenSharingResolution,
  screenSharingFrameRate: defaultRoomConfig.screenSharingFrameRate,
  preferredRecorderMimeType: 'video/webm',
  maxActiveVideos: 100,
  hideNonVideo: defaultRoomConfig.hideNonVideo,
  hideSelfView: false,
  hideRoomActions: false,
  verticalDivide: true,
  dynamicWidth: true,
  aspectRatio: defaultRoomConfig.aspectRatio,
  audioPreset: defaultRoomConfig.audioPreset,
  audioPresets: defaultRoomConfig.audioPresets,
  autoGainControl: defaultRoomConfig.autoGainControl,
  echoCancellation: defaultRoomConfig.echoCancellation,
  noiseSuppression: defaultRoomConfig.noiseSuppression,
  sampleRate: defaultRoomConfig.sampleRate,
  channelCount: defaultRoomConfig.channelCount,
  sampleSize: defaultRoomConfig.sampleSize,
  opusStereo: defaultRoomConfig.opusStereo,
  opusDtx: defaultRoomConfig.opusDtx,
  opusFec: defaultRoomConfig.opusFec,
  opusPtime: defaultRoomConfig.opusPtime,
  opusMaxPlaybackRate: defaultRoomConfig.opusMaxPlaybackRate,
  notificationSettings: defaultRoomConfig.notificationSettings,
  devices: [],
  chatEnabled: true,
  raiseHandEnabled: true,
  recordingEnabled: true,
  browserPermissions:{
    audio:false,
    video:false
  },
  playAppSounds :true,
  noiseThreshold: defaultRoomConfig.noiseThreshold
};

const roomSettingsSlice = createSlice({
  name: 'roomSettings',
  initialState,
  reducers: {
    updateSettings: ((state, action: PayloadAction<SettingsUpdate>) => {
      return {...state, ...action.payload};
    }),
    setMaxActiveVideos: ((state, action: PayloadAction<number>) => {
      state.maxActiveVideos = action.payload;
    }),
    setMirroredSelfView: ((state, action: PayloadAction<boolean>) => {
      state.mirroredSelfView = action.payload;
    }),
    setHideNonVideo: ((state, action: PayloadAction<boolean>) => {
      state.hideNonVideo = action.payload;
    }),
    setHideSelfView: ((state, action: PayloadAction<boolean>) => {
      state.hideSelfView = action.payload;
    }),
    setSelectedMicrophoneDeviceId: ((state, action: PayloadAction<string | undefined>) => {
      state.selectedMicrophoneDeviceId = action.payload;
    }),
    setSelectedSpeakerDeviceId: ((state, action: PayloadAction<string | undefined>) => {
      state.selectedSpeakerDeviceId = action.payload;
    }),
    setSelectedVideoDeviceId: ((state, action: PayloadAction<string | undefined>) => {
      state.selectedVideoDeviceId = action.payload;
    }),
    setVerticalDivide: ((state, action: PayloadAction<boolean>) => {
      state.verticalDivide = action.payload;
    }),
    setDynamicWidth: ((state, action: PayloadAction<boolean>) => {
      state.dynamicWidth = action.payload;
    }),
    setAspectRatio: ((state, action: PayloadAction<number>) => {
      state.aspectRatio = action.payload;
    }),
    setResolution: ((state, action: PayloadAction<Resolution>) => {
      state.resolution = action.payload;
    }),
    setFrameRate: ((state, action: PayloadAction<number>) => {
      state.frameRate = action.payload;
    }),
    setScreenSharingResolution: ((state, action: PayloadAction<Resolution>) => {
      state.screenSharingResolution = action.payload;
    }),
    setScreenSharingFrameRate: ((state, action: PayloadAction<number>) => {
      state.screenSharingFrameRate = action.payload;
    }),
    setPreferredRecorderMimeType: ((state, action: PayloadAction<string>) => {
      state.preferredRecorderMimeType = action.payload;
    }),
    setAudioPreset: ((state, action: PayloadAction<string>) => {
      state.audioPreset = action.payload;
    }),
    setAutoGainControl: ((state, action: PayloadAction<boolean>) => {
      state.autoGainControl = action.payload;
    }),
    setEchoCancellation: ((state, action: PayloadAction<boolean>) => {
      state.echoCancellation = action.payload;
    }),
    setNoiseSuppression: ((state, action: PayloadAction<boolean>) => {
      state.noiseSuppression = action.payload;
    }),
    setSampleRate: ((state, action: PayloadAction<number>) => {
      state.sampleRate = action.payload;
    }),
    setChannelCount: ((state, action: PayloadAction<number>) => {
      state.channelCount = action.payload;
    }),
    setSampleSize: ((state, action: PayloadAction<number>) => {
      state.sampleSize = action.payload;
    }),
    setOpusStereo: ((state, action: PayloadAction<boolean>) => {
      state.opusStereo = action.payload;
    }),
    setOpusDtx: ((state, action: PayloadAction<boolean>) => {
      state.opusDtx = action.payload;
    }),
    setOpusFec: ((state, action: PayloadAction<boolean>) => {
      state.opusFec = action.payload;
    }),
    setOpusPtime: ((state, action: PayloadAction<number>) => {
      state.opusPtime = action.payload;
    }),
    setOpusMaxPlaybackRate: ((state, action: PayloadAction<number>) => {
      state.opusMaxPlaybackRate = action.payload;
    }),
    setDevices: ((state, action: PayloadAction<MediaDeviceInfo[]>) => {
      state.devices = action.payload;
    }),
    setRecordingEnabled: ((state, action: PayloadAction<boolean>) => {
      state.recordingEnabled = action.payload
    }),
    setBrowserPermissions: ((state, action: PayloadAction<{ audio:boolean, video:boolean }>) => {
      state.browserPermissions = action.payload
    }),
    setPlayApplicationSounds: ((state, action: PayloadAction<boolean>) => {
      state.playAppSounds = action.payload;
    }),
    setNoiseThreshold: ((state, action: PayloadAction<number>) => {
      state.noiseThreshold = action.payload;
    }),
    setNotificationSettings: ((state, action: PayloadAction<NotificationSettings>) => {
      state.notificationSettings = action.payload;
    }),
  },
});

export const roomSettingsActions = roomSettingsSlice.actions;
export default roomSettingsSlice.reducer;
