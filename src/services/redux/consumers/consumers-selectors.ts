import { createSelector } from "@reduxjs/toolkit";
import { Selector } from "../store";
import { ConsumerState } from "./consumers-slice";
import { useAppSelector } from "../hooks";
import { useMemo } from "react";


export interface PeerConsumers {
  micConsumer?: ConsumerState;
  webcamConsumer?: ConsumerState;
  screenConsumer?: ConsumerState;
}


const consumersSelect: Selector<ConsumerState[]> = (state) => state.consumers;


/**
 * Returns the list of mic state consumers of all peers.
 *
 * @returns {ConsumerState[]} the list of mic state consumers.
 */
export const micConsumerSelector = createSelector(
  consumersSelect,
  (consumers) => consumers.filter((c) => c.source === 'mic')
);


/**
 * Factory function that returns a selector that returns the set of
 * mic/webcam/screen/extravideo consumers for a given peer.
 *
 * @param {string} id - The peer ID.
 * @returns {Selector<{
 * 	micConsumer: ConsumerState | undefined,
 * 	webcamConsumer: ConsumerState | undefined,
 * 	screenConsumer: ConsumerState | undefined,
 * 	extrawebcamConsumers: ConsumerState[]
 * }>} Selector for the peer's consumers.
 */
export const makePeerConsumerSelector = (id: string): Selector<{
  micConsumer: ConsumerState | undefined;
  webcamConsumer: ConsumerState | undefined;
  screenConsumer: ConsumerState | undefined;
}> => {
  return createSelector(
    consumersSelect,
    (consumers: ConsumerState[]) => {
      const micConsumer = consumers.find((c) => c.peerId === id && c.source === 'mic');
      const webcamConsumer = consumers.find((c) => c.peerId === id && c.source === 'webcam');
      const screenConsumer = consumers.find((c) => c.peerId === id && c.source === 'screen');

      return {micConsumer, webcamConsumer, screenConsumer};
    }
  );
};


/**
 * Hook to access the comsumers of a peer.
 *
 * @param peerId - The id of the peer.
 * @returns {PeerConsumers} The consumers of the peer.
 */


export const usePeerConsumers = (peerId: string): PeerConsumers => {
  const getPeerConsumers =
    useMemo(() => makePeerConsumerSelector(peerId), []);

  return useAppSelector(getPeerConsumers);
};
