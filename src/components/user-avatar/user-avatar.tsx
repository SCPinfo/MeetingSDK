import React, { useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import FontIcon from "../font-icon/font-icons";
import AvatarImage from "./avatar-image";
import { useUserAvatarStyles } from "./use-user-avatar-styles";

export interface UserAvatarProps {
  pictureUri?: string | null;
  size: number;
  name?: string;
  disableViewer?: boolean;
  borderWidth?: number;
  borderColor?: string;
  style?: StyleProp<ViewStyle>
}

const UserAvatar = (props: UserAvatarProps) => {
  const { style,pictureUri, name, disableViewer, size, borderWidth = 0, borderColor = "white" } = props;
  const { signatureChildColor, defaultAvatar, imageHandler } = useUserAvatarStyles();
  const [hasError, setHasError] = useState(!pictureUri);

  // Required
  useEffect(() => {
    setHasError(!pictureUri);
  }, [pictureUri]);

  return (
    <View style={[imageHandler(size), borderWidth > 0 ? { borderColor, borderWidth } : null, style]}>
      {!pictureUri && !name ? (
        <View style={defaultAvatar}>
          <FontIcon type={"feather"} name={"camera"} size={size / 2.3} color={signatureChildColor} />
        </View>
      ) : disableViewer || hasError ? (
        <AvatarImage setHasError={setHasError} hasError={hasError} {...props} />
      ) : (
        <>
          <AvatarImage setHasError={setHasError} hasError={hasError} {...props} />
        </>
      )}
    </View>
  );
};

export default UserAvatar;
