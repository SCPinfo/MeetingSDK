const SocketEvents = {
// EMIT:
  Messages: "messages", // main event and sub events will be under it
  SendGroupMessagesRead:"group-messages-read",
  SendMessage: "send-message",
  sendMessageRead: "read-message",
  MessageReceived: "message-received",
  sendDeleteMessageForEveryone:"delete-message-for-everyone",
//-----------------------------------------------------------//
  Groups:"groups", // main event and sub events will be under it
  SendMemberAction:"send-member-action", // should be "send-member-action"
  JoinChat: "join",
  LeaveChat: "leave",
//-----------------------------------------------------------//
  Users:"users", // main event and sub events will be under it
  CheckUserLastSeen:"check-user-last-seen",
  CheckUserOnlineStatus:"check-user-online-status",
//-----------------------------------------------------------//
  Calls:"calls", // main event and sub events will be under it
  CheckCallActive:"check-call-active",
  RequestCall: "request-call",
  RequestMeeting: "request-meeting",
  ValidateMeeting: "validate-meeting",
  SwitchToDevice:"switch-to-device",
  RejectCall:"reject-call",
  EstablishConnection:"establish-connection",
  HangupCall: "hangup-call",
  JoinCall: "join-call",
  Reconnect: "reconnect",
  ReconnectPeer: "reconnect-peer",
  StatusToPeer:"status-to-peer",
  SendCallSdp:"send-call-sdp",
  SendIceCandidate:"send-ice-candidate",
  ToggleMicMute:"toggle-mic-mute",
  ToggleCameraMute:"toggle-camera-mute",
  SwitchCameraDirection:"switch-camera-direction",
//-----------------------------------------------------------//
  Pending:"pending", // main event and sub events will be under it
  DeletePendingNotification:"delete-pending-notification", // should be "delete-pending-notification"
//-----------------------------------------------------------//
  MediaSoup:"media-soup", // main event and sub events will be under it
  GetRouterRtpCapabilities: 'getRouterRtpCapabilities',
  RtpCapabilities: 'rtpCapabilities',
  CreateWebRtcTransport: 'createWebRtcTransport',
  ConnectWebRtcTransport: 'connectWebRtcTransport',
  Produce: 'produce',
  RestartIce: 'restartIce',
  RequestConsumerKeyFrame: 'requestConsumerKeyFrame',
  GetTransportStats: 'getTransportStats',
  GetProducerStats: 'getProducerStats',
  GetConsumerStats: 'getConsumerStats',
  CloseProducer: 'closeProducer',
  PauseProducer: 'pauseProducer',
  ResumeProducer: 'resumeProducer',
  ModeratorMute:'moderator:mute',
  ModeratorStopVideo:'moderator:stopVideo',
  PauseConsumer: 'pauseConsumer',
  ResumeConsumer: 'resumeConsumer',
  SetConsumerPreferredLayers: 'setConsumerPreferredLayers',
  SetConsumerPriority: 'setConsumerPriority',
  LockRoom:'lockRoom',
  UnlockRoom:"unlockRoom",
  PromotePeer:'promotePeer',
  PromoteAllPeers:'promoteAllPeers',
  EnableRoomPermission:'moderator:enableRoomPermission',
  DisableRoomPermission:'moderator:disableRoomPermission',
  EnablePeerPermission:'moderator:enablePeerPermission',
  DisablePeerPermission:'moderator:disablePeerPermission',
  StartRecording:'start-recording',
  StopRecording:'stop-recording',

// LISTEN:
  Connect: "connect",
  Disconnect: "disconnect",
  ConnectError:"connect_error",
  IceServersReceived:"ice-servers",
  TokenExpired:"token_expired",
  ActiveSessionExist:"active_session_exist",
  LogoutUser:"logout_user",
  MemberAction:"member-action",
  UserOnlineStatus: "user-online-status",
  UserLastSeen:"user-last-seen",
  ActiveCallStatus:"active-call-status", // should be "active-call-status"
  CallRequested: "call-requested", // should be "call-requested"
  CallSdp: "call-sdp", // should be "call-sdp"
  NewPeer:"new-peer", // should be "new-peer"
  CallFinished: "call-finished", // should be "call-finished"
  ConnectionEstablished:"connection-established",
  UserRejected: "user-rejected",
  CallAnswered:"call-answered",
  DeviceSwitched:"device-switched",
  UserHungup: "user-hungup",
  IceCandidate:"ice-candidate", // should be "ice-candidate"
  CameraDirectionSwitched:"camera-direction-switched",
  MicMuteToggled:"mic-mute-toggled",
  CameraMuteToggled:"camera-mute-toggled",
  CallFailed:"call-failed",
  ReEstablishConnection:"re-establish-connection",
  PendingNotifications:"pending-notifications", // should be "pending-notifications"
  PendingNotification :"pending-notification", // should be "pending-notification"
  NewConsumer:"newConsumer",
  MediaReady:"mediaReady",
  RoomReady:"roomReady",
  ProducerScore:"producerScore",
  ProducerClosed:"producerClosed",
  ProducerPaused:"producerPaused",
  ConsumerClosed:"consumerClosed",
  ConsumerStatus:"consumerStatus",
  ConsumerPaused:"consumerPaused",
  ConsumerResumed:"consumerResumed",
  ConsumerLayersChanged:"consumerLayersChanged",
  ConsumerScore:"consumerScore",
  ActiveSpeaker:"activeSpeaker",
  RaisedHand:"raisedHand",
  PermissionsAdded:"permissionsAdded",
  PermissionsRemoved: "permissionsRemoved",
  RoomPermissions: "roomPermissions",
  PeerPermissionsAdded: "peerPermissionsAdded",
  PeerPermissionsRemoved: "peerPermissionsRemoved",
  ParkedPeer: "parkedPeer",
  ParkedPeers: "parkedPeers",
  LobbyPromotedPeer: "lobby:promotedPeer",
  LobbyPeerClosed: "lobby:peerClosed",
  EnteredLobby:"enteredLobby",
  RecordingStatusChanged:"recordingStatusChanged"
} as const

export default SocketEvents;
