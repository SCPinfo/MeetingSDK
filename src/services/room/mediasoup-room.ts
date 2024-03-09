import { socketService } from "../socket";
import SocketEvents from "../../constants/socket-events";
import { store } from "../redux/store";
import { SignalingService } from "./room-services/signaling-service";
import { ShareScreenService } from "./room-services/share-screen-service";
import { WebcamService } from "./room-services/webcam-service";
import { AudioService } from "./room-services/audio-service";
import { Consumer } from "mediasoup-client/lib/Consumer";
import { Producer, RtpCapabilities, Transport } from "mediasoup-client/lib/types";
import * as mediaSoupClient from "mediasoup-client";
import { PC_PROPRIETARY_CONSTRAINTS } from "./constants";
import { RoomConnectionStateEnum } from "../../enums/room-connection-status-enum";
import { RoomArchEnum } from "../../enums/room-arch-enum";
import {DeviceMediaCapabilities} from './types'
import { roomActions } from "../redux/room/room-slice";
import { peersActions } from "../redux/peers/peers-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { meActions } from "../redux/me/me-slice";
import { consumersActions } from "../redux/consumers/consumers-slice";
import { Logger } from "../../utils/Logger";
import { EventsEnum } from "../../enums";

const logger = new Logger('MediaSoupRoom');

export class MediaSoupRoom {
  public sendTransport: Transport
  public recvTransport: Transport
  public mediaSoupDevice: mediaSoupClient.Device
  public micProducer: Producer
  public webcamProducer: Producer
  public shareProducer: Producer
  public e2eKey: string;
  public consumers: Map<string, Consumer>
  public audioService: AudioService
  public webcamService: WebcamService
  public shareScreenService: ShareScreenService
  public signalingService: SignalingService

  constructor() {
    this.consumers = new Map<string, Consumer>()
    this.audioService = new AudioService(this)
    this.webcamService = new WebcamService(this)
    this.shareScreenService = new ShareScreenService(this)
    this.signalingService = new SignalingService(this)
  }


  public getProducer(producerId: string): Producer | undefined {
    if (this.micProducer?.id === producerId) return this.micProducer
    if (this.shareProducer?.id === producerId) return this.shareProducer
    if (this.webcamProducer?.id === producerId) return this.webcamProducer
    return undefined
  }

  public getConsumer(consumerId: string): Consumer | undefined {
    return this.consumers.get(consumerId);
  }

  public getConsumers(): Consumer[] {
    return Array.from(this.consumers.values());
  }

  get rtpCapabilities(): RtpCapabilities | undefined {
    return this.mediaSoupDevice?.rtpCapabilities;
  }

  get mediaCapabilities(): DeviceMediaCapabilities {
    return {
      canSendMic: this.mediaSoupDevice.canProduce('audio'),
      canSendWebcam: this.mediaSoupDevice.canProduce('video'),
      canShareScreen: Boolean(navigator.mediaDevices.getDisplayMedia) &&
        this.mediaSoupDevice.canProduce('video'),
    };
  }

  async prepareMediaSoupDevice() {
    this.mediaSoupDevice = new mediaSoupClient.Device({handlerName:"ReactNativeUnifiedPlan"});

    const {routerRtpCapabilities} = await socketService.request(SocketEvents.MediaSoup, SocketEvents.GetRouterRtpCapabilities, {callId: store.getState().room.roomData.call.callId,roomServerId:store.getState().room.roomData.call.roomServerId})

    await this.mediaSoupDevice.load({routerRtpCapabilities});

    return routerRtpCapabilities
  }

  async sendRtpCapabilities() {
    await socketService.request(SocketEvents.MediaSoup, SocketEvents.RtpCapabilities, {rtpCapabilities:this.mediaSoupDevice.rtpCapabilities,callId: store.getState().room.roomData.call.callId,roomServerId:store.getState().room.roomData.call.roomServerId})
  }

/*
  configureHark(track,controller) {
    const harkStream = new MediaStream();

    harkStream.addTrack(track);

    const streamHark = hark(harkStream, {
      play: false,
      interval: 100,
      threshold: -60,
      history: 100
    });

    controller.appData.hark = streamHark;
    controller.appData.volumeWatcher = new VolumeWatcher({ hark: streamHark });
  }

  disconnectLocalHark()
  {
    if (this._harkStream != null)
    {
      let [ track ] = this._harkStream.getAudioTracks();

      track.stop();
      track = null;

      this._harkStream = null;
    }

    if (this._hark != null)
      this._hark.stop();
  }

  connectLocalHark(track)
  {

    this._harkStream = new MediaStream();

    const newTrack = track.clone();

    this._harkStream.addTrack(newTrack);

    newTrack.enabled = true;

    this._hark = hark(this._harkStream,
      {
        play      : false,
        interval  : 10,
        threshold : -60,
        history   : 100
      });

    // we can use this later if we want instead of the watcher created the volume component for my hark => volume_change
    this._hark.on('speaking', () =>
    {
      if (this.micProducer && this.micProducer.paused){
        store.dispatch(meActions.setIsSpeaking(true));
      }
    });

    this._hark.on('stopped_speaking', () =>
    {
      store.dispatch(meActions.setIsSpeaking(false));
    });
  }
*/

