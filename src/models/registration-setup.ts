export interface RegistrationSetup {
    sendEmailToUserWhenUserActivated:boolean
    sendEmailToUserWhenUserDeactivated:boolean
    requireNameForSignup:boolean
    requirePasswordConfirmation:boolean
    onlyAllowVerifiedUsersToLogin:boolean
    manuallyApproveNewUsers:boolean
    registrationwithAuthenticationServices:boolean
    defaultRolesForAuthenticationServices:number
    defaultRolesForUsers:number
    passwordReset:boolean
}
