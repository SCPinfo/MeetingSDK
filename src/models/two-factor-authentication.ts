export class TwoFactorAuthenticationSetup {
    enableTwoFactorAuthentication:boolean
    enableViaTOTP:boolean
    enableViaEmail:boolean
    autoOptInNewUsersViaEmail:boolean
    enforcePasswordFallback:boolean
    timeToExpireCodeSentViaEmailInSeconds:number
    rememberTwoFactorForSeconds:number
}