  initRoomPeers(peers: any) {
    // Exclude current user
    delete peers[socketService.socketInstance.id]

    store.dispatch(peersActions.addPeers(peers));
  }

  async createSendTransport() {

    const transportInfo = await socketService.request(SocketEvents.MediaSoup, SocketEvents.CreateWebRtcTransport, {
      forceTcp:false,
      producing:true,
      consuming:false,
      sctpCapabilities: this.mediaSoupDevice.sctpCapabilities,
      callId: store.getState().room.roomData.call.callId,
      roomServerId:store.getState().room.roomData.call.roomServerId
    })

    const {id, iceParameters, iceCandidates, dtlsParameters, sctpParameters} = transportInfo;
    const iceServers = await AsyncStorage.getItem("IceServers");
    this.sendTransport = this.mediaSoupDevice.createSendTransport(
      {
        id,
        iceParameters,
        iceCandidates,
        dtlsParameters:
          {
            ...dtlsParameters,
            // Remote DTLS role. We know it's always 'auto' by default so, if
            // we want, we can force local WebRTC transport to be 'client' by
            // indicating 'server' here and vice-versa.
            role: 'auto'
          },
        sctpParameters,
        iceServers: iceServers ? JSON.parse(iceServers) : [],
        proprietaryConstraints: PC_PROPRIETARY_CONSTRAINTS,
        additionalSettings: {encodedInsertableStreams: this.e2eKey && false/*e2e.isSupported()*/}
      });

    this.sendTransport.on(EventsEnum.Connect, ({dtlsParameters}: any, callback: any, errback: any) => // eslint-disable-line no-shadow
    {
      socketService.request(SocketEvents.MediaSoup, SocketEvents.ConnectWebRtcTransport, {
        transportId: this.sendTransport.id,
        dtlsParameters,
        callId: store.getState().room.roomData.call.callId,
        roomServerId:store.getState().room.roomData.call.roomServerId
      })
        .then(callback)
        .catch(errback);
    });

    this.sendTransport.on(EventsEnum.Produce, async ({kind, rtpParameters,appData}: any, callback: any, errback: any) => {
      try {
        const {id} = await socketService.request(SocketEvents.MediaSoup, SocketEvents.Produce, {
          transportId: this.sendTransport.id,
          kind,
          rtpParameters,
          paused: false,
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId,
          appData
        })
        callback({id});
      } catch (error) {
        errback(error);
      }
    });

    this.sendTransport.on(EventsEnum.Connectionstatechange, async (state: any) => {
      switch (state) {
        case RoomConnectionStateEnum.Connected:
          break
        case RoomConnectionStateEnum.Disconnected:
          break
        case "failed":
           await this.restartIce("producer")
          break
        default:
          break
      }
    });
  }

  async createReceiveTransport() {
    const transportInfo = await socketService.request(SocketEvents.MediaSoup, SocketEvents.CreateWebRtcTransport, {
      forceTcp:false,
      producing:false,
      consuming:true,
      sctpCapabilities: this.mediaSoupDevice.sctpCapabilities,
      callId: store.getState().room.roomData.call.callId,
      roomServerId:store.getState().room.roomData.call.roomServerId
    })
    const {id, iceParameters, iceCandidates, dtlsParameters, sctpParameters} = transportInfo;
    const iceServers = await AsyncStorage.getItem("IceServers");
    this.recvTransport = this.mediaSoupDevice.createRecvTransport(
      {
        id,
        iceParameters,
        iceCandidates,
        dtlsParameters:
          {
            ...dtlsParameters,
            // Remote DTLS role. We know it's always 'auto' by default so, if
            // we want, we can force local WebRTC transports to be 'client' by
            // indicating 'server' here and vice-versa.
            role: 'auto'
          },
        sctpParameters,
        iceServers: iceServers ? JSON.parse(iceServers) : [],
        additionalSettings: {encodedInsertableStreams: this.e2eKey && false/*e2e.isSupported()*/}
      });

    this.recvTransport.on(
      EventsEnum.Connect, ({dtlsParameters}: any, callback: any, errback: any) => // eslint-disable-line no-shadow
      {
        socketService.request(SocketEvents.MediaSoup, SocketEvents.ConnectWebRtcTransport, {
          transportId: this.recvTransport.id,
          dtlsParameters,
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })
          .then(callback)
          .catch(errback);
      });


    this.recvTransport.on(EventsEnum.Connectionstatechange, async (state: any) => {
      switch (state) {
        case RoomConnectionStateEnum.Connected:
          break
        case RoomConnectionStateEnum.Disconnected:
          break
        case "failed":
          await this.restartIce("consumer")
          break
        default:
          break
      }
    });
  }


