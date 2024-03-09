export enum PendingNotificationTypes {
  Contact = "Contact",
  ContactUpdated="ContactUpdated",
  AddGroupMember ="AddGroupMember",
  ManageGroupAdmins = "ManageGroupAdmins",
  GroupMemberLeave = "GroupMemberLeave",
  GroupMemberMute="GroupMemberMute",
  GroupUpdateDetails="GroupUpdateDetails",
  GroupCreated="GroupCreated",
  MessageAcknowledgement = "MessageAcknowledgement",
  NewMessage = "NewMessage",
  MessageDeleted="MessageDeleted",
  MessageRead="MessageRead",
  MessageReceived="MessageReceived",
  GroupRead="GroupRead",
  CallStarted="CallStarted",
  MemberJoinedCall = "MemberJoinedCall",
  CallEnded="CallEnded",
  NewSystemMessage="NewSystemMessage",
  ManageChannelAdmins="ManageChannelAdmins",
  ChannelMemberMute="ChannelMemberMute",
  ClearChannelMessages="ClearChannelMessages"
}


export enum MemberActionType {
  Recording = "Recording",
  Typing = "Typing",
  Sending = "Sending",
  FinishRecording = "FinishRecording",
  FinishTyping = "FinishTyping",
  FinishSending = "FinishSending",
}
