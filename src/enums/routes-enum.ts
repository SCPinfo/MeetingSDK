
export const RoutesEnum = {
    Meeting: `/meeting`,
    Meetings: "/meetings",
    Settings: "/settings",
    Files: "/files",
    Workspace: "workspace",
    Contact: "/contact",
    Records: "/records",
    AddMeeting: "/meetings/manage",
    Join: '/join',
    Room: "/room",
    Login: '/login',
    NotFound: "/404",
    LoggedInDevices: "/devices",
    EditMeeting: (id) => `/meetings/manage/${id}`,
    MeetingRecords: (id) => `/meeting/record/${id}`,
    JoinMeeting: (id) => `/meeting/${id}`,
    HangupMeeting: (id) => `/meeting/${id}/hangup`,
    MeetingByToken: (token) => `/meeting/token/${token}`,
    calender: "/calender",
    LoginCallback: "login-callback",
    LogoutCallback: "logout-callback",
    EditProfile: "/profile",
    DownloadApp: "/download",
    Register: '/register',
    RegistrationApproval :'/approval',
    LoginOTPVerification :'/login/otp',
    RegisterOTPVerification :'/register/otp',
    ApprovalInvitationCode :'/approval/invitation-code',
    ForgetPassword: "/forget-password",
    ResetPasswordOTPVerification :"/reset-password/otp",
    ResetPassword : "/reset-password/reset-password"
}