  async connect() {
    try {
      this.initRoom()
      this.signalingService.initializeListeners()
    } catch (error: any) {
      return error
    }
  }

  async initRoom() {
    try {
      logger.debug('initRoom()');

      // Join room on server and return current active peers
      const {peers, lobbyPeers, locked, breakoutRooms,recordingStatus} = await socketService.request(SocketEvents.Calls, SocketEvents.JoinCall, {
        callId: store.getState().room.roomData.call.callId,
        isPublicMeeting: store.getState().room.roomData.isPublic,
        allowMultipleDevices: true,
        roomArch:RoomArchEnum.SfuMeeting
      })

      //Save start meeting date to calculate duration (Timer)
      store.dispatch(roomActions.setMeetingStarted());
      this.initRoomPeers(peers)

      //store.dispatch(lobbyPeersActions.addPeers(lobbyPeers))
      //store.dispatch(permissionsActions.setLocked(locked))
      store.dispatch(roomActions.setRoomState(RoomConnectionStateEnum.Connected));

      //store.dispatch(roomActions.setRecordingStatus(recordingStatus))

    } catch (error :any) {
      logger.error('joinRoom() failed:%o', error.message);
      //NotificationHelper.error(`${translate("room.couldNotJoinTheRoom")}: ${error.message}`)
      this.close();
    }
  }

  async startMedia() {
    try {
      logger.debug('startMedia()');

      await this.prepareMediaSoupDevice()

      // Create mediaSoup Transport for sending
      await this.createSendTransport()

      // Create mediaSoup Transport for receiving
      await this.createReceiveTransport()

      this.sendRtpCapabilities()

      // Set our media capabilities.
      store.dispatch(meActions.setMediaCapabilities(this.mediaCapabilities));

      // Enable mic/webcam.
      const {micEnabled, cameraEnabled} = store.getState().room

      if (micEnabled)
        this.audioService.enableMic();

      if (cameraEnabled)
        this.webcamService.enableWebcam();


    } catch (error) {
      console.log(error)
      logger.error('startMedia() failed:%o', error);
      //NotificationHelper.error(`${translate("room.couldNotJoinTheRoom")}: ${error}`)
      this.close();
    }
  }

  close() {
    logger.debug('close()');

    // Close mediaSoup Transports.
    if (this.sendTransport) {
      this.sendTransport.close();
      this.sendTransport = null;
    }

    if (this.recvTransport) {
      this.recvTransport.close();
      this.recvTransport = null;
    }

    //this.disconnectLocalHark();

    this.mediaSoupDevice = null

    this.signalingService.removeListeners()
  }



/*  changeMediaDevice(constraints: MediaStreamConstraints | undefined, producer: Producer, type: MediaDeviceType): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
      // when this bug is resolved :https://bugs.chromium.org/p/chromium/issues/detail?id=796964.
      // we should use the track inside the producer. using track.getConstraints() then apply it on the new track using
      // track.applyConstraints(). instead of passing the constraints as a prop
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      let producerState: ProducerState = type === MediaDeviceType.Video ? webcamProducerSelector(getState()) : micProducerSelector(getState());

      if (!producerState.paused)
        dispatch(producersActions.setProducerPaused(producer.id));

      let track: MediaStreamTrack | null = type === MediaDeviceType.Video ? stream.getVideoTracks()[0] : stream.getAudioTracks()[0];
      await producer.replaceTrack({track});

      if (!producerState.paused)
        dispatch(producersActions.setProducerResumed(producer.id));
    }
  }*/

