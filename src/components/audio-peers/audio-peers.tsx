import React from 'react';

import AudioView from '../audio-view/audio-view';
import { useAppSelector } from "../../services/redux/hooks";
import { RootState } from "../../services/redux/store";
import { If } from "../../utils/methods";
import { micConsumerSelector } from "../../services/redux/consumers/consumers-selectors";
import { View } from "react-native";


const AudioPeers = (): React.JSX.Element => {
  const micConsumers = useAppSelector(micConsumerSelector);
  const selectedSpeakerDeviceId = useAppSelector((state) => state.roomSettings.selectedSpeakerDeviceId)
  const me = useAppSelector((state: RootState) => state.me);

  return (
    <View>
      <If condition={!me.peersAudioOff}>
        {micConsumers.map((consumer) => (
          <If condition={!consumer.localPaused && !consumer.remotePaused } key={consumer.id}>
            <AudioView
              consumer={consumer}
              deviceId={selectedSpeakerDeviceId}
            />
          </If>
        ))}
      </If>
    </View>
  );
};

export default AudioPeers;
