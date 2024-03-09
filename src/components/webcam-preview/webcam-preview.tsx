import React, { ReactNode } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import { VideoBox } from "../video-box/video-box";
import { VideoView } from "../video-view/video-view";
import UserAvatar from "../user-avatar/user-avatar";
import { currentUserSelector } from "../../services/redux/auth/auth-selectors";


interface IProps {
  children?: ReactNode;
  height?: number;
}

export const WebcamPreview = ({ children, height = 300 }: IProps) => {
  const previewWebcamTrackId = useAppSelector((state) => state.me.previewWebcamTrackId);
  const currentUser = useAppSelector(currentUserSelector);

  return (
    <VideoBox
      height={height}
      zIndex={0}
      roundedCorners
    >
      {children}
      {previewWebcamTrackId &&
        <VideoView
          roundedCorners
          trackId={previewWebcamTrackId}
        />
      }
      {!previewWebcamTrackId &&
        <UserAvatar
          size={120}
          name={currentUser?.name}
        />
      }
    </VideoBox>
  );
};