  async restartIce(transportType: "producer" | "consumer" ) {
    try {
      logger.debug('restartIce() ',transportType);

      store.dispatch(meActions.setRestartICEInProgress(true));
      const transport = transportType === "producer" ? this.sendTransport : this.recvTransport

      if (transport) {
        const {iceParameters} = await socketService.request(SocketEvents.MediaSoup, SocketEvents.RestartIce, {
          transportId: transport.id,
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })

        await transport.restartIce({iceParameters});
      }

      //NotificationHelper.info(translate("room.iceRestarted"))
      store.dispatch(meActions.setRestartICEInProgress(false));
    } catch (error) {
      logger.error('restartIce() | failed:%o', error);
      store.dispatch(meActions.setRestartICEInProgress(false));
      //NotificationHelper.error(`${translate("room.iceRestartFailed")}: ${error}`)
    }
  }

/*  async setMaxSendingSpatialLayer(spatialLayer: any) {
    try {
      logger.debug('setMaxSendingSpatialLayer() [spatialLayer:%s]', spatialLayer);
      if (this.webcamProducer)
        await this.webcamProducer.setMaxSpatialLayer(spatialLayer);
      else if (this.shareProducer)
        await this.shareProducer.setMaxSpatialLayer(spatialLayer);
    } catch (error) {
      logger.error('setMaxSendingSpatialLayer() | failed:%o', error);
      NotificationHelper.error(`Error setting max sending video spatial layer: ${error}`)
    }
  }

  async setConsumerPreferredLayers(consumerId: any, spatialLayer: any, temporalLayer: any) {
    try {
      logger.debug('setConsumerPreferredLayers() [consumerId:%s, spatialLayer:%s, temporalLayer:%s]', consumerId, spatialLayer, temporalLayer);
      await socketService.request(SocketEvents.MediaSoup, SocketEvents.SetConsumerPreferredLayers, {
        consumerId,
        spatialLayer,
        temporalLayer,
        callId: store.getState().room.roomData.call.callId,
        roomServerId:store.getState().room.roomData.call.roomServerId
      })
      store.dispatch(consumersActions.setConsumerPreferredLayers({consumerId, spatialLayer, temporalLayer}));
    } catch (error) {
      logger.error('setConsumerPreferredLayers() | failed:%o', error);
      NotificationHelper.error(`Error setting Consumer preferred layers: ${error}`)
    }
  }

  async setConsumerPriority(consumerId: any, priority: any) {
    try {
      logger.debug('setConsumerPriority() [consumerId:%s, priority:%d]', consumerId, priority);
      await socketService.request(SocketEvents.MediaSoup, SocketEvents.SetConsumerPriority, {
        consumerId,
        priority,
        callId: store.getState().room.roomData.call.callId,
        roomServerId:store.getState().room.roomData.call.roomServerId
      })
      store.dispatch(consumersActions.setConsumerPriority({consumerId, priority}));
    } catch (error) {
      logger.error('setConsumerPriority() | failed:%o', error);
      NotificationHelper.error(`Error setting Consumer priority: ${error}`)
    }
  }

  async requestConsumerKeyFrame(consumerId: any) {
    try {
      logger.debug('requestConsumerKeyFrame() [consumerId:%s]', consumerId);
      await socketService.request(SocketEvents.MediaSoup, SocketEvents.RequestConsumerKeyFrame, {
        consumerId,
        callId: store.getState().room.roomData.call.callId,
        roomServerId:store.getState().room.roomData.call.roomServerId
      })
      NotificationHelper.info('Keyframe requested for video consumer')
    } catch (error) {
      logger.error('requestConsumerKeyFrame() | failed:%o', error);
      NotificationHelper.error(`Error requesting key frame for Consumer: ${error}`)
    }
  }

  async pauseConsumer(consumer: any) {
    try {
      if (consumer.paused)
        return;

      await socketService.request(SocketEvents.MediaSoup, SocketEvents.PauseConsumer, {
        consumerId: consumer.id,
        callId: store.getState().room.roomData.call.callId,
        roomServerId:store.getState().room.roomData.call.roomServerId
      })

      consumer.pause();

      store.dispatch(consumersActions.setConsumerPaused({consumerId: consumer.id, local: true}));
    } catch (error) {
      logger.error('_pauseConsumer() | failed:%o', error);
      NotificationHelper.error(`Error pausing Consumer: ${error}`)
    }
  }
*/

