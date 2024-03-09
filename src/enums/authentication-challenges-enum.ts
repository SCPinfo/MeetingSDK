export enum AuthenticateUserChallenge {
  UserCredentialAuthentication = "userCredentialAuthentication", // 1
  SSOAuthentication ="ssoAuthentication" , //1
  VerifyOtp = "verifyOtp", // 2
  FinalizeAuthenticationWithPassToken = "finalizeAuthenticationWithPassToken", // 3
  LoggedInDevices = "loggedInDevices", // 4
  RegistrationApproval = "registrationApproval", // 5
  JwtTokenAuthentication = "jwtTokenAuthentication"
}

