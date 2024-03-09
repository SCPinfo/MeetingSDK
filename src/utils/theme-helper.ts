
export const opacity = (hexColor: string, opacity: number) => {
  if (opacity >= 1 || opacity < 0) return hexColor

  const newOpacity = Number(opacity.toFixed(1))

  return `${hexColor}${hexColorOpacity[newOpacity]}`
}

interface HexColorOpacity {
  [key: number]: string;
}
const hexColorOpacity: HexColorOpacity = {
    0:"00",
    0.1:"1A",
    0.2:"33",
    0.3:"4D",
    0.4:"66",
    0.5:"80",
    0.6:"99",
    0.7:"B3",
    0.8:"CC",
    0.9:"E6",
    1:"FF"
}

