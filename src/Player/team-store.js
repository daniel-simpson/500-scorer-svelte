import { derived } from "svelte/store";
import { getEvenElements, getOddElements } from "../util";

import players from "./player-store";

export const blackTeamStore = derived(players, $players => {
  return getEvenElements($players);
});

export const redTeamStore = derived(players, $players => {
  return getOddElements($players);
});
