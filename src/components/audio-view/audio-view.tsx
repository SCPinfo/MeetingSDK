import React, {useEffect, useRef} from 'react';
import { ConsumerState } from "../../services/redux/consumers/consumers-slice";
import { meetingService } from "../../services/meeting";
import { MediaStream, RTCView } from "react-native-webrtc";


interface AudioViewProps {
  consumer: ConsumerState;
  deviceId?: string
}

const AudioView = ({consumer, deviceId}: AudioViewProps): React.JSX.Element => {
  const streamElement = useRef<MediaStream>(null);

  useEffect(() => {
    const {track} = meetingService.room.getConsumer(consumer.id) ?? {};

    if (!track) return undefined;


    const stream = new MediaStream();

    stream.addTrack(track as any);

    streamElement.current = stream

    return () => {
      if (streamElement.current) {
        streamElement.current = null;
      }
    };

  }, [ ]);


  return (
    <>
      {streamElement && streamElement.current &&
        <RTCView streamURL={streamElement.current.toURL()} objectFit={"cover"} style={{ width:"100%",height:"100%",backgroundColor:'red' }} zOrder={0} />
      }
    </>
  );
};

export default AudioView;
