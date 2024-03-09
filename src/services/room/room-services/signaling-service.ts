import { MediaSoupRoom } from "../mediasoup-room";
import { Logger } from "mediasoup-client/lib/Logger";
import { socketService } from "../../socket";
import SocketEvents from "../../../constants/socket-events";
import { consumersActions, ConsumerState } from "../../redux/consumers/consumers-slice";
import { producersActions, ProducerSource } from "../../redux/producers/producers-slice";
import { store } from "../../redux/store";
import { RecordingStatusEnum, roomActions, RoomConnectionStateEnum } from "../../redux/room/room-slice";
import { DisplayLayoutEnum } from "../../../enums/display-layout-enum";
import { peersActions } from "../../redux/peers/peers-slice";
import { meetingService } from "../../meeting";
import { peersSelect } from "../../redux/peers/peers-selectors";
import { roomSettingsActions } from "../../redux/room/room-settings-slice";
import { EventsEnum, UserTypeEnum } from "../../../enums";
import { permissionsActions } from "../../redux/permissions/permissions-slice";
import { peerPermissionsActions } from "../../redux/peer-permissions/peer-permissions-slice";
import { LobbyPeer, lobbyPeersActions } from "../../redux/lobby-peers/lobby-peers-slice";
import { uiActions } from "../../redux/ui/ui-slice";

const logger = new Logger('SignalingService');

export class SignalingService {
  private mediaSoupRoom: MediaSoupRoom;

  constructor(mediaSoupRoom: MediaSoupRoom) {
    this.mediaSoupRoom = mediaSoupRoom
  }

  initializeLobbyListeners(){
    socketService.socketInstance.on(SocketEvents.RoomReady,(data:any)=> this.onRoomReady(data))
    socketService.socketInstance.on(SocketEvents.EnteredLobby, () => this.onEnteredLobby())
    socketService.socketInstance.on(SocketEvents.CallFinished, (data:any) => this.onReceiveFinishCall(data))
    socketService.socketInstance.on(SocketEvents.PermissionsAdded, (data: any) => this.onPermissionsAdded(data))
    socketService.socketInstance.on(SocketEvents.PermissionsRemoved, (data: any) => this.onPermissionsRemoved(data))
    socketService.socketInstance.on(SocketEvents.RoomPermissions, (data: any) => this.onRoomPermissions(data))
    socketService.socketInstance.on(SocketEvents.PeerPermissionsAdded, (data: any) => this.onPeerPermissionsAdded(data))
    socketService.socketInstance.on(SocketEvents.PeerPermissionsRemoved, (data: any) => this.onPeerPermissionsRemoved(data))
    /*
    TODO we should add these in the future
    * sessionIdChanged
    * breakoutRoomClosed
    * newBreakoutRoom
    * escapeMeeting
    * moderator:kick
    * roomUpdate
    * */
  }

  initializeListeners() {
    socketService.socketInstance.on(SocketEvents.NewConsumer, async (data: any) => this.onNewConsumer(data))
    socketService.socketInstance.on(SocketEvents.MediaReady, async (data: any) => this.onMediaReady(data))
    socketService.socketInstance.on(SocketEvents.ProducerScore, (data: any) => this.onProducerScore(data))
    socketService.socketInstance.on(SocketEvents.ProducerClosed, (data: any) => this.onProducerClosed(data))
    socketService.socketInstance.on(SocketEvents.ProducerPaused, (data: any) => this.onProducerPaused(data))
    socketService.socketInstance.on(SocketEvents.NewPeer, (data: any) => this.onMemberJoined(data))
    socketService.socketInstance.on(SocketEvents.UserHungup, (data: any) => this.onPeerClosed(data))
    socketService.socketInstance.on(EventsEnum.DownlinkBwe, (data: any) => this.onDownlinkBwe(data))
    socketService.socketInstance.on(SocketEvents.ConsumerClosed, (data: any) => this.onConsumerClosed(data))
    socketService.socketInstance.on(SocketEvents.ConsumerPaused, (data: any) => this.onConsumerPaused(data))
    socketService.socketInstance.on(SocketEvents.ConsumerResumed, (data: any) => this.onConsumerResumed(data))
    socketService.socketInstance.on(SocketEvents.ConsumerLayersChanged, (data: any) => this.onConsumerLayersChanged(data))
    socketService.socketInstance.on(SocketEvents.ConsumerScore, (data: any) => this.onConsumerScore(data))
    socketService.socketInstance.on(SocketEvents.ActiveSpeaker, (data: any) => this.onActiveSpeaker(data))
    socketService.socketInstance.on(SocketEvents.RaisedHand, (data: any) => this.onHandRaised(data))
    socketService.socketInstance.on(SocketEvents.LockRoom, (data: any) => this.onRoomLocked(data))
    socketService.socketInstance.on(SocketEvents.UnlockRoom, (data: any) => this.onRoomUnlocked(data))
    socketService.socketInstance.on(SocketEvents.ParkedPeer, (data: any) => this.onParkedPeer(data))
    socketService.socketInstance.on(SocketEvents.ParkedPeers, (data: any) => this.onParkedPeers(data))
    socketService.socketInstance.on(SocketEvents.LobbyPromotedPeer, (data: any) => this.onLobbyPeerPromote(data))
    socketService.socketInstance.on(SocketEvents.LobbyPeerClosed, (data: any) => this.onLobbyPeerClosed(data))
    socketService.socketInstance.on(SocketEvents.RecordingStatusChanged, (data: any) => this.onRecordingStatusChanged(data))
  }

