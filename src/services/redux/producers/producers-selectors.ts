import { createSelector } from "@reduxjs/toolkit";
import { ProducerState } from "./producers-slice";
import { Selector } from "../store";

const producersSelect: Selector<ProducerState[]> = (state) => state.producers;


/**
 * Returns the mic state producer of the client.
 *
 * @returns {ProducerState | undefined} the mic state producer.
 */
export const micProducerSelector = createSelector(
  producersSelect,
  (producers) => producers.find((p) => p.source === 'mic')
);

/**
 * Returns the webcam state producer of the client.
 *
 * @returns {ProducerState | undefined} the webcam state producer.
 */
export const webcamProducerSelector = createSelector(
  producersSelect,
  (producers) => producers.find((p) => p.source === 'webcam')
);

/**
 * Returns the screen state producer of the client.
 *
 * @returns {ProducerState | undefined} the screen state producer.
 */
export const screenProducerSelector = createSelector(
  producersSelect,
  (producers) => producers.find((p) => p.source === 'screen')
);


/**
 * Returns the set of mic/webcam/screen/extravideo producers that are
 * currently active in the client.
 *
 * @returns {{
 * 	micProducer: StateProducer | undefined,
 * 	webcamProducer: StateProducer | undefined,
 * 	screenProducer: StateProducer | undefined,
 * 	extraVideoProducers: StateProducer[]
 * }} the state producers.
 * @see micProducerSelector
 * @see webcamProducerSelector
 * @see screenProducerSelector
 * @see extraVideoProducersSelector
 */
export const meProducersSelector = createSelector(
  micProducerSelector,
  webcamProducerSelector,
  screenProducerSelector,
  (micProducer, webcamProducer, screenProducer) =>
    ({
      micProducer,
      webcamProducer,
      screenProducer,
    })
);
