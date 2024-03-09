
import SocketEvents from "../../constants/socket-events";
import { socketService } from "../socket";
import { AppThunk } from "../redux/store";
import { currentUserSelector } from "../redux/auth/auth-selectors";
import { RoomArchEnum } from "../../enums/room-arch-enum";
import { RoomConnectionStateEnum } from "../../enums/room-connection-status-enum";
import { MediaSoupRoom } from "../room";
import { roomActions } from "../redux/room/room-slice";
import { meActions } from "../redux/me/me-slice";


export const meetingService = {
  room: undefined as MediaSoupRoom,
  setRoom: function (value: MediaSoupRoom) {
    meetingService.room = value
  },
  requestMeeting(id) {
    return socketService.request(SocketEvents.Calls, SocketEvents.RequestMeeting, {meetingId: id,roomArch:RoomArchEnum.SfuMeeting})
  },
  validateMeeting: (id): AppThunk<Promise<void>> => async (dispatch, getState): Promise<void> => {
    const result = await socketService.request(SocketEvents.Calls, SocketEvents.ValidateMeeting, {meetingId: id,roomArch:RoomArchEnum.SfuMeeting})
    dispatch(roomActions.setRoomData({...result.meeting,group:result.group}))
  },
  hangup: (): AppThunk<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if(!meetingService.room) return

    socketService.request(SocketEvents.Calls, SocketEvents.HangupCall, {callId: getState().room.roomData.call.callId})
    dispatch(meetingService.cleanupCall())
  },
  cleanupCall: (): AppThunk<Promise<void>> => async (dispatch, getState): Promise<void> => {

    // Cleanup room
    meetingService.room.close()
    meetingService.setRoom(null)


    dispatch(roomActions.setRoomState(RoomConnectionStateEnum.Closed));
  },
  cleanUpOnSocketDisconnect: () => {
   // meetingService.room.close()
    //mediaPreviewService.cleanupTracks()
  },
  join: (id: string): AppThunk<Promise<any>> => async (dispatch,getState): Promise<any> => {
    try {
      if (!socketService.isConnected()) {
        return;
      }

      const mediaSoupRoom = new MediaSoupRoom()
      meetingService.setRoom(mediaSoupRoom)
      meetingService.room.signalingService.initializeLobbyListeners()
      // Validate, init meeting on server
      await meetingService.requestMeeting(id)

      dispatch(meActions.setMe({socketId:socketService.getSocketId(),user:currentUserSelector(getState())}))

    } catch (error: any) {
      throw error
    }
  },
