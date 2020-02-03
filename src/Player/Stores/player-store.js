import { writable } from "svelte/store";

const playerStore = writable([]);

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
