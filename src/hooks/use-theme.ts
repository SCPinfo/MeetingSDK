

export function useTheme() {
  return {
    mode:"light",
    colors: palette.light,
    fontSizeMultiplier:1,
  }
}

const palette = {
  light: {
    signatureColor: "#b5986b",
    signatureChildColor: "#ffffff",
    wallpaperPatternColor: "#E3E3E3",
    primaryTextColor: "#000000", //black => white
    secondaryTextColor: "#686872", // gray => lighterGray
    hintColor: "#808080",
    disabledColor: "#EDEDED",
    bubbleMeContainerColor: "#b5986b",
    bubbleHimContainerColor: "#e8e8e8",
    bubbleMeTextColor: "#ffffff",
    bubbleHimTextColor: "#000000",
    bubbleMeSecondaryColor: "#e5e5ef",
    bubbleHimSecondaryColor: "#67676B",
    highlightColor:"#ffff00",
    seenColor: "#52B2F7",
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
    himMentionText:"#2183c0",
    myMentionText:"#2183c0",
  },
  dark: {
    signatureColor: "#b5986b",
    signatureChildColor: "#ffffff",
    wallpaperPatternColor: "#252525",
    primaryTextColor: "#ffffff", //black => white
    secondaryTextColor: "#A8A8AF", // gray => lighterGray
    hintColor: "#808080",
    disabledColor: "#EDEDED",
    bubbleMeContainerColor: "#b5986b",
    bubbleHimContainerColor: "#252525",
    bubbleMeTextColor: "#ffffff",
    bubbleHimTextColor: "#ffffff",
    bubbleMeSecondaryColor: "#e5e5ef",
    bubbleHimSecondaryColor: "#A9A9AA",
    highlightColor:"#ffff00",
    seenColor: "#52B2F7",
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
    himMentionText:"#2183c0",
    myMentionText:"#2183c0",//464CC5
  },
}