/*  rejoin: (): AppThunk<Promise<any>> => async (dispatch, getState): Promise<any> => {
    try {
      if (meetingService.reconnectingTimerRef) {
        clearInterval(meetingService.reconnectingTimerRef)
        meetingService.reconnectingTimerSeconds = RECONNECTING_SECONDS
        meetingService.reconnectingTimerRef = null
      }
      if (getState().room.state === RoomConnectionStateEnum.Reconnecting && getState().room.roomData) {
        await dispatch(meetingService.join(getState().room.roomData._id))
      }
    }catch (e) {

    }
  },
  reconnect: (): AppThunk<Promise<any>> => async (dispatch, getState): Promise<any> => {
    if (getState().room.state === RoomConnectionStateEnum.Connected) {
      dispatch(roomActions.setRoomState(RoomConnectionStateEnum.Reconnecting))
      meetingService.cleanUpOnSocketDisconnect()
      meetingService.reconnectingTimerRef = setInterval(() => {
        meetingService.reconnectingTimerSeconds--

        if (meetingService.reconnectingTimerSeconds <= 0) {
          clearInterval(meetingService.reconnectingTimerRef)
          meetingService.reconnectingTimerSeconds = RECONNECTING_SECONDS
          meetingService.reconnectingTimerRef = null
          dispatch(roomActions.setRoomState(RoomConnectionStateEnum.Disconnected))
          socketService.disconnect()
        }
      }, 1000)
    }
  },
  setSpeakerDevice(element: any, deviceId: string) {
    try {
      if (!deviceId || !element) return

      if (typeof element.sinkId !== 'undefined') {
        element.setSinkId(deviceId)
          .then(() => {
            console.log(`Success, audio output device attached: ${deviceId}`);
          })
          .catch((error: any) => {
            let errorMessage = error;
            if (error.name === 'SecurityError') {
              errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
            }
            throw new Error(errorMessage)
          });
      } else {
        throw new Error('Browser does not support output device selection.')
      }
    } catch (error) {
      NotificationHelper.error(`${translate("room.couldNotChangeSpeakerDevice")}: ${error}`)
    }
  },
  changeWebcamDevice: (newDeviceId:string): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    try {
      dispatch(meActions.setWebcamInProgress(true));

      // Update selected device in redux
      dispatch(roomSettingsActions.setSelectedVideoDeviceId(newDeviceId));

      // Update preview track with the new device
      dispatch(mediaPreviewService.restartPreviewWebcam());

      // Update the actual webcam track with the new device
      if (meetingService.room){
        dispatch(meetingService.room.webcamService.changeWebcamDevice(newDeviceId))
      }

      dispatch(meActions.setWebcamInProgress(false));
    } catch (error) {
      NotificationHelper.error(`${translate("room.cannotChangeWebCam")}: ${error}`)
      dispatch(meActions.setWebcamInProgress(false));
    }
  },
  changeMicDevice: (newDeviceId:string): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    try {
      dispatch(meActions.setMicInProgress(true));

      // Update selected device in redux
      dispatch(roomSettingsActions.setSelectedMicrophoneDeviceId(newDeviceId));

      // Update preview track with the new device
      dispatch(mediaPreviewService.restartPreviewMic());

      // Update the actual mic track with the new device
      if(meetingService.room){
        dispatch(meetingService.room.audioService.changeMicDevice(newDeviceId))
      }

      dispatch(meActions.setMicInProgress(false));
    } catch (error) {
      NotificationHelper.error(`Could not change microphone: ${error}`)
      dispatch(meActions.setMicInProgress(false));
    }
  },
  changeSpeakerDevice: (newDeviceId:string): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    try {
      logger.debug('changeSpeakerDevice()');

      dispatch(meActions.setSpeakerInProgress(true));

      // Update selected device in redux
      dispatch(roomSettingsActions.setSelectedSpeakerDeviceId(newDeviceId));

      // No need to restart anything here because the speaker audio will be updated on spot on each <audio/> tag. meetingService is how speaker works.

      dispatch(meActions.setSpeakerInProgress(false));
    } catch (error) {
      logger.error('changeSpeakerDevice() | failed: %o', error);
      dispatch(meActions.setSpeakerInProgress(false));
    }
  },
  async disableAudioOnly() {
    try {
      await meetingService.room.audioService.disableAudioOnly()
    } catch (error) {
      NotificationHelper.error(`${translate("room.couldNotDisableAudioOnly")}: ${error}`)
    }
  },
  async enableAudioOnly() {
    try {
      await meetingService.room.audioService.enableAudioOnly()
    } catch (error) {
      NotificationHelper.error(`${translate("room.couldNotEnableAudioOnly")}: ${error}`)
    }
  },
  async disableShare() {
    try {
      await meetingService.room.shareScreenService.disableShare()
    } catch (error) {
      NotificationHelper.error(`${translate("room.couldNotDisableShare")}: ${error}`)
    }
  },
  async enableShare() {
    try {
      await meetingService.room.shareScreenService.enableShare()
    } catch (error) {
      NotificationHelper.error(`${translate("room.couldNotEnableShare")}: ${error}`)
    }
  },*/
  async disableWebcam() {
    try {
      await meetingService.room.webcamService.disableWebcam()
    } catch (error) {
    }
  },
  async enableWebcam() {
    try {
      await meetingService.room.webcamService.enableWebcam()
    } catch (error) {
    }
  },
  async enableMic() {
    try {
      await meetingService.room.audioService.enableMic()
    } catch (error) {
    }
  },
  async muteMic() {
    try {
      await meetingService.room.audioService.muteMic()
    } catch (error) {
    }
  },
  async unmuteMic(remote = false) {
    try {
      await meetingService.room.audioService.unmuteMic(remote)
    } catch (error) {
    }
  },
