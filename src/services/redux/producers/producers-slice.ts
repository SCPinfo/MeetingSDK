import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { roomActions, RoomConnectionStateEnum } from "../room/room-slice";


export type ProducerSource = 'mic' | 'webcam' | 'screen' | 'extravideo';

export interface ProducerState {
  id: string;
  kind: string;
  source: ProducerSource;
  paused: boolean;
  score?: number;
}

type ProducersState = ProducerState[];

const initialState: ProducersState = [];

const producersSlice = createSlice({
  name: 'producers',
  initialState: initialState,
  reducers: {
    addProducer: ((state, action: PayloadAction<ProducerState>) => {
      state.push(action.payload);
    }),
    removeProducer: ((
      state,
      action: PayloadAction<string>) => {
      return state.filter((producer) => producer.id !== action.payload);
    }),
    setProducerPaused: ((
      state,
      action: PayloadAction<string>
    ) => {
      const producerId = action.payload;
      const producer = state.find((p) => p.id === producerId);

      if (producer)
        producer.paused = true;
    }),
    setProducerResumed: ((
      state,
      action: PayloadAction<string>
    ) => {
      const producerId = action.payload;
      const producer = state.find((p) => p.id === producerId);

      if (producer)
        producer.paused = false;
    }),
    setScore: ((state, action: PayloadAction<{ producerId: string, score: number }>) => {
      const {producerId, score} = action.payload;
      const producer = state.find((c) => c.id === producerId);

      if (producer) {
        producer.score = score;
      }
    })
  },
  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(roomActions.setRoomState, (state, action) => {
        if (action.payload === RoomConnectionStateEnum.Closed || action.payload === RoomConnectionStateEnum.Reconnecting){
          return initialState;
        }
      });
  }
});

export const producersActions = producersSlice.actions;

export default producersSlice.reducer;
