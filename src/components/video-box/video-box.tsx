import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type VideoBoxProps = ViewStyle & {
  activeSpeaker?: boolean;
  roundedCorners?: boolean;
  children?: React.ReactNode;
  id?: string;
  style?: StyleProp<ViewStyle>
}

const VideoBoxComponent: React.FC<VideoBoxProps> = ({
                                                      position = "relative",
                                                      width,
                                                      height,
                                                      margin = 0,
                                                      zIndex,
                                                      activeSpeaker,
                                                      children,
                                                      roundedCorners,
                                                      id,
                                                      style
                                                    }) => {
  const containerStyle: ViewStyle = {
    position,
    width,
    height,
    margin,
    zIndex,
    borderRadius: roundedCorners ? 10 : 0,
    borderColor: activeSpeaker ? "#secondaryColor" : "transparent",
    borderWidth: activeSpeaker ? 2 : 0,
    backgroundColor: "#181818",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <View style={[containerStyle,style]} id={id}>
      {children}
    </View>
  );
};


export const VideoBox = React.memo(VideoBoxComponent);
