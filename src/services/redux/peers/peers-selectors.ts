import { Peer } from "./peers-slice";
import { Selector } from "../store";
import { useAppSelector } from "../hooks";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { maxActiveVideosSelector, roomSelect } from "../room/room-selectors";

export const peersSelect: Selector<Record<string, Peer>> = (state) => state.peers;

/**
 * Factory function that returns a selector that returns a peer.
 *
 * @param {string} id - The peer ID.
 * @returns {Selector<Peer | undefined>} Selector for the peer.
 */
export const makePeerSelector = (id: string): Selector<Peer | undefined> => {
  return createSelector(
    peersSelect,
    (peers) => peers[id]
  );
};
/**
 * Hook to get the peer with the given id.
 *
 * @param peerId - The id of the peer.
 * @returns {Peer | undefined} The peer with the given id.
 */
export const usePeer = (peerId: string): Peer | undefined => {
  const getPeer = useMemo(() => makePeerSelector(peerId), [peerId]);

  return useAppSelector(getPeer);
};


/**
 * Returns the list of peerIds that are currently selected or
 * spotlighted. Cropped to maxActiveVideos.
 *
 * @returns {string[]} the list of peerIds.
 */
export const spotlightPeersSelector = createSelector(
  maxActiveVideosSelector,
  roomSelect,
  (maxActiveVideos, roomState) => {
    const { spotlights, selectedPeers } = roomState;

    return selectedPeers.concat(spotlights.filter((item) => selectedPeers.indexOf(item) < 0))
      .slice(0, maxActiveVideos)
      .sort((a, b) => String(a).localeCompare(String(b)));
  }
);
