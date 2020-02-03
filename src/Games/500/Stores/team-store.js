import { derived } from "svelte/store";

import players from "../../../Player/Stores/player-store";

const getEvenElements = array => array.filter((_, i) => i % 2 == 0);
const getOddElements = array => array.filter((_, i) => i % 2 == 1);

export const blackTeamStore = derived(players, $players => {
  return getEvenElements($players);
});

export const redTeamStore = derived(players, $players => {
  return getOddElements($players);
});
