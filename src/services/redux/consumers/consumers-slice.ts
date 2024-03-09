import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ProducerSource } from "../producers/producers-slice";
import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";


export interface ConsumerState {
  id: string;
  peerId: string;
  kind: string;
  producerId: string;
  audioGain?: number;
  localPaused: boolean;
  remotePaused: boolean;
  source: ProducerSource;
  score?: number
}

type ConsumersState = ConsumerState[];

const initialState: ConsumersState = [];

const consumersSlice = createSlice({
  name: 'consumers',
  initialState: initialState,
  reducers: {
    addConsumer: ((state, action: PayloadAction<ConsumerState>) => {
      state.push(action.payload);
    }),
    removeConsumer: ((state, action: PayloadAction<{ consumerId: string; }>) => {
      return state.filter((consumer) => consumer.id !== action.payload.consumerId);
    }),
    setConsumerPaused: ((state, action: PayloadAction<{ consumerId: string; local?:boolean; }>) => {
      const { consumerId, local } = action.payload;
      const consumer = state.find((c) => c.id === consumerId);

      if (consumer) {
        if (local)
          consumer.localPaused = true;
        else
          consumer.remotePaused = true;
      }
    }),
    setConsumerResumed: ((state, action: PayloadAction<{ consumerId: string; local?:boolean;  }>) => {
      const { consumerId, local } = action.payload;
      const consumer = state.find((c) => c.id === consumerId);

      if (consumer) {
        if (local)
          consumer.localPaused = false;
        else
          consumer.remotePaused = false;
      }
    }),
    setConsumerCurrentLayers: ((state, action: PayloadAction<{ consumerId: string; spatialLayer:any; temporalLayer:any;}>) => {
      // const { consumerId, spatialLayer, temporalLayer } = action.payload;
      // const consumer = state[consumerId];
      // const newConsumer =
      //   {
      //     ...consumer,
      //     currentSpatialLayer  : spatialLayer,
      //     currentTemporalLayer : temporalLayer
      //   };

      // return { ...state, [consumerId]: newConsumer };
    }),
    setConsumerPreferredLayers: ((state, action: PayloadAction<{ consumerId: string; spatialLayer:any; temporalLayer:any;}>) => {
      // const { consumerId, spatialLayer, temporalLayer } = action.payload;
      // const consumer = state[consumerId];
      // const newConsumer =
      //   {
      //     ...consumer,
      //     preferredSpatialLayer  : spatialLayer,
      //     preferredTemporalLayer : temporalLayer
      //   };

      // return { ...state, [consumerId]: newConsumer };
    }),
    setConsumerPriority:( (state, action: PayloadAction<{ consumerId: string; priority:any;}>) => {
      // const { consumerId, priority } = action.payload;
      // const consumer = state[consumerId];
      // const newConsumer = { ...consumer, priority };

      // return { ...state, [consumerId]: newConsumer };
    }),
    setConsumerTrack: ((state, action: PayloadAction<{ consumerId: string; track:any;}>) => {
      // const { consumerId, track } = action.payload;
      // const consumer = state[consumerId];
      // const newConsumer = { ...consumer, track };

      // return { ...state, [consumerId]: newConsumer };
    }),
    setConsumerScore: ((state, action: PayloadAction<{ consumerId: string; score:any;}>) => {
      const { consumerId, score } = action.payload;
      const consumer = state.find((c) => c.id === consumerId);

      if (consumer) {
        consumer.score = score;
      }
    }),
    setAudioGain: ((
      state,
      action: PayloadAction<{ consumerId: string, audioGain?: number }>
    ) => {
      const consumer = state.find((c) => c.id === action.payload.consumerId);

      if (consumer)
        consumer.audioGain = action.payload.audioGain;
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

export const consumersActions = consumersSlice.actions;

export default consumersSlice.reducer;
