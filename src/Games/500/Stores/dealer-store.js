import { derived } from "svelte/store";
import players from "../../../Player/Stores/player-store";
import rounds from "./rounds-store";

const firstDealerIndex = derived(
  players,
  $players => Math.floor(Math.random() * $players.length + 1),
  0
);

export default derived(
  [firstDealerIndex, players, rounds],
  ([$firstDealerIndex, $players, $rounds]) => {
    const numberOfPlayers = $players.length;
    if (numberOfPlayers === 0) {
      return "TBA";
    }

    const numberOfElapsedRounds = $rounds.length;

    const currentDealerIndex =
      ($firstDealerIndex + numberOfElapsedRounds) % numberOfPlayers;

    return $players[currentDealerIndex];
  }
);