  removeListeners() {
    socketService.socketInstance.removeListener(SocketEvents.NewConsumer)
    socketService.socketInstance.removeListener(SocketEvents.MediaReady)
    socketService.socketInstance.removeListener(SocketEvents.ProducerScore)
    socketService.socketInstance.removeListener(SocketEvents.NewPeer)
    socketService.socketInstance.removeListener(SocketEvents.UserHungup)
    socketService.socketInstance.removeListener(EventsEnum.DownlinkBwe)
    socketService.socketInstance.removeListener(SocketEvents.ConsumerClosed)
    socketService.socketInstance.removeListener(SocketEvents.ConsumerPaused)
    socketService.socketInstance.removeListener(SocketEvents.ConsumerResumed)
    socketService.socketInstance.removeListener(SocketEvents.ConsumerLayersChanged)
    socketService.socketInstance.removeListener(SocketEvents.ConsumerScore)
    socketService.socketInstance.removeListener(SocketEvents.ActiveSpeaker)
    socketService.socketInstance.removeListener(SocketEvents.RaisedHand)
    socketService.socketInstance.removeListener(SocketEvents.LockRoom)
    socketService.socketInstance.removeListener(SocketEvents.UnlockRoom)
    socketService.socketInstance.removeListener(SocketEvents.PermissionsAdded)
    socketService.socketInstance.removeListener(SocketEvents.PermissionsRemoved)
    socketService.socketInstance.removeListener(SocketEvents.ParkedPeer)
    socketService.socketInstance.removeListener(SocketEvents.ParkedPeers)
    socketService.socketInstance.removeListener(SocketEvents.LobbyPromotedPeer)
    socketService.socketInstance.removeListener(SocketEvents.LobbyPeerClosed)
    socketService.socketInstance.removeListener(SocketEvents.RoomReady)
    socketService.socketInstance.removeListener(SocketEvents.CallFinished)
    socketService.socketInstance.removeListener(SocketEvents.RoomPermissions)
    socketService.socketInstance.removeListener(SocketEvents.PeerPermissionsAdded)
    socketService.socketInstance.removeListener(SocketEvents.PeerPermissionsRemoved)
    socketService.socketInstance.removeListener(SocketEvents.ProducerClosed)
    socketService.socketInstance.removeListener(SocketEvents.ProducerPaused)
    socketService.socketInstance.removeListener(SocketEvents.RecordingStatusChanged)
  }


  async onNewConsumer(data:any){
    try {

      const {
        peerId,
        producerId,
        id,
        kind,
        rtpParameters,
        appData,
        producerPaused
      } = data;

      const consumer = await this.mediaSoupRoom.recvTransport.consume(
        {
          id,
          producerId,
          kind,
          rtpParameters,
          // NOTE: Force streamId to be same in mic and webcam and different
          // in screen sharing so libwebrtc will just try to sync mic and
          // webcam streams from the same remote peer.
          streamId: `${peerId}-${appData.share ? 'share' : 'mic-webcam'}`,
          appData: {...appData, peerId} // Trick.
        });

      if (kind === 'audio') {
        const { track } = consumer;
        //this.mediaSoupRoom.configureHark(track,consumer)
      }

/*      if (this.mediaSoupRoom.e2eKey && e2e.isSupported()) {
        e2e.setupReceiverTransform(consumer.rtpReceiver);
      }*/

      // Store in the map.
      this.mediaSoupRoom.consumers.set(consumer.id, consumer);

      consumer.on(EventsEnum.TransportClose, () => {
        this.mediaSoupRoom.consumers.delete(consumer.id);
      });

      const stateConsumer: ConsumerState = {
        id: consumer.id,
        peerId: consumer.appData["peerId"] as string,
        kind: consumer.kind,
        localPaused: false,
        remotePaused: producerPaused,
        source: consumer.appData["source"] as ProducerSource,
        producerId:consumer.producerId
      };

        store.dispatch(consumersActions.addConsumer(stateConsumer));

        if(stateConsumer.source === "screen"){
          store.dispatch(roomActions.setScreenSharingConsumer(stateConsumer.id))
          store.dispatch(roomActions.setDisplayLayout(DisplayLayoutEnum.Filmstrip))
        }

      // workaround => always create consumers paused on the server then resume them once you create local consumer
      this.mediaSoupRoom.resumeConsumer(consumer,false);

    } catch (error) {
      logger.error('"newConsumer" request failed:%o', error);
      //NotificationHelper.error(`Error creating a Consumer: ${error}`)
      throw error;
    }
  }

