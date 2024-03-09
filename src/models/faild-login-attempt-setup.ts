export class FaildLoginAttemptSetup {
    enableCollectLogInData : boolean
    blockFailedLoginAttemptsByUsername : boolean
    howManyFailedAttemptsUntilBlockByUser :number
    timeToUnblockUserInMinutes: number
    blockFailedLoginAttemptsByIP: boolean
    HowManyFailedAttemptsUntilBlockByIP: number
    timeToUnblockIPInMinutes: number
    iPWhitelist: string
    notifyOfFailedLoginAttempts: boolean
    channelToSendTheNotifications: string
}
