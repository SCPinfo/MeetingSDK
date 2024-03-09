import {MediaSoupRoom} from "../mediasoup-room";
import { Logger } from "mediasoup-client/lib/Logger";
import { store } from "../../redux/store";

import { meActions } from "../../redux/me/me-slice";
import { defaultRoomConfig } from "../room-config";
import { roomActions } from "../../redux/room/room-slice";
import { producersActions, ProducerSource, ProducerState } from "../../redux/producers/producers-slice";
import { socketService } from "../../socket";
import SocketEvents from "../../../constants/socket-events";
import { mediaPreviewService } from "../../media-preview";
import { getCodec, getEncodings, getVideoConstrains } from "../../../utils/encodingsHandler";
import { ProducerOptions } from "mediasoup-client/lib/Producer";
import { EventsEnum, PermissionErrorsEnum } from "../../../enums";
import { Permission } from "../roles";


const logger = new Logger('WebcamService');

export class WebcamService {
  private mediaSoupRoom: MediaSoupRoom;

  constructor(mediaSoupRoom: MediaSoupRoom ) {
    this.mediaSoupRoom = mediaSoupRoom
  }

  getWebcamType(device: any) {
    if (/(back|rear)/i.test(device.label)) {
      logger.debug('getWebcamType() | it seems to be a back camera');
      return 'back';
    } else {
      logger.debug('getWebcamType() | it seems to be a front camera');
      return 'front';
    }
  }

  canEnableWebcam(){
    const webcamProducer = this.mediaSoupRoom.webcamProducer

    const hasVideoPermission = store.getState().permissions.permissions.includes(Permission.SHARE_VIDEO)

    const canSendWebcam = store.getState().me.canSendWebcam;

    if (webcamProducer || !hasVideoPermission || !canSendWebcam) {
      throw new Error('Cannot produce video');
    }
  }

  async enableWebcam() {
    let track: MediaStreamTrack | null | undefined;
    try {
      logger.debug('enableWebcam()');

      this.canEnableWebcam()

      store.dispatch(meActions.setWebcamInProgress(true));

      const {
        aspectRatio,
        resolution,
        frameRate,
        selectedVideoDeviceId: deviceId,
      } = store.getState().roomSettings;
      const {virtualBackground} = store.getState().room;

      if (!deviceId)
        logger.warn('enableWebcam() no video devices');


      const previewWebcamTrackId = store.getState().me.previewWebcamTrackId;
      if (previewWebcamTrackId) track = mediaPreviewService.getTrack(previewWebcamTrackId);

      const havePreviewTrack = Boolean(track);

      if (!havePreviewTrack) {
        logger.debug('enableWebcam() | calling getUserMedia()');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: {ideal: deviceId},
            ...getVideoConstrains(resolution, aspectRatio),
            frameRate
          }
        });

        ([track] = stream.getVideoTracks());
      }

      if (!track) throw new Error('no webcam track');

      store.dispatch(meActions.setPreviewWebcamTrackId());

      if (previewWebcamTrackId) mediaPreviewService.removeTrack(previewWebcamTrackId);

      const codec = getCodec(this.mediaSoupRoom.rtpCapabilities);

      if (defaultRoomConfig.simulcast) {
        const {width, height} = track.getSettings();

        if (virtualBackground.backgroundEffectEnabled && !virtualBackground.forPreview) {
          //track = await effectsService.applyEffect(track);
        }

        const encodings = getEncodings(
          this.mediaSoupRoom.rtpCapabilities,
          width,
          height
        );

        let producerOptions : ProducerOptions = {
          track,
          appData: {source: 'webcam'}
        }

        console.log("DEVICE",store.getState().me.device);

        if(true /*store.getState().me.device.platform !== "mobile"*/){
          producerOptions = {
             ...producerOptions,
            encodings,
            codecOptions: {videoGoogleStartBitrate: 1000},
            codec
          }
        }

        this.mediaSoupRoom.webcamProducer = await this.mediaSoupRoom.sendTransport.produce(producerOptions);
      } else {
        this.mediaSoupRoom.webcamProducer = await this.mediaSoupRoom.sendTransport.produce(
          {
            track,
            codec,
            appData: {source: 'webcam'}
          });
      }

      // For e2e later
