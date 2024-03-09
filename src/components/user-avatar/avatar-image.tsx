import React from "react"
import { Image, View } from "react-native"
import { useUserAvatarStyles } from "./use-user-avatar-styles";
import { useCommonStyles } from "../../use-common-styles"
import { Text } from "../text/text"
import { CachedImage } from "@georstat/react-native-image-cache";



interface IProps {
  pictureUri?: string | null
  size: number
  name?: string
  primaryBackground?: boolean
  disableCache?: boolean
  avatarColor?: string
  setHasError: any
  hasError: boolean
}

const AvatarImage = (props: IProps) => {
  const { primaryBackground, avatarColor, name, setHasError, disableCache, size, pictureUri, hasError } = props
  const {  nameAvatar, nameStyle } = useUserAvatarStyles()
  const { flexOne } = useCommonStyles()

  const handleError = () => {
    setHasError(true)
  }

  return pictureUri && !hasError ? (
    <>
      {disableCache || !pictureUri.includes("http") ? (
        <Image style={flexOne} source={{ uri: pictureUri }} onError={handleError} />
      ) : (
        <CachedImage style={{ width: size, height: size }} source={pictureUri} onError={handleError} resizeMode={"cover"} />
      )}
    </>
  ) : name && hasError ? (
    <View style={nameAvatar(primaryBackground, avatarColor, name)}>
      <Text style={nameStyle(size)}>{name && name.length > 0 ? name[0].toUpperCase() : ""}</Text>
    </View>
  ) : null
}

export default AvatarImage
