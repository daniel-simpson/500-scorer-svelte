// import { derived } from "svelte/store";
// import players from "../../../Player/Stores/player-store";
// import game from "./game-store";

// const firstDealerIndex = derived(
//   players,
//   $players => Math.floor(Math.random() * $players.length + 1),
//   0
// );

// export default derived(
//   [firstDealerIndex, players, game],
//   ([$firstDealerIndex, $players, $game]) => {
//     const numberOfPlayers = $players.length;
//     if (numberOfPlayers === 0) {
//       return "TBA";
//     }

//     const numberOfElapsedRounds = $game ? $game.rounds.length : 0;

//     const currentDealerIndex =
//       ($firstDealerIndex + numberOfElapsedRounds) % numberOfPlayers;

//     return $players[currentDealerIndex];
//   }
// );
