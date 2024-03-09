export interface DisplayNotificationSettings {
  participantJoined: boolean;
  participantRaisedHand: boolean;
  participantLeftRoom: boolean;
  participantWaitingInLobby: boolean;
  chatMessages: boolean;
}

export interface SoundNotificationSettings {
  hangupMeetingSound: boolean;
  actionsSound: boolean;
  participantJoinSound: boolean;
  raiseHandSound: boolean;
  chatMessageSound:boolean;
  waitingInLobbySound : boolean
}

export interface NotificationSettings {
  display:DisplayNotificationSettings,
  sound:SoundNotificationSettings
}