  onProducerScore(data:any){
    const { producerId, score } = data;

    const highestScore = score.reduce((prev: {score:number}, curr: { score: number }) =>
      (prev.score > curr.score ? prev : curr));

    const micProducerId = this.mediaSoupRoom.micProducer?.id

    if((this.mediaSoupRoom.shareProducer || this.mediaSoupRoom.webcamProducer) && micProducerId === producerId){
      // If we have a share producer or webcam producer then we should take their score as the main score
      // because video producers are more likely to take effect from network changes than the audio producer.
      // for example, we might have cam and mic ON and the cam score is low while the mic score is high,
      // we don't want the mic score to overwrite the cam score
      return
    }

    store.dispatch(producersActions.setScore({producerId, score:highestScore.score}));
  }

  onProducerClosed(data:any){
    const { producerId, source}:{producerId:string,source:ProducerSource} = data;

    switch (source) {
      case "mic":
        this.mediaSoupRoom.audioService.disableMic(true)
        break;
      case "webcam":
        this.mediaSoupRoom.webcamService.disableWebcam(true)
        break;
      case "screen":
        //this.mediaSoupRoom.shareScreenService.disableShare(true)
        break;
    }
  }

  onProducerPaused(data:any){
    const { producerId, source}:{producerId:string,source:ProducerSource} = data;

    // we only force pause mic producers, the video will be closed not paused
    if(source !== "mic"){
      return
    }

    this.mediaSoupRoom.audioService.muteMic(true)
  }


  onMemberJoined(data:any){
    const peer = data.user;
    store.dispatch(peersActions.addPeer(
      {
        id: data.peerId,
        user: {
          name: peer.name,
          username: peer.username,
          picture:peer.picture,
          _id: peer._id,
        },
      }));
    //NotificationHelper.info(`${peer.name} ${translate("room.joinedToRoom")} `, NotificationSettingsEnum.ParticipantJoined)
  }

  onHandRaised(data: any) {
    const {peerId, raisedHand, raisedHandTimestamp} = data;

    store.dispatch(peersActions.updatePeer(
      {
        id: peerId,
        raisedHand,
        raisedHandTimestamp
      }));

    const peer = store.getState().peers[peerId]
    if(!peer) return

    //NotificationHelper.info(`${peer.user?.name} ${translate("room.raisedHand")} `, NotificationSettingsEnum.ParticipantRaisedHand)
  }

  onPeerClosed(data:any){
    const { peerId  } = data;
    const peers = peersSelect(store.getState())
    const peer = peers[peerId]
    if(!peer) return
    store.dispatch(peersActions.removePeer(peerId));
    store.dispatch(roomActions.removeRoomPeerProps(peerId));
    //NotificationHelper.info(`${peer.user?.name} ${translate("room.leftTheRoom")} `, NotificationSettingsEnum.ParticipantLeftRoom);
  }

  onDownlinkBwe(data:any){
    logger.debug('\'downlinkBwe\' event:%o', data);
  }

  onConsumerClosed(data:any){
    const { consumerId } = data;
    const consumer = this.mediaSoupRoom.consumers.get(consumerId);

    if (!consumer)
      return;

    const { source } = consumer.appData as { source:ProducerSource};

    if(source === "screen"){
      store.dispatch(roomActions.setScreenSharingConsumer(null))
    }

    consumer.close();
    this.mediaSoupRoom.consumers.delete(consumerId);

    store.dispatch(consumersActions.removeConsumer({consumerId}));
  }

  onConsumerPaused(data:any){
    const { consumerId } = data;
    const consumer = this.mediaSoupRoom.consumers.get(consumerId);

    if (!consumer)
      return;

    consumer.pause();
    store.dispatch(consumersActions.setConsumerPaused({consumerId: consumer.id}));
  }