  async resumeConsumer(consumer: any,local = true) {
    try {

      await socketService.request(SocketEvents.MediaSoup, SocketEvents.ResumeConsumer, {
        consumerId: consumer.id,
        callId: store.getState().room.roomData.call.callId,
        roomServerId:store.getState().room.roomData.call.roomServerId
      })

      if(local)
      consumer.resume();

      store.dispatch(consumersActions.setConsumerResumed({consumerId: consumer.id, local: local}));
    } catch (error) {
      logger.error('_resumeConsumer() | failed:%o', error);
      //NotificationHelper.error(`Error resuming Consumer: ${error}`)
    }
  }

/*
  setRaisedHand(raisedHand: boolean): AppThunk {
    return async (dispatch, getState) => {
      dispatch(meActions.setRaiseHandInProgress(true));

      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.RaisedHand, {
          raisedHand,
          callId: getState().room.roomData.call.callId,
          roomServerId:getState().room.roomData.call.roomServerId
        })

        dispatch(meActions.setRaisedHand(raisedHand));
      } catch (error) {

        dispatch(meActions.setRaisedHand(!raisedHand));
      } finally {
        dispatch(meActions.setRaiseHandInProgress(false));
      }
    }
  }

  lockRoom(): AppThunk {
    return async (dispatch, getState) => {
      logger.debug('lock()');
      dispatch(roomActions.updateRoom({ lockInProgress: true }));

      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.LockRoom, {
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })
        dispatch(permissionsActions.setLocked(true));
      } catch (error) {
        logger.error('lock() [error:"%o"]', error);
      } finally {
        dispatch(roomActions.updateRoom({ lockInProgress: false }));
      }
    }
  }

  unlockRoom(): AppThunk {
    return async (dispatch, getState) => {
      logger.debug('unlock()');
      dispatch(roomActions.updateRoom({ lockInProgress: true }));

      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.UnlockRoom, {
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId
        })

        dispatch(permissionsActions.setLocked(false));
      } catch (error) {
        logger.error('unlock() [error:"%o"]', error);
      } finally {
        dispatch(roomActions.updateRoom({ lockInProgress: false }));
      }
    }
  }

  async promotePeer(peerId: string) {
      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.PromotePeer, {
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId,
          peerId
        })
      } catch (error) {
        logger.error('promotePeer() [error:"%o"]', error);
      }
  }

  promotePeers(): AppThunk {
    return async (dispatch, getState) => {
      logger.debug('promotePeers()');

      dispatch(roomActions.updateRoom({ lobbyPeersPromotionInProgress: true }));

      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.PromoteAllPeers, {
          callId: store.getState().room.roomData.call.callId,
          roomServerId:store.getState().room.roomData.call.roomServerId,
        })
      } catch (error) {
        logger.error('promotePeers() [error:"%o"]', error);
      } finally {
        dispatch(
          roomActions.updateRoom({ lobbyPeersPromotionInProgress: false })
        );
      }
    }
  }

  enableRoomPermission(permission:Permission): AppThunk {
    return async (dispatch, getState) => {
      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.EnableRoomPermission, {
          callId: getState().room.roomData.call.callId,
          roomServerId:getState().room.roomData.call.roomServerId,
          permission
        })
      } catch (error) {
        logger.error('enableRoomPermission() [error:"%o"]', error);
      }
    }
  }

  disableRoomPermission(permission:Permission): AppThunk {
    return async (dispatch, getState) => {
      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.DisableRoomPermission, {
          callId: getState().room.roomData.call.callId,
          roomServerId:getState().room.roomData.call.roomServerId,
          permission
        })
      } catch (error) {
        logger.error('disableRoomPermission() [error:"%o"]', error);
      }
    }
  }

  enablePeerPermission(permission:Permission,peerId:string): AppThunk {
    return async (dispatch, getState) => {
      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.EnablePeerPermission, {
          callId: getState().room.roomData.call.callId,
          roomServerId:getState().room.roomData.call.roomServerId,
          permission,
          peerId
        })
      } catch (error) {
        logger.error('enableRoomPermission() [error:"%o"]', error);
      }
    }
  }

  disablePeerPermission(permission:Permission,peerId:string): AppThunk {
    return async (dispatch, getState) => {
      try {
        await socketService.request(SocketEvents.MediaSoup, SocketEvents.DisablePeerPermission, {
          callId: getState().room.roomData.call.callId,
          roomServerId:getState().room.roomData.call.roomServerId,
          permission,
          peerId
        })
      } catch (error) {
        logger.error('disableRoomPermission() [error:"%o"]', error);
      }
    }
  }

  startRecording(): AppThunk {
    return async (dispatch, getState) => {
      try {
        await socketService.request(SocketEvents.Calls, SocketEvents.StartRecording, {
          callId: getState().room.roomData.call.callId,
        })
      } catch (error:any) {
        dispatch(roomActions.setRecordingStatus(RecordingStatusEnum.Inactive))
        logger.error('startRecording() [error:"%o"]', error);
        NotificationHelper.error(translate(`meetings.${error.message}`))
      }
    }
  }
*/




}