/*  async setMaxSendingSpatialLayer(spatialLayer: any) {
    try {
      await meetingService.room.setMaxSendingSpatialLayer(spatialLayer)
    } catch (error) {
      NotificationHelper.error(`Could not setMaxSendingSpatialLayer: ${error}`)
    }
  },
  async setConsumerPreferredLayers(consumerId: any, spatialLayer: any, temporalLayer: any) {
    try {
      await meetingService.room.setConsumerPreferredLayers(consumerId, spatialLayer, temporalLayer)
    } catch (error) {
      NotificationHelper.error(`Could not setConsumerPreferredLayers: ${error}`)
    }
  },
  async setConsumerPriority(consumerId: any, priority: any) {
    try {
      await meetingService.room.setConsumerPriority(consumerId, priority)
    } catch (error) {
      NotificationHelper.error(`Could not setConsumerPriority: ${error}`)
    }
  },
  async requestConsumerKeyFrame(consumerId: any) {
    try {
      await meetingService.room.requestConsumerKeyFrame(consumerId)
    } catch (error) {
      NotificationHelper.error(`Could not requestConsumerKeyFrame: ${error}`)
    }
  },
  muteParticipantsAudioLocally() {
    meetingService.room.audioService.muteParticipantsAudioLocally()
  },
  unmuteParticipantsAudioLocally() {
    meetingService.room.audioService.unmuteParticipantsAudioLocally()
  },
  serverMuteParticipant(peerId:string,producerId:string) {
    meetingService.room.audioService.serverMuteParticipant(producerId,peerId)
  },
  serverStopParticipantVideo(peerId:string,producerId:string) {
    meetingService.room.webcamService.serverStopParticipantVideo(producerId,peerId)
  },
  setRaisedHand: (value: boolean): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.setRaisedHand(value))
  },
  copyMeetingUrl(meetingId:string){
    const url  = meetingService.getInvitationUrl(meetingId)
    clipboardCopy(url).then(() => {
      NotificationHelper.info(translate('room.successfulCopy'))
    });
  },
  async createAudioContext(){
    await meetingService.room.createAudioContext()
  },
  lockRoom: (): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.lockRoom())
  },
  unlockRoom: (): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.unlockRoom())
  },
  async promotePeer(peerId:string) {
    await meetingService.room.promotePeer(peerId)
  },
  promotePeers: (): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.promotePeers())
  },
  enableRoomPermission: (permission:Permission): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.enableRoomPermission(permission))
  },
  disableRoomPermission: (permission:Permission): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.disableRoomPermission(permission))
  },
  enablePeerPermission: (permission:Permission,peerId:string): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.enablePeerPermission(permission,peerId))
  },
  disablePeerPermission: (permission:Permission,peerId:string): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.disablePeerPermission(permission,peerId))
  },
  setFilmstripAndMainPeer: (peerId?:string): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(roomActions.setDisplayLayout(DisplayLayoutEnum.Filmstrip))
    if(peerId){
      dispatch(roomActions.selectPeer({peerId:peerId}))
    }else{
      dispatch(roomActions.deselectPeer())
    }
  },
  startRecording: (): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.startRecording())
  },
  stopRecording: (): AppThunk<Promise<any>> => async (dispatch): Promise<any> => {
    dispatch(meetingService.room.stopRecording())
  },
  async updateAudioSettings(settings:IAudioSettings) {
    try {
      await meetingService.room.audioService.updateAudioSettings(settings);
    } catch (error) {
      NotificationHelper.error(`${translate("room.couldNotMuteMic")}: ${error}`)
    }
  },
  getInvitationUrl(meetingId :string) {
    const url = store.getState().room.roomData.invitationUrl || getMeetingUrl(meetingId)
    return url ;
  }*/
}
