export interface Palette {
    primaryColor: string
    secondaryColor: string
    accentColor1: string
    accentColor2: string
    accentColor3: string
    accentColor4: string
    accentColor5: string
    textColor: string
    hintColor: string
    borderColor: string
    backgroundColor: string
}

export interface WebPalette {
    darkPalette: Palette
    lightPalette: Palette

}
export interface Branding {
    web: WebPalette
}

