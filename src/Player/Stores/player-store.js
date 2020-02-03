import { writable } from "svelte/store";
import persistentStore from "../../Util/PersistentStore";

const playerStore = persistentStore("players", []);

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
