import { VideoView } from "../video-view/video-view";
import { useAppSelector } from "../../services/redux/hooks";
import { usePeer } from "../../services/redux/peers/peers-selectors";
import { usePeerConsumers } from "../../services/redux/consumers/consumers-selectors";
import { VideoBox } from "../video-box/video-box";
import UserAvatar from "../user-avatar/user-avatar";
import React from "react";


interface PeerProps {
  id: string;
  style: Record<any, any>
}

export const Peer = ({id,style}: PeerProps) => {
  const {
    webcamConsumer,
  } = usePeerConsumers(id);
  const peer = usePeer(id);
  const hideNonVideo = useAppSelector((state) => state.roomSettings.hideNonVideo);

  const showParticipant = !hideNonVideo || (hideNonVideo && webcamConsumer);

  const videoVisible = (webcamConsumer && !webcamConsumer.localPaused && !webcamConsumer.remotePaused);


  return (

    <>
      {showParticipant && peer && (
        <VideoBox
          height={style.height}
          width={style.width}
          zIndex={0}
          roundedCorners
        >
          {videoVisible ?
            <VideoView consumer={webcamConsumer} roundedCorners /> :
            <UserAvatar
              size={120}
              name={peer.user.name}
            />
          }
        </VideoBox>
      )}
    </>
  );
};
