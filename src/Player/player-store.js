import { writable } from "svelte/store";

const playerStore = writable([
  //TODO: remove game initial test data
  "Dan",
  "Stini",
  "Jess",
  "Tim"
]);

export default {
  subscribe: playerStore.subscribe,
  addPlayer: newPlayerName => {
    playerStore.update(players => {
      return [...players, newPlayerName];
    });
  },
  removePlayer: playerName => {
    playerStore.update(players => {
      return players.filter(name => name != playerName);
    });
  }
};
