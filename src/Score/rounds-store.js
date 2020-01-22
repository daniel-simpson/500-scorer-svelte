import { writable } from "svelte/store";

const roundsStore = writable([]);

export default {
  subscribe: roundsStore.subscribe,

  addRound: ({ index, dealer, call, blackTricks, redTricks }) => {
    roundsStore.update(rounds => {
      const previousRound = rounds[rounds.length - 1];
      let blackScore = previousRound ? previousRound.blackScore : 0;
      let redScore = previousRound ? previousRound.redScore : 0;

      //TODO add 'team' to call object
      if (call.team == "black") {
        if (blackTricks > call.amount) {
          blackScore += call.score;
        } else {
          blackScore -= call.score;
        }
        redScore += 10 * redTricks;
      } else {
        if (redTricks > call.amount) {
          redScore += call.score;
        } else {
          redScore -= call.score;
        }
        blackScore += 10 * blackTricks;
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
