
export const Endpoints = {
  DeleteDevice: (deviceId)=> `auth/delete-device/${deviceId}`,
  EditUsers: "users",
  UserToken: "users/refresh-token",
  AuthenticateWithSSOToken :"auth/authenticate/sso",
  AuthenticateWithJwtToken :"auth/authenticate/token",
  Verify: "auth/verify-email-and-password",
  DeleteUserDevice: (deviceId)=>`users/delete-device/${deviceId}`,
  Group: (groupId) => `groups/${groupId} `,
  DeclineMeeting :'meetings/decline' ,
  UpdateMeeting: (id) => `meetings/${id}`,
  Meeting : (id) => `meetings/${id}`,
  Recording : (meetingId) => `recordings/${meetingId}`, 
  UpdateRecording: (id) => `recordings/${id}`,
  MeetingByToken :  `meetings/token/`,
  GetMeetingByIdForUser : (id) => `meetings/participated/${id}`,
  SearchMeetings :'meetings/search',
  Users: "users",
  UsersSearchByKeyword: 'users/keyword',
  UsersGetByUsername: 'users/username',
  Meetings :"meetings/",
  UserDevices: "users/devices",
  Report:"report",
  RegisterApproval:(userId) =>`users/${userId}/registration/status`,
  config:"account",
  GetPrivateGroupByUserId: (userId) => `groups/${userId}/private`,
  blockContact: (userId) => `users/${userId}/block`,
  unblockContact: (userId) => `users/${userId}/unblock`,
  getUserProfile: (userId) => `users/${userId}/profile`,
  Groups: "groups",
  SearchUsersWithSync: "users/contacts/sync",
  DeleteMeeting : (id) =>  `meetings/${id}`,
  SendFileMessage:"messages/file",
  VerifyOTP: "auth/verify-otp",
  SendLoginEmailOTP: "auth/send-login-email-otp",
  SendRegisterEmailOTP: "auth/send-register-email-otp",
  SendResetPasswordEmailOTP: "auth/send-reset-password-otp",
  Register: "auth/register",
  CheckingInvitationCode: "users/verify-invitation-code",
  MeetingRoles :"meeting-role-groups",
  ResetPassword :"auth/reset-password",
  translations:"account/translations",

} as const

// When using export default, we can't import EndPoints from other libs, don't know why
export default Endpoints