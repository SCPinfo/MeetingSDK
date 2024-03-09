import {MediaSoupRoom} from "../mediasoup-room";
import { Logger } from "mediasoup-client/lib/Logger";
import { AppThunk, store } from "../../redux/store";
import { Permission } from "../roles";
import { meActions } from "../../redux/me/me-slice";
import { producersActions, ProducerSource, ProducerState } from "../../redux/producers/producers-slice";
import { roomActions } from "../../redux/room/room-slice";
import { socketService } from "../../socket";
import SocketEvents from "../../../constants/socket-events";
import { mediaPreviewService } from "../../media-preview";
import { EventsEnum, PermissionErrorsEnum } from "../../../enums";
import { requestPermission } from "../../../utils/permission";
import DevicePermissions from "../../../constants/permissions";


const logger = new Logger('AudioService');


export class AudioService {
  private mediaSoupRoom: MediaSoupRoom;

  constructor(mediaSoupRoom: MediaSoupRoom) {
    this.mediaSoupRoom = mediaSoupRoom
  }

  canEnableMic(){
    const micProducer = this.mediaSoupRoom.micProducer

    const hasAudioPermission = store.getState().permissions.permissions.includes(Permission.SHARE_AUDIO)

    const canSendMic = store.getState().me.canSendMic;

    if (micProducer || !hasAudioPermission || !canSendMic) {
      throw new Error('Cannot produce audio');
    }
  }


  async enableMic()  {
    let track: MediaStreamTrack | null | undefined;
    try {
      logger.debug('enableMic()');
      this.canEnableMic()
      store.dispatch(meActions.setMicInProgress(true));

      const previewMicTrackId = store.getState().me.previewMicTrackId;
      const deviceId = store.getState().roomSettings.selectedMicrophoneDeviceId

      if (!deviceId)
        logger.warn('enableMic() no audio devices');

      const {
        autoGainControl,
        echoCancellation,
        noiseSuppression,
        sampleRate,
        channelCount,
        sampleSize,
        opusStereo,
        opusDtx,
        opusFec,
        opusPtime,
        opusMaxPlaybackRate
      } = store.getState().roomSettings;

      if (previewMicTrackId) {
        track = mediaPreviewService.getTrack(previewMicTrackId);
      }

      if (!track) {
        logger.debug('enableMic() | calling getUserMedia()');

        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              deviceId: {ideal: deviceId},
              sampleRate,
              channelCount,
              autoGainControl,
              echoCancellation,
              noiseSuppression,
              sampleSize
            }
          });
          ([track] = stream.getAudioTracks());
        }catch (e){
          console.log(e)
        }

      }

      if (!track) throw new Error('no mic track');

      store.dispatch(meActions.setPreviewMicTrackId());

      if (previewMicTrackId) mediaPreviewService.removeTrack(previewMicTrackId);

      this.mediaSoupRoom.micProducer = await this.mediaSoupRoom.sendTransport.produce(
        {
          track,
          codecOptions: {
            opusStereo: opusStereo,
            opusFec: opusFec,
            opusDtx: opusDtx,
            opusMaxPlaybackRate: opusMaxPlaybackRate,
            opusPtime: opusPtime
          },
          appData: {source: 'mic'}
      });


      // For E2e later
/*      if (this.mediaSoupRoom.e2eKey && e2e.isSupported()) {
        e2e.setupSenderTransform(this.mediaSoupRoom.micProducer.rtpSender);
      }*/

