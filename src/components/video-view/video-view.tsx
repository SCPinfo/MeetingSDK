import { Consumer } from 'mediasoup-client/lib/Consumer';
import { Producer } from 'mediasoup-client/lib/Producer';
import {useEffect, useRef, useState} from 'react';
import { MediaStream, RTCView } from "react-native-webrtc";
import { ConsumerState } from "../../services/redux/consumers/consumers-slice";
import { ProducerState } from "../../services/redux/producers/producers-slice";
import { meetingService } from "../../services/meeting";
import { If } from "../../utils/methods";
import { mediaPreviewService } from "../../services/media-preview";

interface VideoViewProps {
  mirrored?: boolean;
  contain?: boolean;
  zIndex?: number;
  trackId?: string;
  consumer?: ConsumerState;
  producer?: ProducerState;
  roundedCorners?: boolean;
}

interface VideoProps {
  mirrored?: number;
  contain?: number;
  zindex?: number;
  roundedcorners?: number;
}


export const VideoView = ({
  mirrored,
  contain,
  zIndex,
  consumer,
  producer,
  trackId,
  roundedCorners = true,
}: VideoViewProps): JSX.Element => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const [isLoading,setIsLoading] = useState(true)
  const [streamUrl,setStreamUrl] = useState(null)
  const streamElement = useRef<MediaStream>(null);

  useEffect(() => {
    let media: Consumer | Producer | undefined;
    let track: MediaStreamTrack | null | undefined;

    if (trackId)
      {track = mediaPreviewService.getTrack(trackId);}
    else if (consumer)
      {media = meetingService.room.getConsumer(consumer.id);}
    else if (producer)
      {media = meetingService.room.getProducer(producer.id);}

    if (media) {({ track } = media);}

    if (!track ) {return undefined;}

    const stream = new MediaStream();

    stream.addTrack(track as any);

    streamElement.current = stream
    setStreamUrl(stream.toURL())

    return () => {
      if (streamElement.current) {
        streamElement.current = null;
      }
    };
  }, [producer?.paused,trackId]);

/*
  useEffect(() => {

    if (!consumer)
      return;

    const actualConsumer = meetingService.room.getConsumer(consumer.id);

    if (!actualConsumer)
      return;

    const resolutionWatcher = actualConsumer?.appData.resolutionWatcher as ResolutionWatcher | undefined;
    const resolutionReporter = resolutionWatcher?.createResolutionReporter();

    if (!resolutionReporter || !videoElement.current)
      return;

    const resizeObserver = new ResizeObserver((entries) => {
      const {
        contentRect: {
          width,
          height
        }
      } = entries[0];

      resolutionReporter.updateResolution({ width, height });
    });

    resizeObserver.observe(videoElement.current);

    return () => {
      resizeObserver.disconnect();
      resolutionReporter.close();
    };
  }, []);

  const handleLoadStart = ()=> setIsLoading(true)
  const handleLoadedData = ()=> setTimeout(()=>setIsLoading(false),500)
*/

  // Props workaround for: https://github.com/mui/material-ui/issues/25925
  return (
    <>
      {streamUrl &&
        <RTCView
          streamURL={streamUrl}
          objectFit={"cover"}
          style={{ width:"100%",height:"100%"  }}
          zOrder={0}
        />
      }
    </>
  );
};

