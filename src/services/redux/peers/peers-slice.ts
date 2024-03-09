import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";


interface PeerTranscript {
  id: string;
  transcript: string;
  peerId: string;
  done: boolean;
}

type Transcript = Omit<PeerTranscript, 'peerId'>;

export interface Peer {
  id: string;
  user?: Partial<User>
  raisedHand?: boolean;
  raisedHandTimestamp?: number;
  transcripts?: Transcript[];

  videoInProgress?: boolean;
  stopVideoInProgress?: boolean;
  audioInProgress?: boolean;
  stopAudioInProgress?: boolean;
  screenInProgress?: boolean;
  stopScreenSharingInProgress?: boolean;
  kickInProgress?: boolean;
  raisedHandInProgress?: boolean;
}

type PeerUpdate = Omit<Peer, 'transcripts'>;

const initialState: Record<string, Peer> = {};

const peersSlice = createSlice({
  name: 'peers',
  initialState: initialState,
  reducers: {
    addPeer: ((state, action: PayloadAction<Peer>) => {
      state[action.payload.id] = action.payload;

    }),
    addPeers: ((state, action: PayloadAction<Record<string, User>>) => {
      const peers = action.payload
      for (const socketId in peers) {
        const peer = peers[socketId];
        state[socketId] = {
          id: socketId,
          user: {
            name: peer.name,
            username: peer.username,
            picture :peer.picture,
            _id: peer._id,
          },
        } as Peer
      }
    }),
    updatePeer: ((state, action: PayloadAction<PeerUpdate>) => {
      const {id, ...rest} = action.payload;
      state[id] = {...state[id],...rest}
    }),
    removePeer: ((state, action: PayloadAction<string>) => {
      delete state[action.payload];
    }),
    updateTranscript: ((state, action: PayloadAction<PeerTranscript>) => {
      const {id, transcript, peerId, done} = action.payload;
      const peer = state[peerId];

      if (peer) {
        if (!peer.transcripts) peer.transcripts = [];

        const oldTranscript = peer.transcripts.find((t) => t.id === id);

        if (oldTranscript) {
          oldTranscript.transcript = transcript;
          oldTranscript.done = done;
        } else {
          const newTranscript = {id, transcript, done};
          peer.transcripts.push(newTranscript);
        }
      }
    }),
    removeTranscript: ((state, action: PayloadAction<Omit<PeerTranscript, 'transcript' | 'done'>>) => {
      const {id, peerId} = action.payload;
      const peer = state[peerId];
      if (peer) peer.transcripts = peer.transcripts?.filter((t) => t.id !== id);
    }),
    clearTranscripts: ((state, action: PayloadAction<string>) => {
      const peer = state[action.payload];
      if (peer) peer.transcripts = [];
    }),
  },
  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(roomActions.setRoomState, (state, action) => {
        if (action.payload === RoomConnectionStateEnum.Closed || action.payload === RoomConnectionStateEnum.Reconnecting)
          return initialState;
      });
  }
});

export const peersActions = peersSlice.actions;

export default peersSlice.reducer;
