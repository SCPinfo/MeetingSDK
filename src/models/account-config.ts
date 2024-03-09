
import { AvatarSetup } from "./avatar-setup"
import { Branding } from "./branding"
import { DefaultUserPreferencesSetup } from "./default-user-preferences-setup"
import { FaildLoginAttemptSetup } from "./faild-login-attempt-setup"
import { GeneralSetup } from "./general-setup"
import { MeetingConfig } from "./meeting-config"
import { MessagesConfig } from "./messages-config"
import { PasswordsPoliciesSetup } from "./passwords-policies-setup"
import { RegistrationSetup } from "./registration-setup"
import { SSOConfiguration } from "./sso-configurations"
import { TwoFactorAuthenticationSetup } from "./two-factor-authentication"
import { UIConfigs } from "./ui-configs"
import { CallMethodEnum } from "../enums/call-methods-enum";

export class AccountConfig {
    baseUrl:string
    socketBaseUrl:string
    general:GeneralSetup
    twoFactorAuthentication :TwoFactorAuthenticationSetup
    defaultUserPreferencesSetup :DefaultUserPreferencesSetup
    avatarSetup :AvatarSetup
    faildLoginAttemptSetup :FaildLoginAttemptSetup
    passwordsPoliciesSetup :PasswordsPoliciesSetup
    registrationSetup : RegistrationSetup
    androidApkUrl: string;
    iosApkUrl: string;
    defaultCallMethod :CallMethodEnum;
    fetchLocationFromIpAddress:boolean ;
    downloadMobileAppsPageUrl:string ;
    uiConfigs :UIConfigs ;
    ssoConfiguration : SSOConfiguration;
    messagesConfig: MessagesConfig;
    globalTime :any;
    homePageURL :string;
    branding :Branding
    meetingConfig: MeetingConfig;
}
