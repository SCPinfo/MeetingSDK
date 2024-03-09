import { AppUpdateTypeEnum } from "../enums/app-update-type-enum";
import { VirtualBackgroundPackagesEnum } from "../enums";


export class GeneralSetup {
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
    allowSkipOtp:boolean
    appUpdateType:AppUpdateTypeEnum
    versionNumber : string
    registrationApprovalEnabled:boolean
    e2eEnabled:boolean
    loginBy:string ;
    virtualBackgroundPackage :VirtualBackgroundPackagesEnum;
}
