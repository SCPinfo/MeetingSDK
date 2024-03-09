import { ThemePalette } from "../interfaces/theme-palette"

export const PingMeConfigs = {
/*  images: {
    HeaderBackground: require("../../assets/images/header-background.png"),
    Person: require("../../assets/images/person.png"),
    SetPassword: require("../../assets/images/set-pass.png"),
    Pin: require("../../assets/images/pin.png"),
    ChatInstanceBackground: require("../../assets/images/chat-instance-background.png")
  },
  animations: {
    VerifyOtp: require("../../assets/animations/verify-otp-animation.json"),
    Verifying: require("../../assets/animations/verifying-animation.json"),
    AcceptButtonWave: require("../../assets/animations/accept-button-wave.json"),
    RegisterApproval: require("../../assets/animations/register-approval-wave.json"),
    RejectedApproval: require("../../assets/animations/rejected-approval-wave.json"),
    Syncing: require("../../assets/animations/sync-wave-2.json"),
    LoadingDots: require("../../assets/animations/loading-dots-wave.json"),
    Error: require("../../assets/animations/error.json"),
    PrepareShareFiles: require("../../assets/animations/prepare-files"),
    genericEmptyState: require("../../assets/animations/generic-empty-state"),
    blackEmptyState: require("../../assets/animations/black-empty-state"),
    redEmptyState: require("../../assets/animations/red-empty-state"),
    yellowEmptyState: require("../../assets/animations/yellow-empty-state"),
    greenEmptyState: require("../../assets/animations/green-empty-state"),
    purpleEmptyState: require("../../assets/animations/purple-empty-state"),
    pinkEmptyState: require("../../assets/animations/pink-empty-state"),
    multiDevices: require("../../assets/animations/devices-ping-me.json"),
    Password: require("../../assets/animations/password-animation.json"),
    language: require("../../assets/animations/ping-me-language.json"),
    arrowUp: require("../../assets/animations/arrow_up.json"),
    success: require("../../assets/animations/success-animation.json"),
    pulseAvatar: require("../../assets/animations/pulse-avatar.json"),
  },*/
  palette: {
    light: {
      signatureColor: "#146E7E",
      signatureChildColor: "#ffffff",
      wallpaperPatternColor: "#E3E3E3",
      primaryTextColor: "#000000", //black => white
      secondaryTextColor: "#686872", // gray => lighterGray
      hintColor: "#808080",
      disabledColor: "#EDEDED",
      bubbleMeContainerColor: "#146E7E",
      bubbleHimContainerColor: "#e8e8e8",
      bubbleMeTextColor: "#ffffff",
      bubbleHimTextColor: "#000000",
      bubbleMeSecondaryColor: "#e5e5ef",
      bubbleHimSecondaryColor: "#67676B",
      highlightColor:"#ffff00",
      seenColor: "#52F770",
      backgroundColor: "#eeeeee", //off white => dark gray
      containerColor: "#ffffff", // white => black
      dividerColor: "#afb2bc", //background divider
      errorColor: "#eb445a",
      rejectColor: "#fa5657",
      dangerColor: "#E64E4E",
      onlineColor: "#0bce73",
      successColor: "#0bce73",
      callColor: "#0BA05A",
      pressed: "#e5e5ef",
      appleLogo:"#000000",
      androidLogo: "#30d780",
      windowsLogo: "#00a8e8",
      linkColor: "#00b6ff",
      statusIndicatorBG: "#EAB76A",
      shadowColor: "#000000",
      fileIconColor: "#1691b6",
      audioIconColor: "#e7b76a",
      galleryActionColor: "#e5706e",
      cameraActionColor: "#81b29a",
      audioActionColor: "#a42a36",
      locationActionColor: "#757bc8",
      UpdatingStatus: "#146E9E",
      draftMessageColor: "#87CEFA",
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      callBackgroundColor:"#232323",
      himMentionText:"#00b6ff",
      myMentionText:"#00b6ff"
    } as ThemePalette,
    dark: {
      signatureColor: "#1D97AC",
      signatureChildColor: "#ffffff",
      wallpaperPatternColor: "#252525",
      primaryTextColor: "#ffffff", //black => white
      secondaryTextColor: "#A8A8AF", // gray => lighterGray
      hintColor: "#808080",
      disabledColor: "#EDEDED",
      bubbleMeContainerColor: "#1D97AC",
      bubbleHimContainerColor: "#252525",
      bubbleMeTextColor: "#ffffff",
      bubbleHimTextColor: "#ffffff",
      bubbleMeSecondaryColor: "#e5e5ef",
      bubbleHimSecondaryColor: "#A9A9AA",
      highlightColor:"#ffff00",
      seenColor: "#02FC30",
      backgroundColor: "#252525", //off white => dark gray
      containerColor: "#161616", // white => black
      dividerColor: "#afb2bc", //background divider
      errorColor: "#eb445a",
      rejectColor: "#fa5657",
      dangerColor: "#E64E4E",
      onlineColor: "#0bce73",
      successColor: "#0bce73",
      callColor: "#0BA05A",
      pressed: "#424242",
      appleLogo:"#ffffff",
      androidLogo: "#30d780",
      windowsLogo: "#00a8e8",
      linkColor: "#00b6ff",
      statusIndicatorBG: "#EAB76A",
      shadowColor: "#000000",
      fileIconColor: "#1691b6",
      audioIconColor: "#e7b76a",
      galleryActionColor: "#e5706e",
      cameraActionColor: "#81b29a",
      audioActionColor: "#a42a36",
      locationActionColor: "#757bc8",
      UpdatingStatus: "#146E9E",
      draftMessageColor: "#87CEFA",
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      callBackgroundColor:"#232323",
      himMentionText:"#00b6ff",
      myMentionText:"#9EEAFC"
    } as ThemePalette
  }
}