/*      if (track) {
        this.mediaSoupRoom.connectLocalHark(track) // used for listening to "isSpeaking" only => can be combined later
        this.mediaSoupRoom.configureHark(track, this.mediaSoupRoom.micProducer) // used for showing the volume hark on my box
      }*/


        store.dispatch(roomActions.setMicEnabled(true))
        store.dispatch(producersActions.addProducer(
          {
            id: this.mediaSoupRoom.micProducer.id,
            kind: this.mediaSoupRoom.micProducer.kind,
            source: this.mediaSoupRoom.micProducer.appData["source"] as ProducerSource,
            // TODO should we rely on appData.paused?
            paused: this.mediaSoupRoom.micProducer.paused
          } as ProducerState));


      // Media-soup events
      this.mediaSoupRoom.micProducer.on(EventsEnum.TransportClose, () => {
        this.mediaSoupRoom.micProducer = null;
      });

      this.mediaSoupRoom.micProducer.on(EventsEnum.TrackEnded, () => {
        //NotificationHelper.error('Microphone disconnected!')

        this.disableMic()
          .catch((error: any) => {
            logger.error('enableMic() | failed:%o', error);
          });
      });

    } catch (error:any) {
      logger.error('enableMic() | failed:%o', error);
      if(error.message == PermissionErrorsEnum.PermissionDenied)
      {
        store.dispatch(meActions.setMicPermissionDenied(true));
      }else{
        //NotificationHelper.error(`${translate("room.couldNotEnableMic")}: ${error.message}`)
      }

      if (track) track.stop();
    } finally {
      store.dispatch(meActions.setMicInProgress(false));
    }
  }

  async disableMic(remote = false) {
    try {
      logger.debug('disableMic()');

      if (!this.mediaSoupRoom.micProducer)
        return;

      store.dispatch(meActions.setMicInProgress(true));

      //this.mediaSoupRoom.disconnectLocalHark()


      store.dispatch(roomActions.setMicEnabled(false))
      store.dispatch(producersActions.removeProducer(this.mediaSoupRoom.micProducer.id));


      if(!remote){
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.CloseProducer, {
          producerId: this.mediaSoupRoom.micProducer.id,
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })
      }

      this.mediaSoupRoom.micProducer.close();
      this.mediaSoupRoom.micProducer = null;
    } catch (error:any) {
      logger.error('disableMic() | failed: %o', error);
      //NotificationHelper.error(`Error closing server-side mic Producer: ${error.message}`)
    }finally {
      store.dispatch(meActions.setMicInProgress(false));
    }
  }

  async muteMic(remote= false) {
    try {
      logger.debug('muteMic()');

      if (!this.mediaSoupRoom.micProducer)
        return;

      store.dispatch(meActions.setMicInProgress(true));

      this.mediaSoupRoom.micProducer.pause();

      if(!remote){
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.PauseProducer, {
          producerId: this.mediaSoupRoom.micProducer.id,
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })
      }


        store.dispatch(roomActions.setMicEnabled(false))
        store.dispatch(producersActions.setProducerPaused(this.mediaSoupRoom.micProducer.id));


    } catch (error:any) {
      logger.error('muteMic() | failed: %o', error);
      //NotificationHelper.error(`Error pausing server-side mic Producer: ${error.message}`)
    }finally {
      store.dispatch(meActions.setMicInProgress(false));
    }
  }

  async unmuteMic(remote = false) {
    try {
      logger.debug('unmuteMic()');

      if (!this.mediaSoupRoom.micProducer)
        return;

      store.dispatch(meActions.setMicInProgress(true));

      this.mediaSoupRoom.micProducer.resume();

      if(!remote) {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.ResumeProducer, {
          producerId: this.mediaSoupRoom.micProducer.id, callId: store.getState().room.roomData.call.callId, roomServerId: store.getState().room.roomData.call.roomServerId
        })
      }


        store.dispatch(roomActions.setMicEnabled(true))
        store.dispatch(producersActions.setProducerResumed(this.mediaSoupRoom.micProducer.id));


    } catch (error:any) {
      logger.error('unmuteMic() | failed: %o', error);
      //NotificationHelper.error(`Error resuming server-side mic Producer: ${error.message}`)
    }finally {
      store.dispatch(meActions.setMicInProgress(false));
    }
  }

