export interface DeviceMediaCapabilities {
  canSendMic: boolean;
  canSendWebcam: boolean;
  canShareScreen: boolean;
}

export interface AudioPreset {
  name: string;
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
}

export type Resolution = 'low' | 'medium' | 'high' | 'veryhigh' | 'ultra';

export type ProducerCodec = 'video/vp8' | 'video/vp9' | 'video/h264' | 'audio/opus';

export interface SimulcastProfile {
  scaleResolutionDownBy: number;
  maxBitrate: number;
}
