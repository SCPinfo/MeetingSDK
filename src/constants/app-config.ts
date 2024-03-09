import AppConfig from "../config/app.config";
const AppConfigConstants = {
    ApiUrl:AppConfig.API_URL,
    SocketUrl: AppConfig.SOCKET_URL, //"http://192.168.29.89:3001", //  //"http://192.168.100.40:3001",
    ClientId: AppConfig.CLIENT_ID,
    AppName:AppConfig.APP_NAME,
    AppNameDirectory:AppConfig.APP_NAME_DIRECTORY,
    EncryptionKeySize: AppConfig.ENCRYPTION_KEY_SIZE,
    GeocodeApiUrl:AppConfig.GEOCODE_API_URL,
    GeocodeApiKey:AppConfig.GEOCODE_API_KEY,
    PlacesApiKey:AppConfig.PLACES_API_KEY,
    GiphyApiKey:AppConfig.GIPHY_API_KEY,
    BundleId: AppConfig.BUNDLE,
    ForegroundServiceChannelName:AppConfig.FOREGROUND_SERVICE_CHANNEL_NAME,
    ForegroundServiceIconName:AppConfig.FOREGROUND_SERVICE_ICON_NAME,
    RegistrationApprovalEnabled:AppConfig.REGISTRATION_APPROVAL_ENABLED,
    PrivacyPolicyUrl: AppConfig.PRIVACY_POLICY_URL,
    AppLinkUrl: AppConfig.APP_LINK_URL,
    MaxFileSize:AppConfig.MAX_FILE_SIZE,
    MaxUserPictureSize:AppConfig.MAX_USER_PICTURE_SIZE,
    Version:AppConfig.VERSION,
    BuildNumber:AppConfig.BUILD_NUMBER,
    AppleAppID:AppConfig.APPLEAPPID,
    MaxMembersInGroupCall:AppConfig.MAX_MEMBERS_IN_GROUP_CALL,
    LoginByType:AppConfig.LOGIN_BY_TYPE,
    TargetName:AppConfig.TARGET_NAME
} as const

export default AppConfigConstants;
