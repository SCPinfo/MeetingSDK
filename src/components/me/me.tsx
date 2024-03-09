import { useAppSelector } from "../../services/redux/hooks";
import { meProducersSelector } from "../../services/redux/producers/producers-selectors";
import { VideoView } from "../video-view/video-view";
import { VideoBox } from "../video-box/video-box";
import UserAvatar from "../user-avatar/user-avatar";
import React from "react";

interface MeProps{
  style: Record<any, any>
}

export const Me = ({style}:MeProps) => {

  const {
    webcamProducer,
  } = useAppSelector(meProducersSelector);
  const me = useAppSelector((state) => state.me);
  const hideSelfView = useAppSelector((state) => state.roomSettings.hideSelfView);
  const mirroredSelfView = useAppSelector((state) => state.roomSettings.mirroredSelfView);

  const videoVisible = webcamProducer && !webcamProducer.paused;

  return (
    <>
      {!hideSelfView && (
        <VideoBox
          height={style.height}
          width={style.width}
          zIndex={0}
          roundedCorners
        >
          {videoVisible ?
            <VideoView
              mirrored={mirroredSelfView}
              producer={webcamProducer}
              roundedCorners
            /> :
            <UserAvatar
              size={120}
              name={me.user.name}
            />
          }
        </VideoBox>
      )}
    </>
  );
};

