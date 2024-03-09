import { MediaSoupRoom } from "../mediasoup-room";
import { Logger } from "mediasoup-client/lib/Logger";
import { store } from "../../redux/store";
import { Permission } from "../roles";
import { meActions } from "../../redux/me/me-slice";


const logger = new Logger('ShareScreenService');

export class ShareScreenService {
  private mediaSoupRoom: MediaSoupRoom;

  constructor(mediaSoupRoom:MediaSoupRoom) {
    this.mediaSoupRoom = mediaSoupRoom
  }

/*  canShareScreen(){
    const shareProducer = this.mediaSoupRoom.shareProducer

    const hasShareScreenPermission = store.getState().permissions.permissions.includes(Permission.SHARE_SCREEN)

    const canShareScreen = store.getState().me.canShareScreen;

    if (shareProducer || !hasShareScreenPermission || !canShareScreen) {
      throw new Error('Cannot produce share screen');
    }
  }

  async enableShare() {
    let track;
    try {
      logger.debug('enableShare()');

      this.canShareScreen()

      store.dispatch(meActions.setShareInProgress(true));

      const {
        screenSharingResolution,
        screenSharingFrameRate,
        aspectRatio,
      } = store.getState().roomSettings;

      const SCREENSHARE_CONSTRAINTS = {
        audio: false,
        video: {
          ...getVideoConstrains(
            screenSharingResolution,
            aspectRatio
          ),
          frameRate: {max: screenSharingFrameRate},
          displaySurface: 'monitor'
        }
      };

      logger.debug('enableShare() | calling getUserMedia()');
      const stream = await navigator.mediaDevices.getDisplayMedia(SCREENSHARE_CONSTRAINTS);

      ([track] = stream.getVideoTracks());

      if (!track) throw new Error('no screen track');

      const {width, height} = track.getSettings();

      const codec = getCodec(this.mediaSoupRoom.rtpCapabilities)

      if (defaultRoomConfig.simulcastSharing) {
        const encodings = getEncodings(
          this.mediaSoupRoom.rtpCapabilities,
          width,
          height,
          false,
          true
        );

        this.mediaSoupRoom.shareProducer = await this.mediaSoupRoom.sendTransport.produce({
          track: track,
          encodings,
          codecOptions: {
            videoGoogleStartBitrate: 1000
          },
          codec,
          appData: {share: true, source: 'screen'}
        });
      } else {
        this.mediaSoupRoom.shareProducer = await this.mediaSoupRoom.sendTransport.produce({
          track: track,
          codecOptions: {
            videoGoogleStartBitrate: 1000
          },
          codec,
          appData: {share: true, source: 'screen'}
        });
      }

      // For e2e later
      if (this.mediaSoupRoom.e2eKey && e2e.isSupported()) {
        e2e.setupSenderTransform(this.mediaSoupRoom.shareProducer.rtpSender);
      }

      batch(() => {
        store.dispatch(producersActions.addProducer(
          {
            id: this.mediaSoupRoom.shareProducer.id,
            kind: this.mediaSoupRoom.shareProducer.kind,
            source: this.mediaSoupRoom.shareProducer.appData["source"] as ProducerSource,
            paused: this.mediaSoupRoom.shareProducer.paused,
          } as ProducerState));
        store.dispatch(roomActions.setDisplayLayout(DisplayLayoutEnum.Filmstrip))
      })

      // Mediasoup events
      this.mediaSoupRoom.shareProducer.on(EventsEnum.TransportClose, () => {
        this.mediaSoupRoom.shareProducer = null;
      });

      this.mediaSoupRoom.shareProducer.on(EventsEnum.TrackEnded, () => {
        NotificationHelper.error('Share disconnected!')
        this.disableShare()
          .catch((error) => {
            logger.error('disableShare() | failed:%o', error);
          });
      });

    } catch (error: any) {
      logger.error('enableShare() | failed:%o', error);
      if (error.name !== 'NotAllowedError') {
        NotificationHelper.error(`Error sharing: ${error}`)
      }
      if (track) track.stop();
    } finally {
      store.dispatch(meActions.setShareInProgress(false));
    }
  }

  async disableShare(remote = false) {
    try {
      logger.debug('disableShare()');

      if (!this.mediaSoupRoom.shareProducer)
        return;

      store.dispatch(producersActions.removeProducer(this.mediaSoupRoom.shareProducer.id));

      if(!remote){
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.CloseProducer, {
          producerId: this.mediaSoupRoom.shareProducer.id,
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })
      }

      this.mediaSoupRoom.shareProducer.close();
      this.mediaSoupRoom.shareProducer = null;

    } catch (error) {
      logger.error('disableShare() | failed:%o', error);
      NotificationHelper.error(`Error closing server-side share Producer: ${error}`)
    }
  }

  /!**
   * We should use this function to update the video settings, but we can't for now because of
   * https://bugs.chromium.org/p/chromium/issues/detail?id=796964.
   * So for now we should restart the producer to update the video settings
   * *!/
  async updateShareScreenSettings(){
    if(!this.mediaSoupRoom.shareProducer) {
      return
    }

    let track: MediaStreamTrack | null | undefined;
    ({ track } = this.mediaSoupRoom.shareProducer);

    const {
      aspectRatio,
      screenSharingFrameRate,
      screenSharingResolution,
    } = store.getState().roomSettings;

    await track?.applyConstraints({
      ...getVideoConstrains(screenSharingResolution, aspectRatio),
      frameRate: screenSharingFrameRate
    });
  }*/
}
