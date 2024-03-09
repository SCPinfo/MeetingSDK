
import { AppThunk } from "../redux/store";
import { meActions } from "../redux/me/me-slice";
import { Logger } from "../../utils/Logger";
import { getVideoConstrains } from "../../utils/encodingsHandler";


const logger = new Logger('mediaPreviewService');

export const mediaPreviewService={
  tracks: new Map() as Map<string, MediaStreamTrack>,
  getTrack(trackId: string): MediaStreamTrack | undefined {
    return this.tracks.get(trackId);
  },
  addTrack(track: MediaStreamTrack): void {
    this.tracks.set(track.id, track);
  },
  removeTrack(trackId: string): void {
    logger.debug('removeTrack() [trackId:%s]', trackId);
    this.tracks.delete(trackId);
  },
  cleanupTracks(){
    for (const track of mediaPreviewService.tracks.values()) {
      track.stop();
    }
    mediaPreviewService.tracks.clear();
  },
  enablePreviewMic: (): AppThunk<Promise<any>> => async (dispatch,getState): Promise<any> => {
    logger.debug('enablePreviewMic()');
    dispatch(meActions.setMicInProgress(true));

    let track: MediaStreamTrack | undefined | null;

    try {

      const {
        autoGainControl,
        echoCancellation,
        noiseSuppression,
        sampleRate,
        channelCount,
        sampleSize,
      } = getState().roomSettings;

      const deviceId = getState().roomSettings.selectedMicrophoneDeviceId

      if (!deviceId)
        logger.warn('enablePreviewMic() no devices');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: { ideal: deviceId },
          sampleRate,
          channelCount,
          autoGainControl,
          echoCancellation,
          noiseSuppression,
          sampleSize
        }
      });

      ([track] = stream.getAudioTracks());

      mediaPreviewService.addTrack(track);

      dispatch(meActions.setPreviewMicTrackId(track.id));

    } catch (error) {
      logger.error('enablePreviewMic() [error:%o]', error);
    } finally {
      dispatch(meActions.setMicInProgress(false));
    }
  },
  stopPreviewMic: (): AppThunk<Promise<any>> => async (dispatch,getState): Promise<any> => {
    logger.debug('stopPreviewMic()');

    dispatch(meActions.setMicInProgress(true));

    const { previewMicTrackId } = getState().me;

    if (previewMicTrackId) {
      const track = mediaPreviewService.getTrack(previewMicTrackId);

      dispatch(meActions.setPreviewMicTrackId());

      if (track) {
        track.stop();
        mediaPreviewService.removeTrack(track.id);
      }
    }

    dispatch(meActions.setMicInProgress(false));
  },

  restartPreviewMic: (): AppThunk<Promise<any>> => async (dispatch,getState): Promise<any> => {
    logger.debug('restartPreviewMic()');
    try {
      if(!getState().me.previewMicTrackId){
        // There is no preview tracks to restart
        return
      }

      await dispatch(mediaPreviewService.stopPreviewMic())
      await dispatch(mediaPreviewService.enablePreviewMic())
    } catch (error) {
      logger.error('restartPreviewMic() [error:%o]', error);
    }
  },
  enablePreviewWebcam: (): AppThunk<Promise<any>> => async (dispatch,getState): Promise<any> => {
    logger.debug('enablePreviewWebcam()');
    dispatch(meActions.setWebcamInProgress(true));

    let track: MediaStreamTrack | undefined | null;

    try {

      const {
        aspectRatio,
        resolution,
        frameRate,
      } = getState().roomSettings;
      const {virtualBackground} = getState().room
      const deviceId = getState().roomSettings.selectedVideoDeviceId

      if (!deviceId)
        logger.warn('enablePreviewWebcam() no webcam devices');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {ideal: deviceId},
          ...getVideoConstrains(resolution, aspectRatio),
          frameRate
        }
      });

      ([track] = stream.getVideoTracks());
      if (virtualBackground.backgroundEffectEnabled) {
        //track = await effectsService.applyEffect(track);
      }
      mediaPreviewService.addTrack(track);
      dispatch(meActions.setPreviewWebcamTrackId(track.id));

    } catch (error) {
      logger.error('enablePreviewWebcam() [error:%o]', error);
    } finally {
      dispatch(meActions.setWebcamInProgress(false));
    }
  },
  stopPreviewWebcam: (): AppThunk<Promise<any>> => async (dispatch,getState): Promise<any> => {
    logger.debug('stopPreviewWebcam()');

    dispatch(meActions.setWebcamInProgress(true));

    const { previewWebcamTrackId } = getState().me;
    const {virtualBackground} = getState().room

    if (previewWebcamTrackId) {
      const track = mediaPreviewService.getTrack(previewWebcamTrackId);

      dispatch(meActions.setPreviewWebcamTrackId());

      if (track) {
        mediaPreviewService.removeTrack(track.id);
        track.stop();
      }

      if (virtualBackground.backgroundEffectEnabled) {
         //await effectsService.stop(track.id);
      }
    }
    dispatch(meActions.setWebcamInProgress(false));
  },
  restartPreviewWebcam: (): AppThunk<Promise<any>> => async (dispatch,getState): Promise<any> => {
    logger.debug('restartPreviewWebcam()');
    try {
      const trackId = getState().me.previewWebcamTrackId
      if(!trackId){
        // There is no preview tracks to restart
        return
      }
      //await effectsService.stop(trackId);
      await dispatch(mediaPreviewService.stopPreviewWebcam())
      await dispatch(mediaPreviewService.enablePreviewWebcam())
    } catch (error) {
      logger.error('restartPreviewWebcam() [error:%o]', error);
    }
  },


}
