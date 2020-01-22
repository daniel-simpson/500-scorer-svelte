import { writable } from "svelte/store";

const scoreStore = writable([]);

export default {
  subscribe: scoreStore.subscribe,
  getRound: () => {},
  addBid: () => {},
  addScoreForRound: () => {}
};
