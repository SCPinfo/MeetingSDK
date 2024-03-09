export interface AccountGeneralSetup {
    allowDeleteOwnAccount:boolean
    allowProfileChange:boolean
    allowAvatarChange:boolean
    allowNameChange:boolean
    allowCustomStatusMessage:boolean
    allowUsernameChange:boolean
    allowEmailChange:boolean
    allowPasswordChange:boolean
    allowEmailNotifications:boolean
    customFields : string
    loginExpirationinDays :number
    validateUserDevices:boolean
    numberOfAllowedDevices:number
}