/*      if (this.mediaSoupRoom.e2eKey && e2e.isSupported()) {
        e2e.setupSenderTransform(this.mediaSoupRoom.webcamProducer.rtpSender);
      }*/

        store.dispatch(roomActions.setCameraEnabled(true))
        store.dispatch(producersActions.addProducer(
          {
            id: this.mediaSoupRoom.webcamProducer.id,
            paused: this.mediaSoupRoom.webcamProducer.paused,
            kind: this.mediaSoupRoom.webcamProducer.kind,
            source: this.mediaSoupRoom.webcamProducer.appData["source"] as ProducerSource,
          } as ProducerState));

      // Mediasoup events
      this.mediaSoupRoom.webcamProducer.on(EventsEnum.TransportClose, () => {
        this.mediaSoupRoom.webcamProducer = null;
      });

      this.mediaSoupRoom.webcamProducer.on(EventsEnum.TrackEnded, () => {
        //NotificationHelper.error(translate("room.webcamDisconnected"))
        this.disableWebcam()
          .catch((error: any) => {
            logger.error('disableWebcam() | failed:%o', error);
          });
      });


    } catch (error :any) {
      if(error.message == PermissionErrorsEnum.PermissionDenied)
      {
        store.dispatch(meActions.setWebcamPermissionDenied(true));
      }else{
        //NotificationHelper.error(`${translate("room.couldNotEnableWebcam")}: ${error.message}`)
      }

      logger.error('enableWebcam() | failed:%o', error);
      if (track) track.stop();
    } finally {
      store.dispatch(meActions.setWebcamInProgress(false));
    }
  }

  async disableWebcam(remote = false) {
    try {
      logger.debug('disableWebcam()');
      if (!this.mediaSoupRoom.webcamProducer)
        return;
     const {virtualBackground} = store.getState().room;

      store.dispatch(meActions.setWebcamInProgress(true));

      if(!remote){
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.CloseProducer, {
          producerId: this.mediaSoupRoom.webcamProducer.id,
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })
      }

      if (virtualBackground.backgroundEffectEnabled && !virtualBackground.forPreview) {
         //await effectsService.stop(this.mediaSoupRoom.webcamProducer.track?.id);
      }

      store.dispatch(producersActions.removeProducer(this.mediaSoupRoom.webcamProducer.id));
      store.dispatch(roomActions.setCameraEnabled(false))

      this.mediaSoupRoom.webcamProducer.close();
      this.mediaSoupRoom.webcamProducer = null;
    } catch (error:any) {
      //NotificationHelper.error(`${translate("room.closingServerSideWebcam")}: ${error.message}`)
    } finally {
      store.dispatch(meActions.setWebcamInProgress(false));
    }
  }

/*  changeWebcamDevice(newDeviceId:string): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
      try {

        // Update the actual webcam track with the new device
        if (!this.mediaSoupRoom.webcamProducer)
          return;

        store.dispatch(meActions.setWebcamInProgress(true));

        const {
          aspectRatio,
          resolution,
          frameRate,
        } = getState().roomSettings;

        // Closing the current video track before asking for a new one (mobiles do not like
        // having both front/back cameras open at the same time).
        this.mediaSoupRoom.webcamProducer.track.stop();
        await dispatch(this.mediaSoupRoom.changeMediaDevice({
            video:
              {
                deviceId: { ideal: newDeviceId },
                ...getVideoConstrains(resolution, aspectRatio),
                frameRate
              }
          },
          this.mediaSoupRoom.webcamProducer,
          MediaDeviceType.Video
        ))
      } catch (error:any) {
        NotificationHelper.error(`${translate("room.cannotChangeWebCam")}: ${error.message}`)
      } finally {
        store.dispatch(meActions.setWebcamInProgress(false));
      }
    }
  }*/

  async changeWebcamResolution() {
    // Todo Need Revisit
    /*    try
        {
          logger.debug('changeWebcamResolution()');

          store.dispatch(meActions.setWebcamInProgress(true));

          switch (this.mediaSoupRoom._webcam.resolution)
          {
            case 'qvga':
              this.mediaSoupRoom._webcam.resolution = 'vga';
              break;
            case 'vga':
              this.mediaSoupRoom._webcam.resolution = 'hd';
              break;
            case 'hd':
              this.mediaSoupRoom._webcam.resolution = 'qvga';
              break;
            default:
              this.mediaSoupRoom._webcam.resolution = 'hd';
          }

          logger.debug('changeWebcamResolution() | calling getUserMedia()');

          const stream = await navigator.mediaDevices.getUserMedia({video : {deviceId : { exact: this.mediaSoupRoom._webcam.device.deviceId }, ...VIDEO_CONSTRAINS[this.mediaSoupRoom._webcam.resolution]}});

          const track = stream.getVideoTracks()[0];

          await this.mediaSoupRoom.webcamProducer.replaceTrack({ track });

          store.dispatch(producersActions.setProducerTrack({producerId:this.mediaSoupRoom.webcamProducer.id, track}));

          store.dispatch(meActions.setWebcamInProgress(false));
        }
        catch (error)
        {
          logger.error('changeWebcamResolution() | failed: %o', error);
          NotificationHelper.error(`Could not change webcam resolution: ${error}`)
          store.dispatch(meActions.setWebcamInProgress(false));
        }*/
  }

/*  async serverStopParticipantVideo(producerId:string,peerId:string) {
    logger.debug('serverStopParticipantVideo()');

    try {
      await socketService.request(SocketEvents.MediaSoup, SocketEvents.ModeratorStopVideo, {
        peerId, producerId, callId: store.getState().room.roomData.call.callId, roomServerId: store.getState().room.roomData.call.roomServerId
      })
    }catch (e) {
      // nothing should happen
    }
  }

  /!**
   * We should use this function to update the video settings, but we can't for now because of
   * https://bugs.chromium.org/p/chromium/issues/detail?id=796964.
   * So for now we should restart the producer to update the video settings
   * *!/
  async updateVideoSettings(){
    if(!this.mediaSoupRoom.micProducer) {
      return
    }

    let track: MediaStreamTrack | null | undefined;
    ({ track } = this.mediaSoupRoom.micProducer);

    const {
      aspectRatio,
      resolution,
      frameRate,
    } = store.getState().roomSettings;

    await track?.applyConstraints({
      ...getVideoConstrains(resolution, aspectRatio),
      frameRate
    });
  }
  async restartWebcam() {
    logger.debug('restartWebcam()');
    try {
      const trackId = store.getState().me.previewWebcamTrackId
      await effectsService.stop(trackId);

      await this.disableWebcam()
      await this.enableWebcam()
    } catch (error) {
      logger.error('restartPreviewWebcam() [error:%o]', error);
    }
  }*/
}