/*  changeMicDevice(newDeviceId): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
      try {
        logger.debug('changeMicDevice()');

        if (!this.mediaSoupRoom.micProducer)
          return;

        const {
          autoGainControl,
          echoCancellation,
          noiseSuppression,
          sampleRate,
          channelCount,
          sampleSize,
        } = getState().roomSettings;

        // Update the actual mic track with the new device
        await dispatch(this.mediaSoupRoom.changeMediaDevice({
            audio: {
              deviceId: { ideal: newDeviceId },
              sampleRate,
              channelCount,
              autoGainControl,
              echoCancellation,
              noiseSuppression,
              sampleSize
            }
          },
          this.mediaSoupRoom.micProducer,
          MediaDeviceType.Audio
        ))
      } catch (error) {
        logger.error('changeMicDevice() | failed: %o', error);
      }
    }
  }

  async enableAudioOnly() {
    logger.debug('enableAudioOnly()');

    store.dispatch(meActions.setAudioOnlyInProgress(true));


    for (const consumer of this.mediaSoupRoom.consumers.values()) {
      if (consumer.kind !== 'video')
        continue;

      this.mediaSoupRoom.pauseConsumer(consumer);
    }

    store.dispatch(meActions.setPeersCameraOffState(true));

    store.dispatch(meActions.setAudioOnlyInProgress(false));
  }*/

/*  async disableAudioOnly() {
    logger.debug('disableAudioOnly()');

    store.dispatch(meActions.setAudioOnlyInProgress(true));


    for (const consumer of this.mediaSoupRoom.consumers.values()) {
      if (consumer.kind !== 'video')
        continue;

      this.mediaSoupRoom.resumeConsumer(consumer);
    }

    store.dispatch(meActions.setPeersCameraOffState(false));

    store.dispatch(meActions.setAudioOnlyInProgress(false));
  }*/

/*  muteParticipantsAudioLocally() {
    logger.debug('muteParticipantsAudioLocally()');

    store.dispatch(meActions.setPeersAudioOffState(true));
  }

  unmuteParticipantsAudioLocally() {
    logger.debug('unmuteParticipantsAudioLocally()');

    store.dispatch(meActions.setPeersAudioOffState(false));
  }

  async serverMuteParticipant(producerId:string,peerId:string) {
    logger.debug('serverMuteParticipant()');

    try {
      await socketService.request(SocketEvents.MediaSoup, SocketEvents.ModeratorMute, {
        peerId, producerId, callId: store.getState().room.roomData.call.callId, roomServerId: store.getState().room.roomData.call.roomServerId
      })
    }catch (e) {
      // nothing should happen
    }
  }

  async updateAudioSettings ( settings :IAudioSettings ):Promise<void>
  {
    try {
        await store.dispatch(roomSettingsActions.updateSettings(settings));

        const micEnabled = store.getState().room.micEnabled ;
        const micProducer = this.mediaSoupRoom.micProducer

        if(micEnabled && micProducer){
          //Disable and enable the mic to retain its current status and apply new settings.
          await this.disableMic();
          await this.enableMic();
        }
        else if(micProducer)
        {
         //If micProducer has a value and the mic is not enabled, disable the mic; enabling it later will apply new settings.
          await this.disableMic();
        }

      } catch (error:any) {
        logger.error('updateAudioSettings() [error:"%o"]', error);
        NotificationHelper.error(translate(`meetings.${error.message}`))
      }
 }


  /!**
   * We should use this function to update the audio settings, but we can't for now because of
   * https://bugs.chromium.org/p/chromium/issues/detail?id=796964.
   * So for now we should restart the producer to update the audio settings
   * *!/
  async updateAudioSettingsOldVersion(){
    if(!this.mediaSoupRoom.micProducer){
      return
    }

    let track: MediaStreamTrack | null | undefined;
    ({ track } = this.mediaSoupRoom.micProducer);

    const {
      autoGainControl,
      echoCancellation,
      noiseSuppression,
      sampleRate,
      channelCount,
      sampleSize,
    } = store.getState().roomSettings;

    await track?.applyConstraints({
      sampleRate,
      channelCount,
      autoGainControl,
      echoCancellation,
      noiseSuppression,
      sampleSize
    });
  }*/
}
