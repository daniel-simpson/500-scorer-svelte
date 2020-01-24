import { writable } from "svelte/store";

const roundsStore = writable([]);

export default {
  subscribe: roundsStore.subscribe,

  addRound: ({ index, dealer, call, blackTricks, redTricks }) => {
    roundsStore.update(rounds => {
      console.log("In Add Round", index, dealer, call, blackTricks, redTricks);

      const previousRound = rounds[rounds.length - 1];
      let blackScore = previousRound ? previousRound.blackScore : 0;
      let redScore = previousRound ? previousRound.redScore : 0;

      if (call.team == "black") {
        // Misere
        if (call.amount === 0) {
          blackScore = blackTricks === 0 ? call.score : -call.score;
        } else if (blackTricks >= call.amount) {
          blackScore += call.score;
          redScore += 10 * redTricks;
        } else {
          blackScore -= call.score;
          redScore += 10 * redTricks;
        }
      } else {
        if (call.amount === 0) {
          redScore = redTricks === 0 ? call.score : -call.score;
        } else if (redTricks >= call.amount) {
          redScore += call.score;
          blackScore += 10 * blackTricks;
        } else {
          redScore -= call.score;
          blackScore += 10 * blackTricks;
        }
      }

      return [
        ...rounds,
        {
          index,
          dealer,
          call,
          blackScore,
          redScore
        }
      ];
    });
  }
};
