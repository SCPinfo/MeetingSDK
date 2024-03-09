import { DisplayLayoutEnum } from "../../enums/display-layout-enum";
import { AudioPreset, Resolution } from "./types";
import { NotificationSettings } from "../../models/notification-settings";


interface DefaultRoomConfig {
  managementUrl: undefined;
  loginEnabled: boolean;
  developmentPort: number;
  productionPort: number;
  serverHostname: undefined;
  hideNonVideo: boolean;
  resolution: Resolution;
  defaultLayout: DisplayLayoutEnum
  frameRate: number;
  screenSharingResolution: Resolution;
  screenSharingFrameRate: number;
  aspectRatio: number;
  simulcast: boolean;
  simulcastSharing: boolean;
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
  audioPreset: string;
  audioPresets: Record<string, AudioPreset>;
  noiseThreshold :number;
  notificationSettings :NotificationSettings ;
}



export const defaultRoomConfig: DefaultRoomConfig = {
  managementUrl: undefined,
  loginEnabled: false,
  developmentPort: 8443,
  productionPort: 443,
  serverHostname: undefined,
  hideNonVideo: false,
  resolution: 'medium',
  defaultLayout: DisplayLayoutEnum.Gallery,
  frameRate: 30,
  screenSharingResolution: 'veryhigh',
  screenSharingFrameRate: 30,
  aspectRatio: 1.7778, // 16:9
  simulcast: true,
  simulcastSharing: false,
  autoGainControl: true,
  echoCancellation: true,
  noiseSuppression: true,
  sampleRate: 48000,
  channelCount: 1,
  sampleSize: 16,
  opusStereo: false,
  opusDtx: true,
  opusFec: true,
  opusPtime: 20,
  opusMaxPlaybackRate: 48000,
  noiseThreshold :-60,
  audioPreset: 'conference',
  audioPresets: {
    conference: {
      'name': 'Conference audio',
      'autoGainControl': true,
      'echoCancellation': true,
      'noiseSuppression': true,
      'sampleRate': 48000,
      'channelCount': 1,
      'sampleSize': 16,
      'opusStereo': false,
      'opusDtx': true,
      'opusFec': true,
      'opusPtime': 20,
      'opusMaxPlaybackRate': 48000
    },
    hifi: {
      'name': 'HiFi streaming',
      'autoGainControl': false,
      'echoCancellation': false,
      'noiseSuppression': false,
      'sampleRate': 48000,
      'channelCount': 2,
      'sampleSize': 16,
      'opusStereo': true,
      'opusDtx': false,
      'opusFec': true,
      'opusPtime': 60,
      'opusMaxPlaybackRate': 48000
    }
  },
  notificationSettings : {
    display:{
      participantJoined: true,
      participantRaisedHand:  true,
      participantLeftRoom:true,
      participantWaitingInLobby:  true,
      chatMessages:true
    },
    sound:{
      participantJoinSound: true,
      raiseHandSound: true,
      chatMessageSound: true,
      hangupMeetingSound: true,
      actionsSound: true,
      waitingInLobbySound :true
    }
  }
};