  onConsumerResumed(data:any){
    const { consumerId } = data;
    const consumer = this.mediaSoupRoom.consumers.get(consumerId);

    if (!consumer)
      return;

    consumer.resume();

    store.dispatch(consumersActions.setConsumerResumed({consumerId: consumer.id}));
  }

  onConsumerLayersChanged(data:any){
    const { consumerId, spatialLayer, temporalLayer } = data;
    const consumer = this.mediaSoupRoom.consumers.get(consumerId);

    if (!consumer)
      return;

    store.dispatch(consumersActions.setConsumerCurrentLayers({consumerId, spatialLayer, temporalLayer}));
  }

  onConsumerScore(data:any){
    const { consumerId, score: { score ,producerScore} } = data;
    // producerScore => indicating the score for producer for someone
    // score => indicating the score of my consumer
    store.dispatch(consumersActions.setConsumerScore({consumerId, score:producerScore}));
  }

  onActiveSpeaker(data:any){
    const { peerId } = data;
    const { id } = store.getState().me;

    const isMe = peerId === id;

    store.dispatch(roomActions.setRoomActiveSpeaker({peerId,isMe}));
  }

  onMediaReady(data:any){
    this.mediaSoupRoom.startMedia()
  }

  onRoomLocked(data:any){
    store.dispatch(permissionsActions.setLocked(true));
  }

  onRoomUnlocked(data:any){
    store.dispatch(permissionsActions.setLocked(false));
  }

  onPermissionsAdded(data:any){
    const { permissions } = data;
    console.log("onPermissionsAdded",permissions)
    store.dispatch(permissionsActions.addPermissions(permissions));
  }

  onPermissionsRemoved(data:any){
    const { permissions } = data;
    console.log("onPermissionsRemoved",permissions)
    store.dispatch(permissionsActions.removePermissions(permissions));
  }

  onRoomPermissions(data:any){
    const { permissions } = data;
    console.log("onRoomPermissions",permissions)
    store.dispatch(roomActions.setPermissions(permissions));
  }

  onPeerPermissionsAdded(data:any){
    const { permissions,peerId } = data;
    console.log("onPeerPermissionsAdded",data)
    store.dispatch(peerPermissionsActions.addPermissions({ permissions, peerId }));
  }

  onPeerPermissionsRemoved(data:any){
    const { permissions,peerId } = data;
    store.dispatch(peerPermissionsActions.removePermissions({ permissions, peerId }));
  }

  onParkedPeer(data:any){
    const { peer } = data;
    store.dispatch(lobbyPeersActions.addPeer(peer));
    //NotificationHelper.info(`${peer.displayName} ${translate("meetings.isWaitingInLobby")} `, NotificationSettingsEnum.ParticipantWaitingInLobby)
  }

  onParkedPeers(data:any){
    const { lobbyPeers } = data;
    store.dispatch(lobbyPeersActions.addPeers(lobbyPeers as LobbyPeer[]));
  }

  onLobbyPeerClosed(data:any){
    const { peerId } = data;
    store.dispatch(lobbyPeersActions.removePeer({ id: peerId }));
  }

  onLobbyPeerPromote(data:any){
    const { peerId } = data;
    store.dispatch(lobbyPeersActions.removePeer({ id: peerId }));
  }

  onEnteredLobby(){
    store.dispatch(roomActions.setRoomState(RoomConnectionStateEnum.Lobby));
  }

  onRoomReady(data){
    const {roomData,settings} = data
    store.dispatch(roomActions.updateRoomData({call: {...roomData}}))
    store.dispatch(roomSettingsActions.updateSettings(settings))
    this.mediaSoupRoom.connect()
  }

  onReceiveFinishCall({ callId }: { callId: string }) {
    if(store.getState().room.roomData._id === callId)
      store.dispatch(meetingService.cleanupCall())
  }

  onRecordingStatusChanged(data) {
    const {recordingStatus} = data
    console.log("onRecordingStatusChanged")
    const isBot = store.getState().auth.user.userType === UserTypeEnum.Bot

    if(recordingStatus === RecordingStatusEnum.Active && !isBot){
      store.dispatch(uiActions.setUi({recordingConsentOpen:true}))
      //NotificationHelper.info(translate('room.recordingHasStarted'))
    }else if(recordingStatus === RecordingStatusEnum.Inactive && !isBot){
      store.dispatch(uiActions.setUi({recordingConsentOpen:false}))
      //NotificationHelper.info(translate('room.recordingHasStopped'))
    }
    store.dispatch(roomActions.setRecordingStatus(recordingStatus))
  }

}
